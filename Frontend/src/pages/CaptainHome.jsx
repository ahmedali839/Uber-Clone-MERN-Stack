// import React from 'react'
// // import { Link, useLocation } from 'react-router-dom' // Added useLocation
// import { Link, } from 'react-router-dom' // Added useLocation
// import { useEffect, useContext } from 'react'
// // import { SocketContext } from '../context/SocketContext'
// import { useNavigate } from 'react-router-dom'
// // import LiveTracking from '../components/LiveTracking'
// import { IoExitOutline } from "react-icons/io5";



// const CaptainHome = () => {
//   return (
//     <div>
//       <div className='h-screen'>

//         <div className='p-3 fixed top-0'>
//           <img className='w-16' src="/images/uber black.png" alt="Uber_logo" />
//           <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//             {/* <i className="text-lg font-medium ri-home-5-line"></i> */}
//             <IoExitOutline />
//           </Link>
//         </div>
//         <div className='h-1/2'>
//           {/* <LiveTracking /> */}

//         </div>
//         <div className='h-1/2 p-4'>
//           <div className='flex items-center justify-between'>
//             <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//             <div className='text-right'>
//               {/* <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
//                         <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4> */}
//               <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

//             </div>
//           </div>

//           <div className='flex gap-2 justify-between flex-col items-center'>
//             <div className='w-full mt-5'>

//               <div className='flex items-center gap-5 p-3 border-b-2'>
//                 <i className="text-lg ri-map-pin-2-fill"></i>
//                 <div>
//                   <h3 className='text-lg font-medium'>562/11-A</h3>
//                   {/* <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p> */}
//                 </div>
//               </div>
//               <div className='flex items-center gap-5 p-3'>
//                 <i className="ri-currency-line"></i>
//                 <div>
//                   {/* <h3 className='text-lg font-medium'>₹{ride?.fare} </h3> */}
//                   <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CaptainHome











import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import CaptainDetails from '../components/CaptainDetails'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)


    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)

    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain?._id,
            userType: 'captain'
        }), []
    })

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

              socket.emit('update-location-captain', {
                    userId: captain?._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
    // }, [])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopupPanel(true)
    })

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(10%)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(5%)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])




    return (
        <div className='h-screen'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>

            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>

            <div ref={ridePopupPanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome