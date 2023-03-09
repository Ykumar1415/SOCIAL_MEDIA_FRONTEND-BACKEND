import React from 'react'
import Typography from '@mui/material/Typography'

function message(props) {
 
  return (
// div if send is 1 then it is sent by the user else it is received background color is changed accordingly
    <div style={{display:"flex",flexDirection:"column",alignItems:props.send==="1"?"flex-end":"flex-start",margin:"1rem"}}>
      <Typography variant="body1" style={{backgroundColor:props.send==="1"?"#dcf8c6":"#e6dcf5",paddingLeft:"1rem", paddingRight:"1rem", paddingTop : "6px", paddingBottom  : "6px",borderRadius:"1rem"}}>
        {props.message}
      </Typography>
      <Typography variant="caption" style={{color:"gray",marginTop:"0.5rem"}}>
        {props.time}
      </Typography>
    </div>
  )
}

export default message
