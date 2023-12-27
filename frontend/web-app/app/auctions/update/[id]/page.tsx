import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../../AuctionForm'
import { getAuction } from '@/app/actions/actionAuctions';

export default async function Update({params}: {params: {id: string}}) {
  const auction = await getAuction(params.id);

  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading title='Update your auction' subtitle='Please update the details of your car' />
      <AuctionForm auction={auction} />
    </div>
  )
}