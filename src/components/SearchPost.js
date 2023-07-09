import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logo from './images/ProfileLogo.jpg'
import Ratings from './Ratings';

function SearchPost(){
    const para=useParams();
    const [data,setdata] = useState([])
    const [rate,setrate] =useState(0);
    const [loading,setloading]=useState(false);
    const [postid,setpostid]=useState(0);
    useEffect(()=>{
    },[])
    async function callme(){
        
        setloading(true);
        //console.log(para);
        const f = await fetch(`https://ryobackend.onrender.com/goto/${postid}`)
        const res= await f.json();
        //console.log(res);
        let sum = 0;
        let ratearr = res[0].comments[0].ratings
        ratearr.forEach((e)=>{
            sum = sum + e;
        })
        let avg = sum/ratearr.length
        //console.log(avg)
        setrate(avg);
        setdata(res);
        setloading(false)
    }
    function handleratings(){
        //console.log("calling");
        let newratearr=data[0].comments[0].ratings
        newratearr.push(parseInt(localStorage.getItem("deleteme")))
        //console.log(newratearr)
        let sum1=0;
        newratearr.forEach((e)=>{
            sum1= sum1 + e;
        })
        let newavg=sum1/newratearr.length
        setrate(newavg);
        var oldcount = document.getElementById("updaterate").innerHTML;
        //console.log(typeof(oldcount))
        var newcount = parseInt(oldcount) + 1;
        document.getElementById("updaterate").innerHTML=newcount
    }
    function getpostid(e) {
        //console.log("calling")
        //console.log(e.target.value);
        setpostid(e.target.value)
    }
    return(
        <>
        <div className="postcon">
        <h1 className='makecenter2'>Rate My Outfit</h1>
        <div className='makeflexandcenter'>
        <div className="group">
        <label>Search</label>
        <input required="" type="number" className="input" onChange={getpostid} placeholder='Enter Id...'/>
        <span className="highlight"></span>
        <span className="bar"></span>
        </div>
        </div>
        <div className="makeloginbuttoncenter">

            <button onClick={callme} className='makebold'>Search </button>
        </div>
        {(loading) ? <p style={{fontWeight:'500'}} className='makecenter2'>loading .....  Please Wait </p> : <p></p>}
        {
            data.map((e)=>{
                return <div  className='makepostbox'>  
                    <img src={logo} alt="" className='postimg' />
                    <span className='makesomechages'>{e.owner}</span>    
                    <img src={e.image} alt="" className='postimage'/>
                    <p className='makecenter2' >No. of Ratings : <strong id='updaterate'>{e.comments[1].count}</strong></p>  
                    {(rate)?     
                    <p className='makecenter2'>OverAll Ratings : <strong>{rate}</strong></p> : <p className='makecenter2'>OverAll Ratings : <strong>0</strong></p>}    
                    <div onClick={handleratings} id="hideme">
                    <Ratings name={parseInt(e.uniqueid)}/>   
                    </div>
                        
                    </div>
            })
        }
       

        </div>
        </>

    )
}
export default SearchPost