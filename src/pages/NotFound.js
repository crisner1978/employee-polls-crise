import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 transform flex-col items-center space-y-4 text-center'>
      <img
        className='flex h-[200px] w-[300px] object-contain'
        src='https://res.cloudinary.com/dtram9qiy/image/upload/v1659706068/my-upload/yo1rtcjrk4zj5zx3pirv.png'
        alt='Error Page Pic'
      />
      <br />
      <p className='text-3xl font-semibold'>404 - No Page Found</p>
      <p className='text-sColor text-sm sm:text-lg'>
        Available polls are on the{' '}
        <Link className='font-semibold text-blue-600' to='/'>
          Homepage
        </Link>
        .
      </p>
    </div>
  )
}
