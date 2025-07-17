import { useState } from 'react'

import NavBar from "./components/NavBar"
import { Route, Routes, useLocation } from 'react-router-dom'
import MovieDetails from "./pages/MovieDetails"
import Movies from"./pages/Movies"
import Favorite from "./pages/Favorite"
import MyBooking from "./pages/MyBooking"
import Home from './pages/Home'
import SeatLayout from "./pages/SeatLayout"
import Footer from "./components/Footer"
import {Toaster} from "react-hot-toast"
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBooking from './pages/admin/ListBooking'
function App() {
  const isAdminRoute=useLocation().pathname.startsWith("/admin")

  return  (
    <> <Toaster />
    {  !isAdminRoute && <NavBar/>}
      <Routes>
        <Route  path='/' element={<Home/>} />
             <Route  path='/favorite' element={<Favorite/>} />
                  <Route  path='/my-bookings' element={<MyBooking/>} />
                    
                            <Route  path='/movies/:id' element={<MovieDetails/>} />
                               <Route  path='/movies/:id/:date' element={<SeatLayout/>} />
                                 <Route  path='/movies' element={<Movies/>} />
                                 <Route path='/admin/*' element={<Layout/>}>
                                  <Route index element={<Dashboard/>}/>
                                  <Route path='add-shows' element={<AddShows/>}/>
                                  <Route path='list-shows' element={<ListShows/>}/>
                                  <Route path='list-bookings' element={<ListBooking/>}/>
                                 </Route>
      </Routes>
     
      {  !isAdminRoute && <Footer/>}
    </>
  )
}

export default App
