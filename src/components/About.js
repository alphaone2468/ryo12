import React, { useState } from 'react'

export default function About() {
  const [string,setstring]=useState("")
  async function callme(e) {
    const file=e.target.files[0];
    const base64=await convertToString(file);
    // console.log(base64)
    setstring(base64)
  }
  function handlesubmit(e) {
    e.preventDefault();
    // console.log(string)
  }
  return (
    <div>
      <h1> i am about component</h1>
      <form onSubmit={handlesubmit}>
        <label htmlFor="file-upload">
          <h1>click me to upload</h1>
        </label>
      <input type="file" name="ima" id="file-upload" accept='.jpg,.jepg,.png' onChange={callme}/>
      <button type="submit">click me to submit</button>
      </form>
      <img src={string} alt="" />
    </div>
  )
}

function convertToString(file){
  // console.log("calling")
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