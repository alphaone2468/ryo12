import React, { useEffect, useState } from 'react'
import photo from './images/ProfileLogo.jpg'
import loadim from './images/loading.gif'


function Seecomments(){
    const [load,setload]=useState(false);
    useEffect(()=>{
        callme()
        
    },[])
    const [data,setdata]=useState([]);
    const [com,setcom]=useState([])
    async function callme(){
        const user = localStorage.getItem('ryocomm');
        console.log(user);
        const obj={
            user:user
        }
        setload(true);
    const f=await fetch("https://ryobackend.onrender.com/getcomments",{
        method:'post',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const res=await f.json();
    console.log(res.message[0])
    setdata(res.message[0])
    const commm = res.message[0].comments
    const realcomments=commm.filter((e,index)=>{
        return index>1
    })
    setcom(realcomments);
    setload(false);
    
}
    return(
        <>
        {(load)? <div className="loadclass">
        <img src={loadim} alt="" className='loadimg'/>
        </div> : <p></p>}
        <div className="postcon">
            <div className='upperdivofcomment'>
        {(load)? <p></p> : <img src={photo} alt="" className='profileimgofcomment'/>}
        <p>{data.owner}</p>

            </div>
        <img src={data.image} alt="" className='postimage'/>
        {(load)? <p></p> : <p>Comments</p>}
        {

        com.map((e)=>{
            return <>
            <div className='addborder'>
                <img src={photo} alt="" className='commimg'/>
                <div className='makegrid'>
                <span className='' style={{fontWeight:"600"}}>{(e.name[0]).toUpperCase() + e.name.slice(1,)}</span>
                <span>{e.comment}</span>

                </div>
            </div>
            </>
        })
        }
        </div>
        </>
    )
}

export default Seecomments