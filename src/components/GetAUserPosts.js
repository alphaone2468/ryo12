import React, { useState } from 'react'
import { useEffect } from 'react';
import photo from './images/ProfileLogo.jpg'
function GetAUserPosts(){
    const [data,setdata]=useState([]);
    const [totalpost,settotalpost]=useState(0);
    const [ratearray,setratearray]=useState([]);
    const [loading,setloading]=useState(false);
    useEffect(()=>{
        callme();
    },[])

    async function callme(){
        console.log("calling")
        setloading(true);
        const user=localStorage.getItem("SeeAUserPost");
        const obj={
            username:user
        }
        const f=await fetch("https://ryobackend.onrender.com/getauserposts",{
            method:"post",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res = await f.json();
        console.log(res);
        setdata(res);
        settotalpost(res.length);
        let ratearr=[]
        res.forEach((e)=>{
            let calavg=e.comments[0].ratings
            let sum=0;
            calavg.forEach((ele)=>{
                sum = sum + ele;
            })
            let avg = sum/calavg.length
            console.log(avg)
            ratearr.push(avg);

        })
        console.log(ratearr);
        setratearray(ratearr);
        setloading(false);
    }
    return (
        <>
        <div className="postcon">
        <div className='divofuserposts'>
        <div>
        <img src={photo} alt="" className='logoofuser'/>
        <p className='nameBelowProfile'>{localStorage.getItem("SeeAUserPost")}</p>
        </div>
        <div>
        <span className='numberOfTotalPost'>{totalpost}</span>
        <span className='logosidespan'>Posts</span>

        </div>
        </div>
        <h1 className='makecenter2'>Posts : </h1>
        {(loading) ? <p style={{fontWeight:'500'}} className='makecenter2'>loading ..... </p> : <p></p>}        {
            data.map((e,index)=>{
                return<>
                 <div  className='makepostbox'>
                    <img src={photo} alt="" className='postimg' />
                    <span className='makesomechages'>{e.owner}</span>
                    <img src={e.image} alt="" className='postimage'/>
                    <p className='maketextcenter'>No. of ratings : <strong>{e.comments[1].count}</strong></p>
                    <p id={`rating${e.uniqueid}`} className='maketextcenter'>OverAll Ratings {ratearray[index]}</p>
                    </div>
                </>
            })
        }
        </div>
        </>
    )
}

export default GetAUserPosts;