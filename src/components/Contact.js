import React from 'react'

export default function Contact() {
  return (
    <>
    <div className="contactdiv">
        <div className="ci">
            <h2>Name:</h2>
            <p className='someleft'>Alpha One</p>
        </div>
        <div className="ci">
            <h2>Phone:</h2>
            <p className='someleft'>123456789</p>

        </div>
        <div className="ci">
            <h2>Email:</h2>
            <p className='someleft'>alphaooen@gmail.com</p>

        </div>
    </div>
    <h1 className='center'>Msg us ...</h1>
    <input type="text"  placeholder='Name' className='makecenter'/>
    <input type="email" placeholder='Email' className='makecenter'/>
    <input type="number" placeholder='Phone'className='makecenter' />
    <textarea rows="10" className='textarea makecenter' placeholder='Enter message.....'></textarea>
    <button className='makecenter fs-30' >Send</button>
    </>
  )
}
