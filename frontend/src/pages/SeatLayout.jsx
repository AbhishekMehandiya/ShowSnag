import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowBigRightIcon, ClockIcon } from 'lucide-react'
import isoTime from '../lib/isoTime'
import toast from 'react-hot-toast'
import BlurCircle from '../components/BlurCircle'

function SeatLayout() {
  const{id,date}=useParams()
  const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]
  const[selectedSeats,setSelectedSeats]=useState([])
   const[selectedTime,setSelectedTime]=useState(null)
   const[show,setShow]=useState(null)
   const navigate=useNavigate()
   const getShow=async ()=>{
    const show=dummyShowsData.find(show=>show._id===id)
    // console.log(show);
    if(show){
      setShow({
        movie:show,
        dateTime:dummyDateTimeData
      })
    }
   }
   const handleSeatClick =(seatId)=>{
    console.log(selectedTime)
    if(!selectedTime){
      return toast("please select time first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length>4){
      return toast("you can only select 5 seats")
    }
    setSelectedSeats(prev=>prev.includes(seatId)?prev.filter(seat=>
      seat!==seatId):[...prev,seatId])
   }
   const renderSeats=(row,count=9)=>(
    <div key={row} className='flex gap-2 mt-2'>
<div className='flex flex-wrap items-center justify-center gap-2 '>
  {Array.from({length:count},(_,i)=>{
    const seatId=`${row}${i+1}`;
    return (
      <button key={seatId}  onClick={()=>handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60
         cursor-pointer ${selectedSeats.includes(seatId)&& 
          "bg-primary text-white"}`}>
            {seatId}
          </button>
    )
  })

  }
</div>
    </div>
   )
   useEffect(()=>{
    getShow()
   },[])
  return show? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30
    md:pt-50'>
      <div className='w-60 bg-primary/10 border border-primary/20 roundeed-lg py-10
      h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
     <div className='mt-5 space-y-1'>
      {show.dateTime[date].map((item)=>(
        <div key={item.time} onClick={()=>setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer 
        transition ${selectedTime?.time===item.time?"bg-primary text-white":"hover:bg-primary/20"}`}>
          <ClockIcon className='w-4 h-4'/>
          <p className='text-sm'>{isoTime(item.time) }</p>
        </div>
      ))}
     </div>
      </div>

<div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
  <BlurCircle top='-100px' left='-100px'/>
  <BlurCircle bottom='0px' right='0px'/>
  <h1 className='text-2xl font-semibold mb-4 '>Select your seat</h1>
  <img src={assets.screenImage} alt="screen" className='' />
  <p className='text-gray-400 '></p>
  <div className='flex flex-col items-centerr mt-10 text-xs text-gray-300'>
    <div className='grid grid-cols-2 md:gid-cols-1 gap-8 md:gap-2 mb-6'>
      {groupRows[0].map(row=>renderSeats(row))}
    </div>
    <div className='grid grid-cols-2 gap-11'>
    {groupRows.slice(1).map((group,index)=>(
      <div key={index}>{group.map(row=>renderSeats(row))}</div>
    ))}
  </div>
  </div>
  <button onClick={()=>{navigate("/my-bookings");scrollTo(0,0)}} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm
  bg-primary hover:bg-primary-dull transition rounded-full font-medium 
  cursor-pointer active:scale-95'>Proceed to Checkout <ArrowBigRightIcon strokeWidth={3} className='w-4 h-4'/> </button>
</div> 
    </div>
  ):<Loading/>
}

export default SeatLayout
