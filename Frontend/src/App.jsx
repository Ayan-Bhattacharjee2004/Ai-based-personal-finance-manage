import { useState } from 'react'
import Dashboard from './Pages/Dashboard'
import IncomeForm from './Components/Income/IncomeForm'
import './App.css'
import Income from './Pages/Income'
import ExpenseForm from './Components/Expense/ExpenseForm'
import Expense from './Pages/Expense'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <IncomeForm/> */}
      {/* <Dashboard/> */}
      <Income/>
      {/* <ExpenseForm/> */}
      <Expense/>
    </>
  )
}

export default App
