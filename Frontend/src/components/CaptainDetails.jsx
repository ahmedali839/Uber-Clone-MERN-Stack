
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";


const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)



    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                    {/* <h4 className='text-lg font-medium capitalize'>Ahmed Captain</h4> */}
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                
                <div className='text-center'>
                    {/* <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i> */}
                    <FaMoneyBillAlt size={30} />

                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    {/* <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i> */}
                    <CiTimer size={30} />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    {/* <i className="text-3xl mb-2 font-thin ri-booklet-line"></i> */}
                    <FaFile size={30} />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails