import React from 'react'

export const ProductCard = () => {
  return (
    <div className='w-70 h-full p-2 pb-10 border-b-2'>
        <div className='bg-emerald-400 h-24 w-40 p-2 rounded'>
            <p className='text-3xl text-white'>KK</p>
        </div>
        <p className='text-base font-thin text-slate-500'>Залишок: 324</p>
        <h3 className='font-bold text-lg'>Кора Крупна</h3>
        <p className='text-xl'>140.00 грн</p>

    </div>
  )
}
