import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectAllUsers  } from '../features/usersSlice'
import { loginAuthUser } from '../features/authSlice'

export default function Login() {
  const [user, setUser] = useState(null)
  const users = useSelector(selectAllUsers)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  async function login(user) {
    setUser(user)
    dispatch(loginAuthUser(user))
    if (location.pathname !== '/') {
      return
    }
    navigate('/', { replace: true })
  }

  if (!users)
    return (
      <div
        data-testid='login_loading'
        className='flex h-screen items-center justify-center font-mono text-4xl font-semibold'>
        Loading...
      </div>
    )
  else
    return (
      <div className='mx-auto w-80'>
        <header className='mb-4 pt-20 text-center'>
          <h1 data-testid='login_page' className='border-b-4 pb-2 text-2xl font-bold'>
            Employee Polls Login Portal
          </h1>
        </header>
        {!user && (
          <h2 className='mb-4 border-b-2 pb-2 text-center text-xl font-medium shadow-sm shadow-black/30'>
            Please select a user to login
          </h2>
        )}
        <div className='space-y-4'>
          {users?.map((user, i) => (
            <LoginOption key={i} user={user} onClick={() => login(user)} />
          ))}
        </div>
      </div>
    )
}

function LoginOption({ user, onClick }) {
  return (
    <div
      className='flex h-14 cursor-pointer items-center rounded-[5px] border border-gray-300 bg-white hover:bg-gray-100'
      onClick={onClick}>
      <div className='rounded-l-[5px] px-3'>
        <img
          src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${user.name}`}
          alt={user.name}
          className='h-8 w-8 rounded-full'
        />
      </div>
      <div className='flex h-12 w-full items-center justify-center rounded-r-[5px] border-l border-gray-300 p-4'>
        <h3 className='font-medium'>{user.name}</h3>
      </div>
    </div>
  )
}
