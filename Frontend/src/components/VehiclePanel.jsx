import React from 'react'
import { RiArrowDownWideLine } from "react-icons/ri";


const VehiclePanel = (props) => {
    return (
        <>
            <h3 className='text-2xl font-semibold mt-4 mb-7 flex gap-6 items-center justify-center w-full'>Prefer a Vehicle: <RiArrowDownWideLine onClick={() => { props.setVehiclePanelOpen(false) }} /> </h3>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle("car")
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-center'>
                <img className='h-10' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car image" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span></span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600 '>Affordable, safe & secure</p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.car} PKR</h2>
            </div>

            <div onClick={() => {
                props.selectVehicle("motorcycle")
                props.setConfirmRidePanel(true)
            }} className='flex w-full border-2 active:border-black mb-2 rounded-xl p-3 items-center justify-center'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="motorcycle image" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span></span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600 '>Affordable, safe & secure</p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.motorcycle} PKR</h2>
            </div>

            <div onClick={() => {
                props.selectVehicle("auto")
                props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-center'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="auto image" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span></span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600 '>Affordable, safe & secure</p>
                </div>
                <h2 className='text-xl font-semibold'>{props.fare.auto} PKR</h2>
            </div>
        </>
    )
}
export default VehiclePanel