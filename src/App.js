import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthApp from './AuthApp'
import { selectAuthUser } from './features/authSlice'
import { fetchQuestions } from './features/questionsSlice'
import { fetchUsers } from './features/usersSlice'
import { useAuthUser } from './lib/firebase'
import UnAuthApp from './UnAuthApp'

function App() {
  const user = useSelector(selectAuthUser)
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true
    if (user && subscribed) {
      dispatch(fetchQuestions())
      dispatch(fetchUsers())
    }
    return () => {
      subscribed = false
    }
  }, [dispatch, user])

  useAuthUser()

  return user ? <AuthApp /> : <UnAuthApp />
}

export default App
