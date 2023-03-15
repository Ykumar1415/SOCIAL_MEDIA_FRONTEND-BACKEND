import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styled from "@emotion/styled";
import {io} from "socket.io-client";
const Rightbar = ({messages, setmessages,setconvid}) => {
  const Search = styled("div")({
    backgroundColor: "#fff",
    // marginLeft: "auto",
    borderRadius: "0.5rem",
    width: "100%",
    marginLeft : "1rem",
    marginTop : "1rem",

   border : "1px solid #000"
  });

  

const [clicked , setclicked] = useState("")
  const [friends , setfriends] = useState([]);
   
  useEffect(() => {
    const  x = async ()=>{
     const res = await  axios.get(`http://localhost:3000/api/users/friends/${localStorage.getItem("userID")}`); 
      setfriends(res.data)
      console.log(res.data[0])
    }
   x(); 
   
  }, [])

  const newconversation = async (id)=>{
  
const res = await axios.post(`http://localhost:3000/api/conversations/searchandcreate`, {senderId : localStorage.getItem("userID"), receiverId : id})
console.log(res.data + "new conversation")
const res2 = await axios.get(`http://localhost:3000/api/messages/${res.data._id}`);
console.log(res2.data)
const x  = res2.data.map((item)=>{return {text : item.text, cid : item.conversationId, sender : item.sender, time : item.createdAt}})
setmessages(x)
setconvid(res.data._id)

setclicked(id)


  }
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex"},  marginLeft : "auto", boxShadow: "1"}}>
    
      <Box position="fixed" sxwidth={300} sx = {{marginLeft : "auto"}}>
        <Typography variant="h6" fontWeight={100}sx  = {{marginLeft : "1rem"}}>
         Search Friends
        </Typography>
        <Search sx={{ display: { xs: "none", sm: "block" } ,width : "100%"}}>
            <InputBase
              placeholder="search..."
              sx={{ paddingLeft: "10px", display: { xs: "none", sm: "block" }, }}
            />
          </Search>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {friends.map((item) => (
      <ListItem alignItems="flex-start" key  = {item.id} sx = {{cursor : "pointer", borderRadius : "1rem",backgroundColor: (item.id ==clicked) ? "lightgray ": "white"}} onClick = {()=>{newconversation(item.id);}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={item.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
               
            </React.Fragment>
          }
        />
      </ListItem>))}
      <Divider variant="inset" component="li" />
        
     
    </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
