import React from "react"
import { useState } from "react"
import LAC from "./pages/Master/LedgeAccountCreation/LAC"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {
   return (
    <>
    <Header/>
    <div className="flex">
    <Sidebar/>
    <LAC/>
    </div>
      

    
      
    
      
    </>
  )
}

export default App
