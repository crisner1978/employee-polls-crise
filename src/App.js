import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthApp from './AuthApp'
import { selectAuthUser } from './features/authSlice'
import { fetchQuestions } from './features/questionsSlice'
import { fetchUsers } from './features/usersSlice'
import { Login } from './pages'

function App() {
  const authUser = useSelector(selectAuthUser)
  const dispatch = useDispatch()

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
