import React from "react"
import "./App.css"
import { Route,Routes,BrowserRouter } from "react-router-dom"
import Reg from "./components/Reg"
import Login from "./components/Login"
import Home from "./components/Home"
import Postimage from "./components/Postimage"
import Back from "./components/Back"
import Seecomments from './components/SeeComments'
import Yourpost from "./components/Yourpost"
import SearchUser from "./components/SearchUser"
import GetAUserPosts from "./components/GetAUserPosts"
import Goto from "./components/Goto"
import Contact from "./components/Contact"
import SearchPost from "./components/SearchPost"
import GetFollowing from "./components/GetFollowing"

function App(){
  return(
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/"element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/registration" element={<Reg/>}></Route>
        <Route path="/postimage" element={<Postimage/>}></Route>
        <Route path="/back" element={<Back/>}></Route>
        <Route path="/morecomments" element={<Seecomments/>}></Route>
        <Route path="/yourpost" element={<Yourpost/>}></Route>
        <Route path="/searchuser" element={<SearchUser/>}></Route>
        <Route path="/userposts" element={<GetAUserPosts/>}></Route>
        <Route path="/post/:uniqueid" element={<Goto/>}></Route>
        <Route path="/contactme" element={<Contact/>}></Route>
        <Route path="/searchpost" element={<SearchPost/>}></Route>
        <Route path="/following" element={<GetFollowing/>}></Route>
        <Route element={<h1>error page</h1>}></Route>



      </Routes>
    
    </BrowserRouter>
  )
}

export default App