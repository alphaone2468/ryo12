import React from "react"
import "./App.css"
import { Route,Routes,BrowserRouter } from "react-router-dom"
import Navbar from "./components/Navbar"
import Reg from "./components/Reg"
import Login from "./components/Login"
import Home from "./components/Home"
import About from "./components/About"
import Postimage from "./components/Postimage"
import Back from "./components/Back"
import Seecomments from './components/SeeComments'
import Yourpost from "./components/Yourpost"

function App(){
  return(
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/"element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/registration" element={<Reg/>}></Route>
        <Route path="/postimage" element={<Postimage/>}></Route>
        <Route path="/back" element={<Back/>}></Route>
        <Route path="/morecomments" element={<Seecomments/>}></Route>
        <Route path="/yourpost" element={<Yourpost/>}></Route>
        <Route element={<h1>error page</h1>}></Route>



      </Routes>
    
    </BrowserRouter>
  )
}

export default App