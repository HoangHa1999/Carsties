using AuctionService.Controllers;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.RequestHelpers;
using AutoFixture;
using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuctionService.UnitTests
{
    public class AuctionControllerTests
    {
        private readonly Mock<IAuctionRepository> _auctionRepo;
        private readonly Mock<IPublishEndpoint> _publishEndpoint;
        private readonly Fixture _fixture;
        private readonly AuctionsController _auctionController;
        private readonly IMapper _mapper;

        public AuctionControllerTests()
        {
            _fixture = new Fixture();
            _auctionRepo = new Mock<IAuctionRepository>();
            _publishEndpoint = new Mock<IPublishEndpoint>();
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(typeof(MappingProfiles).Assembly);
            }).CreateMapper().ConfigurationProvider;
            _mapper = new Mapper(mockMapper);
            _auctionController = new AuctionsController(_auctionRepo.Object, _mapper, _publishEndpoint.Object);
        }

        [Fact]
        public async Task GetAuctions_WithNoParams_Return10Auctions()
        {
            // Arrange
            var auctions = _fixture.CreateMany<AuctionDTO>(10).ToList();
            _auctionRepo.Setup(x => x.GetAuctionsAsync(null)).ReturnsAsync(auctions);

            // Act
            var result = await _auctionController.GetAllAuctions(null);

            // Assert
            Assert.Equal(10, result.Value.Count);
            Assert.IsType<ActionResult<List<AuctionDTO>>>(result);
        }

        [Fact]
        public async Task GetAuctionById_WithValidGuid_ReturnsAuction()
        {
            // arrange
            var auction = _fixture.Create<AuctionDTO>();
            _auctionRepo.Setup(repo => repo.GetAuctionByIdAsync(It.IsAny<Guid>())).ReturnsAsync(auction);

            // act
            var result = await _auctionController.GetAuctionById(auction.Id);

            // assert
            Assert.Equal(auction.Make, result.Value.Make);
            Assert.IsType<ActionResult<AuctionDTO>>(result);
        }

        [Fact]
        public async Task GetAuctionById_WithInvalidGuid_ReturnsNotFound()
        {
            // arrange
            _auctionRepo.Setup(repo => repo.GetAuctionByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            // act
            var result = await _auctionController.GetAuctionById(Guid.NewGuid());

            // assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}