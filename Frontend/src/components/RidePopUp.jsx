import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>News Ride available !</h3>

            <div className='flex justify-between items-center bg-yellow-300 rounded-lg p-3 mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/premium-photo/boy-with-thumbs-up-near-face-smiling-yellow-background_116547-93698.jpg" alt="" />
                    {/* <h2 className='text-xl font-medium'>Ahmed Yar</h2> */}
                    <h2 className='text-xl font-medium'>{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname} </h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>


            <div className='flex gap-2 justify-between flex-col items-center'>
                {/* <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" /> */}
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(true)
                    props.confirmRide()
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>

                <button onClick={() => {
                    props.setRidePopupPanel(false)
                }} className='w-full bg-gray-400 text-white font-semibold p-2 rounded-lg'>Ignore</button>
            </div>

        </div>
    )
}

export default RidePopUp