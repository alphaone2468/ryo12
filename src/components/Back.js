import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Back() {
    const nav=useNavigate();
    useEffect(()=>{
        callme()
    })
    function callme() {
        // //console.log(" calling ")
        nav("/")
    }
  return (
    <div>
      <h1 onClick={callme}></h1>
    </div>
  )
}
