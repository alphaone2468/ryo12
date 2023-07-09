import React, { useEffect, useState } from 'react'
import logo from './images/ProfileLogo.jpg'
import { useNavigate,Link } from 'react-router-dom';

function SearchUser(){
    const [value,setvalue]=useState('');
    const [data,setdata]=useState([]);
    const [loading,setloading] = useState(false);
    const nav=useNavigate();
    useEffect(()=>{
        console.log(value);
        callme();
    },[value])
    async function callme() {
        setloading(true);
        const obj = {
            value:value
        }
        let f=await fetch('https://ryobackend.onrender.com/searchusers',{
            method:"post",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        let res=await f.json();
        console.log(res);
        setdata(res);
        setloading(false);
    }
    function getpersons(e){
        setvalue(e.target.value);
    }
    async function seeyourspost(val){
        console.log("seeing ",val);
        localStorage.setItem("SeeAUserPost",val);
        nav("/userposts");

    }
    return (
        <>
        <div className='searchcon'>
        <div>
        <h1 style={{"textAlign":"center"}}>Find Users</h1>
        <div className="group">
        <label>Search</label>
        <input required="" type="text" className="input" onChange={getpersons} placeholder='Search User ...'/>
        <span className="highlight"></span>
        <span className="bar"></span>
        </div>
        {(loading) ? <p style={{fontWeight:'500'}} className='makecenter2'>loading ..... </p> : <p></p>}
        <div>
        {
            data.map((e)=>{
                return <>
                <div className='setprofilelogoandname'>
                <img src={logo} alt="" className='postimg'/>
                <p className='sometop' onClick={()=>seeyourspost(e.username)}>{e.username}</p>

                </div>
                </>
            })
        }
        </div>
        </div>
        </div>
        <Link to="/" className='makecenter2 linkofgoto margintop spacebottom'>Back To Home</Link>
        </>
    )
}
export default SearchUser;