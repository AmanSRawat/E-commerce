import {Route,Routes} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Home from './pages/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
