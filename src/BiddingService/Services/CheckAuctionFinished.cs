using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    public class CheckAuctionFinished : BackgroundService
    {
        private readonly ILogger<CheckAuctionFinished> _logger;
        private readonly IServiceProvider _service;

        public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider service)
        {
            _logger = logger;
            _service = service;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for auctions");
            stoppingToken.Register(() => _logger.LogInformation("==> Auction check is stopping"));

            while (!stoppingToken.IsCancellationRequested)
            {
                await checkAuctions(stoppingToken);

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task checkAuctions(CancellationToken stoppingToken)
        {
            var finishedAuctions = await DB.Find<Auction>()
                .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                .Match(x => !x.Finished)
                .ExecuteAsync(stoppingToken);

            if (finishedAuctions.Count == 0) return;

            _logger.LogInformation("Found {count} auctions that have finished", finishedAuctions.Count);

            using var scope = _service.CreateScope();
            var publishEndpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach (var auction in finishedAuctions)
            {
                auction.Finished = true;
                await auction.SaveAsync(null, stoppingToken);

                var winningBid = await DB.Find<Bid>()
                     .Match(x => x.AuctionId == auction.ID)
                     .Match(x => x.BidStatus == BidStatus.Accepted)
                     .Sort(x => x.Descending(y => y.Amount))
                     .ExecuteFirstAsync(stoppingToken);

                await publishEndpoint.Publish(new AuctionFinished
                {
                    AuctionId = auction.ID,
                    ItemSold = winningBid != null,
                    Winner = winningBid?.Bidder,
                    Amount = winningBid?.Amount,
                    Seller = auction.Seller
                }, stoppingToken);
            }
        }
    }
}