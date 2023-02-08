import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthApp from './AuthApp'
import { selectAuthUser } from './features/authSlice'
import { routes } from './lib/routes'
import { Login } from './pages'

function App() {
  const authUser = useSelector(selectAuthUser)
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const navigate = useNavigate()

  useEffect(() => {
    if (!routes.includes(path) && authUser) {
      navigate('/404')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return authUser ? <AuthApp /> : <Login />
}

export default App
