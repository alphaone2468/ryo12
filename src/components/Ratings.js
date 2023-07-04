import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Ratings(props) {
  const nav=useNavigate()
    async function callme(i,u){
        for (let index = 0; index < 11; index++) {
          document.getElementById(`child${index+1}${u}`).style.backgroundColor="white"
        }
        console.log("final",i-1)
        const final=i-1
        localStorage.setItem("deleteme",final);
        for(var j=0;j<i;j++){
          document.getElementById(`child${j+1}${u}`).style.backgroundColor="green"
        }
        const obj={
            id:u,
            ratinggiven:final
        }
        const f=await fetch("https://ryobackend.onrender.com/updatepost",{
            method:"put",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const res=await f.json()
        console.log(res)

      }
  return (
    <div>
      <div className="ratingscon">
        <p className="child" id={`child1${props.name}`} onClick={()=>{callme(1,props.name)}}><br/>0</p>
        <p className="child" id={`child2${props.name}`} onClick={()=>{callme(2,props.name)}}><br/>1</p>
        <p className="child" id={`child3${props.name}`} onClick={()=>{callme(3,props.name)}}><br/>2</p>
        <p className="child" id={`child4${props.name}`} onClick={()=>{callme(4,props.name)}}><br/>3</p>
        <p className="child" id={`child5${props.name}`} onClick={()=>{callme(5,props.name)}}><br/>4</p>
        <p className="child" id={`child6${props.name}`} onClick={()=>{callme(6,props.name)}}><br/>5</p>
        <p className="child" id={`child7${props.name}`} onClick={()=>{callme(7,props.name)}}><br/>6</p>
        <p className="child" id={`child8${props.name}`} onClick={()=>{callme(8,props.name)}}><br/>7</p>
        <p className="child" id={`child9${props.name}`} onClick={()=>{callme(9,props.name)}}><br/>8</p>
        <p className="child" id={`child10${props.name}`} onClick={()=>{callme(10,props.name)}}><br/>9</p>
        <p className="child" id={`child11${props.name}`} onClick={()=>{callme(11,props.name)}}><br/>10</p>
    </div>
    </div>
  )
}
