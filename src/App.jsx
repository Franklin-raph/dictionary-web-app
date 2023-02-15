import { useState } from 'react'
import './App.css'
import Body from './components/Body'
import Header from "./components/Header"

function App() {

  const [darkToggle, setDarkToggle] = useState(false)

  function toggleBackground() {
    setDarkToggle(!darkToggle)
  }

  return (
    <div className={`lg:w-2/4 md:w-3/4 sm:w-full p-8 px-4 mx-auto wrapper ${darkToggle && 'dark'}`}>
      <Header toggleBackground={toggleBackground} />
      <Body />
    </div>
  )
}

export default App

