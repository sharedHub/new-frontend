import React from "react"
import { useState } from "react"
import LAC from "./pages/Master/LedgeAccountCreation/LAC"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import SGM from "./pages/Master/StoneGroupMaster/SGM"
function App() {
   return (
    <>
    <Header/>
    <div className="flex">
    <Sidebar/>
    {/* <SGM/> */}
    <LAC/>
    </div>
      


    
      
    </>
  )
}

export default App
