import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext" 
import axios from "axios"


const Captainlogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({});

  const {captain, setCaptain} = useContext(CaptainDataContext)
  
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault();
    const setCaptainData = {
      email: email,
      password: password
    }

    let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, setCaptainData)

    if (response.status === 200) {
      let data = response.data
      setCaptain(data.captain)
      localStorage.setItem("token", data.token)
      navigate("/captain-home")
    }

    setEmail("");
    setPassword("");
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-18 pb-3' src="/images/uber-driver-white.png" alt="Uber_logo" width={"100px"} />
        <form onSubmit={onsubmit} action="">
          <h3 className='text-lg mb-2'>What's your email: </h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='example@gmail.com ' required />
          <h3 className='text-lg mb-2'>Enter your Password:  </h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='Password123 ' required />
          <button
            className='bg-[#8d8c8c] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
          <p className='text-center'>New here? <Link to={"/captain-signup"} className="text-blue-500">Register as a new Captain Account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/login"} className='flex items-center justify-center bg-orange-400 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        ><button>Sign in as User</button></Link>
      </div>
    </div>
  )
}

export default Captainlogin