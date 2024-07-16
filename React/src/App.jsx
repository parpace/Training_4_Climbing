import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
// import SignUp from './components/SignUp'
import UserHome from './components/UserHome'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path='/username/:username' element={<UserHome/>}/>
      </Routes>
    </>
  )
}

export default App
