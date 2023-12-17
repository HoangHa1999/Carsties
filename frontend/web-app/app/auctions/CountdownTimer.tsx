'use client'

import React from 'react'
import Countdown, { zeroPad } from 'react-countdown';

type Props = {
  auctionEnd: string;
}

const renderer = ({ days, hours, minutes, seconds, completed }:
  { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
  return (
   <div className={`
      border-2 border-white py-1 px-2 rounded-lg flex justify-center
      ${completed ?
         'bg-red-600' : (days === 0 && hours < 10) 
         ? 'bg-amber-600' : 'bg-green-600'}
      `}>
        {completed ? (
          <span className='text-white font-semibold'>Ended</span>
        ) : (
          <span suppressHydrationWarning={true} className='text-white font-semibold'>
            {days === 0 ? '' : `${days}d `}
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        
        )}
   </div>
  )
};


export default function CountdownTimer({ auctionEnd }: Props) {
 

  return (
    <div>
      <Countdown date={auctionEnd} renderer={renderer} />
    </div>
  )
}