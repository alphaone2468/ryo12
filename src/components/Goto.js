import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logo from './images/ProfileLogo.jpg'
import Ratings from './Ratings';
import {Link} from 'react-router-dom'

function Goto(){
    const para=useParams();
    const [data,setdata] = useState([])
    const [rate,setrate] =useState(0);
    const [loading,setloading]=useState(false);
    useEffect(()=>{
        callme();
    },[])
    async function callme(){
        setloading(true);
        console.log(para);
        const f = await fetch(`https://ryobackend.onrender.com/goto/${para.uniqueid}`)
        const res= await f.json();
        console.log(res);
        let sum = 0;
        let ratearr = res[0].comments[0].ratings
        ratearr.forEach((e)=>{
            sum = sum + e;
        })
        let avg = sum/ratearr.length
        console.log(avg)
        setrate(avg);
        setdata(res);
        setloading(false)
    }
    function handleratings(){
        console.log("calling");
        let newratearr=data[0].comments[0].ratings
        newratearr.push(parseInt(localStorage.getItem("deleteme")))
        console.log(newratearr)
        let sum1=0;
        newratearr.forEach((e)=>{
            sum1= sum1 + e;
        })
        let newavg=sum1/newratearr.length
        setrate(newavg);
    }
    return(
        <>
        <div className="postcon">
        <h1 className='makecenter2'>Rate My Outfit</h1>
        {(loading) ? <p style={{fontWeight:'500'}} className='makecenter2'>loading .....  Please Wait </p> : <p></p>}
        {
            data.map((e)=>{
                return <div  className='makepostbox'>  
                    <img src={logo} alt="" className='postimg' />
                    <span className='makesomechages'>{e.owner}</span>    
                    <img src={e.image} alt="" className='postimage'/>
                    <p className='makecenter2'>No. of Ratings : <strong>{e.comments[1].count}</strong></p>  
                    {(rate)?     
                    <p className='makecenter2'>OverAll Ratings : <strong>{rate}</strong></p> : <p className='makecenter2'>OverAll Ratings : <strong>0</strong></p>}    
                    <div onClick={handleratings}>
                    <Ratings name={parseInt(para.uniqueid)}/>   
                    </div>
                        
                    </div>
            })
        }
        <p className='makecenter2'>Would Like To Post Your Image ??  If Yes </p>
        <Link to="/login" className='linkofgoto'>Click Here To login</Link>

        </div>
        </>

    )
}
export default Goto