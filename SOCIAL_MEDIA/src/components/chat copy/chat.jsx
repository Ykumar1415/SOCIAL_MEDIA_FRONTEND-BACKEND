import React from "react";
// import format from "timeago.js";

 
import { Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  TextField,
  InputBase,
  Button,
} from "@mui/material";
import { useState,useRef  } from "react";
import { useEffect } from "react";
import Message from "./message";
import axios from 'axios'
import {io} from "socket.io-client";
function chat({messages , setmessages,convid}) {
 const messageRef = useRef();

 
// *********************** set socket for socket.io **********************
// const [Socket, setSocket] = useState(null);
// useEffect(() => {
//   const newSocket = io("ws://localhost:8900");
//   setSocket(newSocket);
//   // return () => newSocket.close();
// }, []);
const Socket = useRef();
useEffect(() => {
  Socket.current = io("ws://localhost:8900");
  Socket.current.emit("addUser", localStorage.getItem("userID"));
  Socket.current.on("getUsers", (users) => {
    console.log(users);
  });
}, []);

const sendmsg = async ()=>{
  const msg = await messageRef.current.value;
  const res = await axios.post(`http://localhost:3000/api/messages/newMsg`,{
     "text": msg, 
    "sender": localStorage.getItem("userID"),
    "conversationId" : convid
  })
  await setmessages([...messages , {text : msg , cid : convid, sender : localStorage.getItem("userID"), time : res.data.createdAt}])
  messageRef.current.value = "";
  const res2 = await axios.get(`http://localhost:3000/api/conversations/getconversation/${convid}`)
 console.log(res2.data.members[1])
   Socket.current.emit('sendMessage',{senderId: localStorage.getItem('userID'), receiverId:(res2.data.members[1]!=localStorage.getItem('userID')) ? res2.data.members[1] : res2.data.members[0], text:msg})
   Socket.current.on("getMessage", (data) => {
    console.log(data)
    setmessages([...messages , {text : data.text , cid : convid, sender : localStorage.getItem('userID'), time : new Date(Date.now())}])
  });
}
useEffect(()=>{
  
},[])
  return (
    <>
      <Box sx={{ flex: "2", height: "90vh", width: "auto" }}>
        <Box
          sx={{
            height: "60%",
            width: "100%",
            backgroundColor: "white",
            boxShadow: "1",
            overflowY: "scroll",
          }}
        >
          {(messages.length==0) ?<h1>Nothin Here</h1> :(messages.map((item) => (
            <Message send={(item.sender==localStorage.getItem('userID')) ? "1" : "0"} message={item.text} time={(item.time)} key = {item.cid}  cid = {item.cid}/>
          )))}
        </Box>
        <Typography
          sx={{
            height: "30%",
            width: "100%",
            marginTop: "2rem",
            display: "flex",
            flex: "1",
            alignItems: "center",
          }}
        >
          <textarea
            id=""
            ref= {messageRef}
            style={{
              display: "flex",
              flex: "2",
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "12px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              height: "2.5rem",
              marginLeft: { xs: "12px", sm: "2rem" },
            }}
            onClick={sendmsg}
          >
            Send
          </Button>
        </Typography>
      </Box>
    </>
  );
}

export default chat;
