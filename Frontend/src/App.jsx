import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Usersignup from "./pages/Usersignup.jsx"
import UserLogin from "./pages/Userlogin.jsx"
import Captainlogin from "./pages/Captainlogin.jsx"
import Captainsignup from "./pages/Captainsignup.jsx"
import Start from './pages/Start.jsx'
import Home from './pages/Home.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import Userlogout from './pages/Userlogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
          {/* // users routes starting */}
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/riding' element={<Riding />} />
          <Route path='/signup' element={<Usersignup />} />
          <Route path='/home' element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          } />
          <Route path='/users/logout' element={<Userlogout />} />
          {/* // captain routes starting */}
          <Route path='/captain-login' element={<Captainlogin />} />
          <Route path='/captain-signup' element={<Captainsignup />} />
          <Route path='/captain-logout' element={<CaptainLogout />} />
          <Route path='/captain-riding' element={<CaptainRiding />} />
          <Route path='/captain-home' element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App
