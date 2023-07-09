import React, { useEffect, useState } from "react";
import photo from './images/ProfileLogo.jpg'
import { useNavigate } from "react-router-dom";

function GetFollowing(){
    const nav=useNavigate();
    const [followarray,setfollowarray]=useState([])
    const [loading,setloading]=useState(false);
    useEffect(()=>{
        callme();
    },[])
    async function callme(){
        setloading(true);
        const user=localStorage.getItem("ryo");
        console.log(user)
        const obj={
            user:user
        }
        console.log("calling")
        const f = await fetch("https://ryobackend.onrender.com/getfoll",{
            method:"post",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':"application/json"
            }
        })
        const res = await f.json();
        console.log(res);
        setfollowarray(res[0].following)
        setloading(false);
    }
    function handleAUserPosts(e){
        localStorage.setItem("SeeAUserPost",e)
        nav("/userposts")
    }
    return (
        <>
        <div className="searchcon">
        <div>
        <h1>Following </h1>
        <input type="text" className="followinput"/>
        {(loading)? <p>loading.........</p>: <p></p>}
        {followarray.map((e)=>{
            return<>
            <div>
            <img src={photo} alt="" className="postimg"/>
             <span className="movetop" onClick={()=>{handleAUserPosts(e)}}>{e}</span>

            </div>
            </>
        })}
        </div>
        </div>
        </>
    )
}

export default GetFollowing