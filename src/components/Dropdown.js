import { ClipboardDocumentListIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAuthUser } from '../features/authSlice'
import DropdownOption from './DropdownOption'

const Dropdown = ({ authUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function logOut() {
    dispatch(logoutAuthUser(authUser.id))
    navigate('/', { replace: true })
  }

  return (
    <div className='absolute top-11 -right-4 w-48 rounded-xl border border-t-0 bg-white py-2'>
      <DropdownOption
        onClick={() => navigate('/')}
        icon={<UserIcon className='h-6 w-6 group-hover:bg-gray-100' />}
        text={authUser.name}
      />
      <DropdownOption
        onClick={() => navigate('leaderboard')}
        icon={<ClipboardDocumentListIcon className='h-6 w-6 group-hover:bg-gray-100' />}
        text='Leaderboard'
      />
      <DropdownOption
        icon={<PlusCircleIcon className='h-6 w-6 rounded-full group-hover:bg-gray-100' />}
        text='Add Poll'
        onClick={() => navigate('add')}
      />
      <DropdownOption
        icon={<ArrowLeftOnRectangleIcon className='h-6 w-6 rotate-180' />}
        text='Logout'
        onClick={logOut}
        border
      />
    </div>
  )
}

export default Dropdown
