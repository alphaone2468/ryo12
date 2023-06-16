import React, { useEffect, useState } from 'react'
import load from "./images/loading.gif"
import { useNavigate } from 'react-router-dom';

export default function Yourpost() {
    const [data,setdata] = useState([])
    const [rat,setrat]=useState([])
    const [totalpost,settotalpost] = useState();
    const [loading,setloading]=useState(false);
    const nav=useNavigate();
    useEffect(()=>{
    callme();

    var rate = [];
    async function callme(){
        const a=localStorage.getItem('ryo');
        if(!a){
            nav("/login");
        }
        const n = localStorage.getItem("ryo");
        const obj = {
            name:n
        }
        setloading(true);
        //console.log(obj)
        const f = await fetch("https://ryobackend.onrender.com/yourpost",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res = await f.json()
        //console.log(res)
        setloading(false);
        res.map((e)=>{
        var arr=e.comments[0].ratings;
        var sum=0;
        for (let index = 0; index < arr.length; index++) {
            sum=sum+arr[index]
        }
        var avg=sum/arr.length;

        //console.log(avg)
        rate.push(avg);
       
        })

      //console.log(res)
      //console.log(rate)
      settotalpost(res.length)
      setrat(rate)
      setdata(res)
    }
},[])
  return (
    <>
    <h1 className='maketextcenter'>Your Posts</h1>
    <p className='maketextcenter'>Total Posts posted : <strong>{totalpost}</strong></p>
    {(loading)? <div className="loadclass">
    <img src={load} alt="" className='loadimg'/>
    </div> : <p></p>}
    <div>
        {
            data.map((e)=>{
                return <>
                <div  className='makepostbox'>
                    
                <img src={e.image} alt="" className='postimage'/>
                <p className='maketextcenter'>No. of ratings : <strong>{e.comments[1].count}</strong></p>
                <p id={`rating${e.uniqueid}`} className='maketextcenter'>OverAll Ratings: <strong>{(rat[e.uniqueid-1])? Math.floor(rat[e.uniqueid-1]) : 0}</strong></p>
                </div>
                </>
            })
        }
    </div>
    </>
  )
}
