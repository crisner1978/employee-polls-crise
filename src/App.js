import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthApp from './AuthApp'
import { selectAuthUser } from './features/authSlice'
import { fetchQuestions } from './features/questionsSlice'
import { fetchUsers } from './features/usersSlice'
import { routes } from './lib/routes'
import { Login } from './pages'

function App() {
  const authUser = useSelector(selectAuthUser)
  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const navigate = useNavigate()

  useEffect(() => {
    if (!routes.includes(path) && authUser) {
      navigate('/404')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let subscribed = true
    if (authUser && subscribed) {
      dispatch(fetchQuestions())
      dispatch(fetchUsers())
    }
    return () => {
      subscribed = false
    }
  }, [dispatch, authUser])

  return authUser ? <AuthApp /> : <Login />
}

export default App
