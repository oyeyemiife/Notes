import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signin from './Pages/signin'
import Signup from './Pages/Signup'
import Notes from './Pages/Notes'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/notes' element={<Notes/>} />
           <Route path='/signin' element={<Signin />} />
      </Routes>
      </BrowserRouter>
       
    </>
  )
}

export default App
