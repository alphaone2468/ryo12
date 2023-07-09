import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Reg(){
    const nav=useNavigate()
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [loading,setloading]=useState(false);
    async function callme(){
        document.getElementById("one").style.display="none"
        document.getElementById("two").style.display="none"
        document.getElementById("three").style.display="none"
        document.getElementById("four").style.display="none"
        document.getElementById("five").style.display="none"
        //console.log(name)
        //console.log(email)
        //console.log(password)
        if(name.length<1){
            document.getElementById("one").style.display="block"
            return false
        }
        if(email.length<1){
            document.getElementById("two").style.display="block"
            return false
        }
        if(password.length<1){
            document.getElementById("three").style.display="block"
            return false
        }
        const obj={
            username:name,
            email:email,
            password:password,
            seenupto:1
        }
        setloading(true);
        //console.log(obj)
        let f=await fetch("https://ryobackend.onrender.com/reg",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data = await f.json()
        //console.log(data)
        var set=0;
        if(data.error=="email exist"){
            document.getElementById("four").style.display="block"
            set = set + 1;
        }
        if(data.error=="username exist"){
            document.getElementById("five").style.display="block"
            set=set+1;
        }
        if(set==0){
            localStorage.setItem("ryo",name)
            nav("/login")

        }

    }
    return(
        <>
        <div className="divhome">
            <div className="addshadow">
                <div className="makeloginbuttoncenter">

            <h1 className="maketop">Sign-up </h1>
                </div>
                <div className="group">
                <label>Name</label>
                <input required="" type="text" className="input" onChange={(e)=>setname(e.target.value)}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <p className="makemered" id="one">Field is Missing</p>
                <p className="makemered" id="five">Usrname Already Exist</p>
                </div>
                <div className="group">
                <label>Email</label>
                <input required="" type="text" className="input" onChange={(e)=>setemail(e.target.value)}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <p className="makemered" id="two">Field is Missing</p>
                <p className="makemered" id="four">Email Already Exist</p>
                </div>
                <div className="group">
                <label>Password</label>
                <input required="" type="password" className="input" onChange={(e)=>setpassword(e.target.value)}/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <p className="makemered" id="three">Field is Missing</p>
                </div>
                {(loading)? <p>loading......</p> : <p></p>}
                <div className="makeloginbuttoncenter">
                <button onClick={callme} className="regbut">SignUp </button>

                </div>
                <div className="makeloginbuttoncenter">
                <Link to="/login">
                <p style={{color:"blue ",cursor:"pointer",fontWeight:500,position:"relative",top:"30px"}} className=''>Have An Account ?</p>
                </Link>

                </div>
                    

                </div>


        </div>
        
        </>
    )
}

export default Reg