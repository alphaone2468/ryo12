import React from "react"
import { Link } from "react-router-dom"

function Navbar(){
    return(
        <>
        <div className="nav">
            <h3 className="heading">RateMyOutfit</h3>
            <div className="makeright">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contactme">contact</Link>
            <Link to="/login">login</Link>
            <Link to="/registration">registration</Link>

            </div>

        </div>
        </>
    )
}

export default Navbar