import React, { useEffect, useState } from 'react'
import load from "./images/loading.gif"
import { useNavigate,Link } from 'react-router-dom';
import share2 from './images/share2.png'
import photo from './images/ProfileLogo.jpg'

export default function Yourpost() {
    const [data,setdata] = useState([])
    const [rat,setrat]=useState([])
    const [totalpost,settotalpost] = useState();
    const [loading,setloading]=useState(false);
    const [followerss,setfollowerss]=useState(0);
    const nav=useNavigate();
    useEffect(()=>{
    callme();

    var rate = [];
    async function callme(){
        setloading(true);
        const a=localStorage.getItem('ryo');
        const obj1={
            user:a        
        }
        const f1=await fetch("https://ryobackend.onrender.com/getfoll",{
            method:"post",
            body:JSON.stringify(obj1),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const res1=await f1.json()
        console.log(res1);
        setfollowerss(res1[0].followers)
        if(!a){
            nav("/login");
        }
        const n = localStorage.getItem("ryo");
        const obj = {
            name:n
        }
       
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
        title:"Hey! How Much Would You Rate This Outfit On A Scale Of 10 ",
        text:`Hey! Want To See My New Outfit ???\nYou Can Rate My Outfit On A Scale Of 10\nTo See The Outfit\nClick On The Link Given Below.\nAfter Successfull Login You Will See A *Menu* In That Click On *SearchPost*\nThen Search This *Id*.\n*Id* = ${id}`,
        url:`https://rateyouroutfit101.onrender.com`
      });
  }
  return (
    <>
    <div className="postcon">
    <div className='divofuserposts'>
    <div>
        <img src={photo} alt="" className='logoofuser'/>
        <p className='nameBelowProfile'>{localStorage.getItem("ryo")}</p>
    </div>
    <div>
        <span className='numberOfTotalPost'>{totalpost}</span>
        <span className='logosidespan'>Posts</span>
    </div>
    <div>
        <span className='numberOfTotalPost' id='followers'>{followerss}</span>
        <span className='logosidespan moveleftsome'>Followers</span>
        </div>
    </div>
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
                </>
            })
        }
        <Link to="/" className='makecenter2 linkofgoto margintop'>Back To Home</Link>
    </div>
    </div>
    </>
  )
}
