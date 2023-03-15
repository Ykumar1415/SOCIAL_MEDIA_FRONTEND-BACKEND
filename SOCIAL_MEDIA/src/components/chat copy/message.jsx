import React from 'react'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useRef, useEffect } from 'react'
import { useState } from 'react'

function message(props) {
  // const [Socket, setSocket] = useState(null);

  // ************************ time format using intl **********************
  const time = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const scrollRef = useRef();
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [props.messages]);

/* send message to server using socket.io */

// const socket = useRef(io("ws://localhost:8900"));


// useEffect(()=>{
//   socket.current.emit("adduser",localStorage.getItem("userID"))
//   socket.current.on("getusers",users=>{
//     console.log(users)
//   }) 
// })




//******* */ taking message from server and printing it in console using socket.io
// useEffect(() => {
//   Socket?.on("client-to-server-message", (msg) => {
//     console.log(msg);
//   })}, [Socket]); 

// console.log(Socket ) all details of socket are printed in console


  return (
// div if send is 1 then it is sent by the user else it is received background color is changed accordingly
<div ref = {scrollRef}>
    <div style={{display:"flex",flexDirection:"column",alignItems:props.send==="1"?"flex-end":"flex-start",margin:"1rem"}}>
      <Typography variant="body1" style={{backgroundColor:props.send==="1"?"#dcf8c6":"#e6dcf5",paddingLeft:"1rem", paddingRight:"1rem", paddingTop : "6px", paddingBottom  : "6px",borderRadius:"1rem"}}>
        {props.message}
      </Typography>
      <Typography variant="caption" style={{color:"gray",marginTop:"0.5rem"}}>
        { moment(props.time).fromNow() }
      </Typography>
    </div></div>
  )
}

export default message
