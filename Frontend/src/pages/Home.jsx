import React, { useState, useEffect, useContext } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import axios from 'axios'
import { useRef } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { RiArrowTurnForwardFill } from 'react-icons/ri'
import { SocketContext } from "../context/SocketContext"
import { useNavigate } from "react-router-dom"
// import { socketContext } from "../context/SocketContext"

import { UserDataContext } from "../context/UserContext"
import LiveTracking from '../components/LiveTracking'


const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState("") // "pickup" or "destination"
  const [fare, setFare] = useState({}) // get fare to fetch charges from backend 
  const [panelOpen, setPanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const cornfirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  const navigate = useNavigate()

  useEffect(() => {

    socket.emit("join", { userType: "user", userId: user._id })

  }, [user])

  socket.on("ride-confirmed", ride => {
    setRide(ride)
    setVehicleFound(false)
    setVehiclePanelOpen(false)
    setWaitingForDriver(true)
  })



  socket.on("ride-started", ride => {
    setWaitingForDriver(false)
    navigate("/riding", { state: { ride } })

  })



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(cornfirmRidePanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(cornfirmRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriver])


  const onSubmit = (e) => {
    e.preventDefault()
  }

  // Fetch suggestions from backend
  const fetchSuggestions = async (type, value) => {
    if (!value) {
      if (type === "pickup") setPickupSuggestions([])
      else setDestinationSuggestions([])
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions/`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (type === "pickup") setPickupSuggestions(res.data || [])
      else setDestinationSuggestions(res.data || [])
    } catch (err) {
      if (type === "pickup") setPickupSuggestions([])
      else setDestinationSuggestions([])
    }
  }

  async function findTrip() {
    setPanelOpen(false)
    setVehiclePanelOpen(true)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare/`, {
      params: { pickup: pickup.description, destination: destination.description },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    //  giving fare (charges to separately vehicles)
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup: pickup.description,
      destination: destination.description,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="/images/uber black.png" alt="Uber_logo" />

      <div className='h-screen w-screen'>
        {/* Image for temporary use */}
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <LiveTracking />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[25%] p-6 bg-white relative'>
          <h4 className='text-3xl font-semibold flex gap-40'>Find a trip <span onClick={(() => { setPanelOpen(false) })}><IoIosArrowDown /></span> </h4>
          <form onSubmit={onSubmit}>
            <div className="line h-16 absolute w-1 left-10 top-[40%] bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField("pickup")
              }}
              value={pickup.description}
              onChange={(e) => {
                setPickup(e.target.value)
                setActiveField("pickup")
                fetchSuggestions("pickup", e.target.value)
              }}
              className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Add a pickup location' />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField("destination")
              }}
              value={destination.description}
              onChange={(e) => {
                setDestination(e.target.value)
                setActiveField("destination")
                fetchSuggestions("destination", e.target.value)
              }} className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
          <button
            onClick={findTrip}
            className="w-full mt-4 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-900 transition-colors font-semibold text-lg"
          >
            Continue
          </button>
        </div>

        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
            onSuggestionClick={(suggestion) => {
              if (activeField === "pickup") {
                setPickup(suggestion)
                setPickupSuggestions([])
              } else {
                setDestination(suggestion)
                setDestinationSuggestions([])
              }
              // setPanelOpen(false)
            }}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div ref={cornfirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRide fare={fare} vehicleType={vehicleType} pickup={pickup.description} destination={destination.description} createRide={createRide} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver fare={fare} vehicleType={vehicleType} pickup={pickup.description} destination={destination.description} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12">
        <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home