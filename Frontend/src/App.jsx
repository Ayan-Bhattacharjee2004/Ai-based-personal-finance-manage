import { useState } from 'react'

import IncomeForm from './Components/Income/IncomeForm'
import './App.css'
import Income from './Pages/Income'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <IncomeForm/> */}
      <Income/>
    </>
  )
}

export default App
