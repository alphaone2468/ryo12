import React, { useEffect, useState } from 'react'
import Ratings from './Ratings'
import photo from './images/ProfileLogo.jpg'
import { useNavigate,Link } from 'react-router-dom'
import load from './images/loading.gif'
import arrow from './images/arrow1.png'
import share2 from './images/share2.png'
import lines from './images/test.jpg'



export default function Home() {
  const nav=useNavigate()
  const [data,setdata]=useState([])
  const [rat,setrat]=useState([])
  const [comm,setcomm]=useState();
  const [loading,setloading]=useState(false);
  const [commentloading,setcommentloading]=useState(false);
  const [open,setopen]=useState(false);
  useEffect(()=>{
    const a=localStorage.getItem("ryo")
    document.getElementById("one").innerHTML=a
    if(!a){
      nav("/login");
    }
    else{
    getdata()
    
      
    }
  },[nav])
  var rate=[];
    async function getdata() {
      const b=localStorage.getItem("ryoe")
      const objn={
        email:b
      }
      setloading(true);
      console.log(loading)
      const f=await fetch("https://ryobackend.onrender.com/getpost",{
        method:'POST',
        body:JSON.stringify(objn),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const res=await f.json()
      console.log(res)
      try{
        console.log(res[0].comments)

      }
      catch{
        console.log("error");
      }
      res.map((e)=>{
        var arr=e.comments[0].ratings;
        console.log(e.comments[0].ratings);
        var sum=0;
        for (let index = 0; index < arr.length; index++) {
          sum=sum+arr[index]
          
        }
        var avg=sum/arr.length;
        avg=parseFloat(avg.toFixed(2));

        console.log(avg);
        rate.push(avg);
      })
      setloading(false);
      console.log(res)
      console.log(rate)
      setrat(rate)
      setdata(res)
      console.log("hi caling")
      if(document.body.style.backgroundColor==="rgb(49, 59, 75)"){
        setTimeout(()=>{
          handledark();
        },2000)
      }
      else{
        console.log("not")
        console.log(document.body.style.backgroundColor)
      }
    }

  function handlenewratings(val){
    // console.log(" i sm calling" , val)
    var r=localStorage.getItem("deleteme");
    // console.log(" i  am from home and value is ",r);
    var c=document.getElementById(`count${val}`).innerHTML
    // console.log("i am c of val",c)
    var mul=document.getElementById(`rating${val}`).innerHTML
    // console.log(mul)
    var finalvalue=eval(mul*c)
    // console.log(finalvalue)
    var af=finalvalue+parseInt(r);
    var seriousfinal=af/(parseInt(c)+1)
    // console.log(seriousfinal)
    document.getElementById(`rating${val}`).innerHTML=seriousfinal
    document.getElementById(`count${val}`).innerHTML=parseInt(c)+1
    document.getElementById(`urated${val}`).style.display='block';
    document.getElementById(`urated${val}`).innerHTML=`You Rated : ${r}`;
    setTimeout(()=>{

      document.getElementById(`hideMeAfterRated${val}`).style.display='none';
    },800)
  }
  function handlenext(){
    // console.log("i am next")
    nav("/back")
  }
  async function handlecomm(ids){
    // console.log(comm)
    var n=localStorage.getItem('ryo')
    const obj={
      comment:comm,
      name:n,
      id:ids
    }
    setcommentloading(true);
    // console.log(obj)
    const f = await fetch("https://ryobackend.onrender.com/comment",{
      method:'PUT',
      body:JSON.stringify(obj),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res= await f.json();
    // console.log(res)
    setcommentloading(false);
    if(res.success == "comment posted"){
      document.getElementById(`upperdiv${ids}`).style.display='block';
      setTimeout(() => {
        document.getElementById(`upperdiv${ids}`).style.display='none';
        
      }, 1000);
    }
  }
  function handleMoreComments(val){
    // console.log(val)
    localStorage.setItem("ryocomm",val)
    nav("/morecomments")
  }
  async function handleshare(id){
    console.log("share ", id);
    await navigator.share({
      title:"Hey! How Much Would You Rate This Outfit On A Scale Of 10 ",
      text:`Hey! How Much Would You Rate This Outfit On A Scale Of 10\nTo See The Outfit\nClick On The Link Given Below.\nYou Will See A *Menu* In That Click On *SearchPost*\nThen Search This *Id*.\n*Id* = ${id}\n`,
      url:`https://rateyouroutfit101.onrender.com`
    });
  }

  async function handlereset(){
    const e=localStorage.getItem("ryoe")
    const obj={
      email:e
    }
    const f=await fetch("https://ryobackend.onrender.com/reset",{
      method:"post",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"application/json"
      }
    })
    await f.json();
    // console.log(res);
  }
  function handleopenclose(){
    console.log("calling")
    if(open){
      document.getElementById("hideprofile").style.display="block";
      setopen(false)
    }
    else{
      setopen(true);
      document.getElementById("hideprofile").style.display="none";
      if(document.body.style.backgroundColor==="rgb(49, 59, 75)"){
        setTimeout(()=>{
          handledark();
        },10)
      }
   

    }
  }
  function handleprofileclick(name) {
    localStorage.setItem("SeeAUserPost",name)
    nav("/userposts")

    
  }
  function handleopenprofile(){
    localStorage.setItem("SeeAUserPost",document.getElementById("one").innerHTML)
    nav("/userposts")
  }
  function handledark(){
    console.log("calling dark")
    document.body.style.backgroundColor="rgb(49, 59, 75)";
    document.body.style.color="white";
    try{
      var len = document.getElementsByClassName("postimg").length
      for(var i=0;i<len;i++){
        document.getElementsByClassName("postimg")[i].style.mixBlendMode="multiply"
      }
      document.getElementById("profileimg").style.mixBlendMode="color-burn"
       
    }
  catch{
    
  }
  try{
    for(var j=0;j<7;j++){
      document.querySelectorAll("a")[j].style.color="white"
    }
  }
  catch{

  }
  document.getElementsByClassName("addborder1")[0].style.border="2px solid white";

  }
  // darkslategrey
  return (
    <>
    <div className="tophomecon">

    <div className="postcon">
    <div className=''>
    <div style={{display:"flex",flexDirection:'row-reverse'}} onClick={handleopenclose} className='addborder1'>
    <img src={lines} alt="error" className='postimg makefixed'/>
    </div>

    <p className='maketopsome'>RateYourOutfit</p>
    <div className="floatr" id='hideprofile'>
    <span id="one"></span>
    <img src={photo} alt="" id="profileimg" className="makeMePointer" onClick={handleopenprofile}/>
    </div>
    </div>

    {(open) ? 
    <div className="navv" id="hidenavv">
      <Link to="/postimage" className='linkofnav'><p>Post A Image</p></Link>
      <Link to="/searchuser" className='linkofnav'> <p>Search</p></Link>
      <Link to="/yourpost" className='linkofnav'> <p>Your Profile</p></Link>
      <Link to="/contactme" className='linkofnav'> <p>Contact Us</p></Link>
      <Link to="/searchpost" className='linkofnav'> <p>Search Post</p></Link>
      <Link to="/following" className='linkofnav'> <p>Following</p></Link>
      <Link to="/login" className='linkofnav'> <p>logout</p></Link>
      <p onClick={handledark}>DarkMode</p>
    </div> : <p id='less'></p>
}
    <div className='makespacetop'></div>
    <div className="up">
    <div className='borderred'>

    {(loading)? 
    <img src={load} alt="" className='loadimg'/>
    : <p></p>}
    <div>
    </div>
    </div>

    {
      data.map((e,index)=>{
        return<>
        <img src={photo} alt="" className='postimg' />
        <span className='makesomechages' onClick={()=>handleprofileclick(e.owner)}>{e.owner}</span>
        <img src={e.image} alt="" className='postimage'/>
        <div className="three">
          <div>
            <p id={`rating${e.uniqueid}`} className='ratee makebold2AndCenter'>
            {
              (e.uniqueid%10==0)? (rat[9])? rat[9] : 0 
              :(rat[(e.uniqueid)%10-1])? rat[(e.uniqueid)%10-1] : 0
            }
            </p>
            <p className='makecenter2'>Over All Ratings</p>
          </div>
          <div>
            <p id={`count${e.uniqueid}`} className='makebold2AndCenter'>{e.comments[1].count}</p>
            <p className='makecenter2'>No. Of Ratings</p>
          </div>
          <div>
          <p className='makebold2AndCenter'>{e.uniqueid}</p>
          <p className='makecenter2'>Id </p>

          </div>

        </div>
        <div className="sharediv" onClick={()=>{handleshare(e.uniqueid)}}>
        <img src={share2} alt="" className='shareimg makecurserpointer' />
        <span  className='sharetext makecurserpointer'>Share</span>

        </div>
        <p id={`urated${e.uniqueid}`} style={{display:"none"}}> u rated :</p>
        <div onClick={()=>handlenewratings(e.uniqueid)} id={`hideMeAfterRated${e.uniqueid}`}>
        <Ratings name={e.uniqueid}/>
        </div>

        <div className="group">
        <label>Comment : </label>
        <div id={`upperdiv${e.uniqueid}`} className='makenone'>
        <div className='commentdiv' id="commentsuccessdiv">
        {/* <img src={photo} alt="" className='commimg' /> */}
        <p style={{color:"#161817",fontWeight:"600"}}>Comment Successfully Posted</p>
        </div>
        </div>
        <input required="" type="text" className="input" onChange={(e)=>setcomm(e.target.value)} placeholder='Enter Your Opinion'/>
        <span className="highlight"></span>
        <span className="bar"></span>
        </div>
        {(commentloading)? <span>posting...</span> : 
        <img onClick={()=>handlecomm(e.uniqueid)} src={arrow} alt="" className='commentimg' />}
      
        <p onClick={()=>handleMoreComments(e.uniqueid)} className='makecurserpointer'>More Comments</p>
        <hr/>
        </>
      })
    }
    </div>
    </div>
    {(loading) ? <p></p> : 
    <div className="homebuttondiv">
    <p onClick={handlenext} id="makeround " className='make30'>&#x2192; </p>

    </div> }
    <p onClick={handlereset}>reset</p>
    </div>
    </>
  )
}
