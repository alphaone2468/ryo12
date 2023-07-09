import React, { useState } from 'react'
import photo from "./images/uploadPhoto.jpg"
import { Link } from 'react-router-dom'


export default function About() {
  const [string,setstring]=useState("")
  const [img,setimg]=useState("")
  const [loading,setloading]=useState(false);
  //console.log(img);
  async function callme(e) {
    const file=e.target.files[0];
    const base64=await convertToString(file);
    //console.log(base64)
    setimg(base64)
    document.getElementById("hidemeinstart").style.display="block"
    setstring(base64)
  }
  async function handlesubmit(e) {
    setloading(true);
    const obj={
        owner:localStorage.getItem("ryo"),
        image:string,
        ratings:1,
        comments:[{ratings:[]},{count:0}]

    }
    const f=await fetch("https://ryobackend.onrender.com/postimage",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const res=await f.json()
    //console.log(res)
    if(res.success=="up"){
      document.getElementById("hideme").style.display="block"
      setloading(false);
    }
    
    //console.log(obj)
  }
  function hidemecall() {
    //console.log("calling")
    document.getElementById("hideme").style.display="none";

  }
  return (
    <div>
      <h1 className='makecenter2'>Upload Your Image</h1>
      
        <label htmlFor="file-upload" className='makecorrect'>
        <div className='makeflexandcenter'>
        <img src={photo} alt="" className='uploadimg' id='hideme' onClick={hidemecall}/>
      </div>
        </label>
      <input type="file" name="ima" id="file-upload" accept='.jpg,.jepg,.png' onChange={callme} style={{"display":"none"}}/>
      <img src={img} alt="" className='postimage someMarginInLeftAndRight none' id="hidemeinstart"/>
      <p id="hideme" className='none'><strong>Image Posted Successfully</strong></p>
      {(loading)? <p className='aligncenter'><strong>posting.....</strong></p>:""}
      <div className="butcon">
      <button onClick={handlesubmit} className='makebold'>Submit</button>
      </div>
      <Link to="/" className='makecenter2 linkofgoto margintop'>Back To Home</Link>
    </div>
  )
}

function convertToString(file){
  //console.log("calling")
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
      resolve(fileReader.result)
    }
    fileReader.onerror=(error)=>{
      reject(error)
    }

  })

}