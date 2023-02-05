import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './app/store'


const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <div className='min-h-screen bg-zinc-100'>{children}</div>
      </Router>
    </Provider>
  )
}

export default AppProviders
