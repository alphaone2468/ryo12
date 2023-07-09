import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav=useNavigate()
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [loading,setloading]=useState(false);
  async function callme(){
    const obj={
      email:email,
      password:password
    }
    if(email.length<1){
      document.getElementById("one").style.display = "block";
      return false;
    }
    if(password.length<1){
      document.getElementById("two").style.display = "block";
      return false;
    }
    setloading(true);
    const f=await fetch("https://ryobackend.onrender.com/login",{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const res=await f.json()
    //console.log(res)
    if(res.error){
      document.getElementById("showmsg").style.display="block"
      setloading(false);
    }
    else{
      //console.log(res.success)
      //console.log(res.email)
      localStorage.setItem("ryo",res.success)
      localStorage.setItem("ryoe",res.email)
      nav("/")

    }
  }
  return (
    <>
    <div className="divhome">
      <div className='addshadow'>
      <div className='makeloginbuttoncenter'>

        <h1 className='maketop'>Login</h1>
      </div>
        <div className="group">
        <label>Email</label>
        <input required="" type="text" className="input" onChange={(e)=>setemail(e.target.value)}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <p className="makemered" id="one">Field is Missing</p>
        </div>
        <div className="group">
        <label>Password</label>
        <input required="" type="password" className="input" onChange={(e)=>setpassword(e.target.value)}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <p className="makemered" id="two">Field is Missing</p>
        </div>
        <p className='makemered' id="showmsg">Invalid Details</p>
        {(loading)? <p>loading......</p> : <p></p>}
        <div className="makeloginbuttoncenter">

        <button onClick={callme} className='makebold'>Login </button>
        </div>
        <div className='center'>

        <Link to="/registration">

        <p style={{color:"blue",cursor:"pointer",fontWeight:500,position:"relative",top:"30px"}} className=''>Don't Have An Account ?</p>
        </Link>
        </div>
        </div>


        

      </div>

        </>
  )
}
