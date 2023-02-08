import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import store from './app/store'
import AppProviders from './AppProviders'
import { fetchQuestions } from './features/questionsSlice'
import { fetchUsers } from './features/usersSlice'
import './index.css'

async function main() {
  const container = document.getElementById('root')
  const root = createRoot(container)
  store.dispatch(fetchUsers())
  store.dispatch(fetchQuestions())
  root.render(
    <AppProviders>
      <App />
    </AppProviders>
  )
}
main()
