import React from 'react'
import { CryptoCurrency, Population } from '../../components';

function Home() {
  return (
    <div className='bg-code-gray w-full p-8'>
     <div className='flex justify-between'>
      <div className='text-white'>
       <h1 className='text-3xl font-semibold mt-1'>
        Hello, <span className='text-[#acbf35]'>Brooklyn Simmons 👋</span>
       </h1>
       <h2 className='mt-1 text-base tracking-widest'>
         Welcome to <span className='text-chateau-green'>Spot trading!</span>
       </h2>
      </div>
      <button className='bg-green text-white w-30 h-10 px-3 py-2 rounded-sm shadow-sm'>
        Start Trading
      </button>
    </div> 
    <div className='mt-9'>
        <Population />
        <CryptoCurrency />
    </div>
    </div>
  )
}

export default Home