using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionsController : ControllerBase
    {
        private readonly IAuctionRepository _auctionRepository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuctionsController(IAuctionRepository auctionRepository, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _auctionRepository = auctionRepository;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDTO>>> GetAllAuctions(string date)
        {
            return await _auctionRepository.GetAuctionsAsync(date);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDTO>> GetAuctionById(Guid id)
        {
            var auction = await _auctionRepository.GetAuctionByIdAsync(id);
            if (auction == null)
            {
                return NotFound();
            }
            return auction;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateAuction(CreateAuctionDTO auctionDTO)
        {
            var auction = _mapper.Map<Auction>(auctionDTO);

            auction.Seller = User.Identity.Name;

            _auctionRepository.AddAuction(auction);

            var newAuction = _mapper.Map<AuctionDTO>(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));

            var result = await _auctionRepository.SaveChangesAsync();

            if (!result)
            {
                return BadRequest("Could not save changes to the DB");
            }
            return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, newAuction);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDTO updateAuctionDTO)
        {
            var auction = await _auctionRepository.GetAuctionEntityByIdAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            if (auction.Seller != User.Identity.Name)
            {
                return Forbid();
            }

            _mapper.Map(updateAuctionDTO, auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

            var result = await _auctionRepository.SaveChangesAsync();

            if (result) return Ok();
            return BadRequest("Could not save changes to the DB");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction = await _auctionRepository.GetAuctionEntityByIdAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            if (auction.Seller != User.Identity.Name)
            {
                return Forbid();
            }

            _auctionRepository.RemoveAuction(auction);

            await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });

            var result = await _auctionRepository.SaveChangesAsync();

            if (result) return Ok();
            return BadRequest("Could not remove Auction from the DB");
        }
    }
}