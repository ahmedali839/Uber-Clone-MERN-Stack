import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext"
import axios from "axios"

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({});


  const { user, setUser } = useContext(UserDataContext)

  const navigate = useNavigate()


  const onsubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate("/home")
    }

    setEmail("");
    setPassword("");
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 pb-8 ' src="/images/uber black.png" alt="Uber_logo" />
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
          <p className='text-center'>New here? <Link to={"/signup"} className="text-blue-500">Create new Account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/captain-login"} className='flex items-center justify-center bg-green-400 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        ><button>Sign in as Captain</button></Link>
      </div>
    </div>
  )
}

export default UserLogin  