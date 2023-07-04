import React, { useEffect, useState } from 'react'
import load from "./images/loading.gif"
import { useNavigate,Link } from 'react-router-dom';
import share2 from './images/share2.png'

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
        console.log(obj)
        const f = await fetch("https://ryobackend.onrender.com/yourpost",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res = await f.json()
        console.log(res)
        setloading(false);
        res.map((e)=>{
        var arr=e.comments[0].ratings;
        console.log(arr)
        var sum=0;
        for (let index = 0; index < arr.length; index++) {
            sum=sum+arr[index]
        }
        var avg=sum/arr.length;

        console.log(avg)
        rate.push(avg);
       
        })

      console.log(res)
      console.log(rate)
      settotalpost(res.length)
      setrat(rate)
      setdata(res)
    }
},[])
async function handleshare(id){
    console.log("share ", id);
    await navigator.share({
      title:"Hey! Would U Like To See My New Outfit",
      text:"You Can Also Rate My Outfit On A Scale Of 10 \n To See The Outfit \n Follow This Link : ",
      url:`http://localhost:3000/post/${id}`
    });
  }
  return (
    <>
    <div className="postcon">
    <h1 className='maketextcenter'>Your Posts</h1>
    <p className='maketextcenter'>Total Posts posted : <strong>{totalpost}</strong></p>
    {(loading)? <div className="loadclass">
    <img src={load} alt="" className='loadimg'/>
    </div> : <p></p>}
    <div>
        {
            data.map((e,index)=>{
                return <>
                <div  className='makepostbox'>
                    
                <img src={e.image} alt="" className='postimage'/>
                <div className='yourpostdiv'>
                <div>
                <p className='maketextcenter'>No. of ratings : <strong>{e.comments[1].count}</strong></p>
                <p id={`rating${e.uniqueid}`} className='maketextcenter'>OverAll Ratings: <strong>{(rat[index])? Math.floor(rat[index]) : 0}</strong></p>
                </div>
                <div className="sharediv paddingleft" onClick={()=>{handleshare(e.uniqueid)}}>
                    <img src={share2} alt="" className='shareimg' />
                    <span  className='sharetext'>Share</span>
                </div>
                </div>
                </div>
                <Link to="/" className='makecenter2 linkofgoto margintop'>Back To Home</Link>
                </>
            })
        }
    </div>
    </div>
    </>
  )
}
