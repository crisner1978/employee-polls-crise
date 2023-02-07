import { ClipboardDocumentListIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAuthUser } from '../features/authSlice'
import Dropdown from './Dropdown'

const Navbar = () => {
  const authUser = useSelector(selectAuthUser)
  const [isVisible, setVisible] = useState(false)
  const outsideRef = useDetectClickOutside({
    onTriggered: () => setVisible(false),
  })

  const toggleDropdown = () => setVisible(!isVisible)

  if (!authUser) return null

  return (
    <div ref={outsideRef} className='sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8'>
        <div className='flex items-center space-x-5'>
          <NavLink
            data-testid='home-link'
            onClick={() => isVisible && setVisible(false)}
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'text-lg font-bold leading-none text-cyan-600'
                : 'text-lg font-bold leading-none'
            }>
            Polls
          </NavLink>
          <NavLink
            data-testid='leaderboard-link'
            onClick={() => isVisible && setVisible(false)}
            to='leaderboard'
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-1 text-lg font-bold leading-none text-cyan-600'
                : 'flex items-center space-x-1 text-lg font-bold leading-none text-slate-800'
            }>
            <ClipboardDocumentListIcon className='h-7 w-7 group-hover:bg-gray-100' />
            <span className='hidden md:inline'>Leaderboard</span>
          </NavLink>
          <NavLink
            data-testid='add-link'
            onClick={() => isVisible && setVisible(false)}
            to='add'
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-1 text-lg font-bold leading-none text-cyan-600'
                : 'flex items-center space-x-1 text-lg font-bold leading-none text-slate-800'
            }>
            <PlusCircleIcon className='h-7 w-7 rounded-full group-hover:bg-gray-100' />
            <span className='hidden md:inline'>Add Poll</span>
          </NavLink>
        </div>
        <div className='flex items-center'>
          <div
            className='relative flex w-fit cursor-pointer items-center space-x-2'
            onClick={toggleDropdown}>
            <img
              src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${authUser?.name}`}
              alt={authUser?.name}
              className='h-8 w-8 rounded-full'
            />
            <span className='hidden text-lg font-bold leading-none md:inline'>
              {authUser?.name}
            </span>
            {isVisible && <Dropdown authUser={authUser} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
