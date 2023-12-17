'use client'

import React from 'react'
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { Auction } from '@/types';
import { getData } from '../actions/actionAuctions';



export default function Listing() {
  const [auctions, setAuctions] = React.useState<Auction[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    getData(pageNumber).then((data) => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    })
  }, [pageNumber]);

  if(auctions.length === 0) return (<h3>Loading...</h3>)

  return (
    <>
      <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
          {auctions.map(auction => 
            (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setPageNumber} currentPage={pageNumber} pageCount={pageCount} />
      </div>
    </>
  )
}
