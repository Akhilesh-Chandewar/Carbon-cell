import { useState } from 'react'
import './App.css'
import { Sidebar } from './components'
import { Home } from './pages'

function App() {

  return (
    <div className='flex'>
      <Sidebar />
      <Home />
    </div>
  )
}

export default App
