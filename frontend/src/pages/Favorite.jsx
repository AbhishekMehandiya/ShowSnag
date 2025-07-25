import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from "../components/BlurCircle"
function Favorite() {
  return dummyShowsData.length > 0 ? (
    <div className='relative my-40 mb-60 md:px-6 lg:px-40 xl:px-44 
    overflow-hidden min-h-[80vh'>
      <BlurCircle top="150px" left="0px"/>
      <BlurCircle bottom="50px" right="5px"/>
      <h1 text-lg font-medium my-4>Your's favorite Movies</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.map((movie)=>(
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div   >
  ):(
    <div className='flex flex-col items-center justify-center h-screen'>
<h1 className='text-3xl font-bold text-center'>No movies available</h1>
    </div>
  )
}

export default Favorite
