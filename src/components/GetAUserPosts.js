import React, { useState } from 'react'
import { useEffect } from 'react';
import photo from './images/ProfileLogo.jpg'
function GetAUserPosts(){
    const [data,setdata]=useState([]);
    const [totalpost,settotalpost]=useState(0);
    const [ratearray,setratearray]=useState([]);
    const [loading,setloading]=useState(false);
    const [followers,setfollowers]=useState(0);
    useEffect(()=>{
        callme();
    },[])

    async function callme(){
        const user1=localStorage.getItem("ryo");
        console.log(user1)
        const obj1={
            user:user1
        }
        const f1 = await fetch("https://ryobackend.onrender.com/getfoll",{
            method:"post",
            body:JSON.stringify(obj1),
            headers:{
                'Content-Type':"application/json"
            }
        })
        console.log("calling get followers");
        const followingdata = await f1.json();
        console.log(followingdata);
        console.log(followingdata[0].following)

        //getting the following array code ends here

        
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
        setdata(res[0]);
        settotalpost(res[0].length);
        setfollowers(res[1]);
        let ratearr=[]
        res[0].forEach((e)=>{
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
        


        // code to check whether show follow (or) following

        console.log(user,user1,followingdata)
        let ifFollow=followingdata[0].following.includes(user);
        console.log(ifFollow)
        if(ifFollow){
            document.getElementById("followbutton").innerHTML="Following";
            document.getElementsByClassName("vh")[0].style.visibility="visible"
        }
        else{
            document.getElementById("followbutton").innerHTML="Follow";
            document.getElementsByClassName("vh")[0].style.visibility="visible"

        }

        //code to get followers 
        setloading(false);
    }
    async function addfollowfunc(){
        let check=document.getElementById("followbutton").innerHTML
        if(check=="Following"){
            return false;
        }
        console.log("calling")
        document.getElementById("followers").innerHTML=parseInt(document.getElementById("followers").innerHTML) + 1;
        document.getElementById("followbutton").innerHTML="Following"
        const obj={
            user:localStorage.getItem("ryo"),
            followed:localStorage.getItem("SeeAUserPost")
        }
        const f= await fetch("https://ryobackend.onrender.com/addfollow",{
            method:"post",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res=await f.json();
        console.log(res);
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
        <div>
        <span className='numberOfTotalPost' id='followers'>{followers}</span>
        <span className='logosidespan moveleftsome'>Followers</span>
        </div>
        </div>
        <div className='searchcon vh'>
        <span className='followbut' onClick={addfollowfunc} id='followbutton'>Follow</span>

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
                    <p id={`rating${e.uniqueid}`} className='maketextcenter'>OverAll Ratings {(ratearray[index])? ratearray[index]:0}</p>
                    </div>
                </>
            })
        }
        </div>
            
        </>
    )
}

export default GetAUserPosts;
