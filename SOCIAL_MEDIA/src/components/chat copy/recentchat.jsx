import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import axios from "axios";
const Rightbar = ({setmessages, messages, setconvid}) => {
  const [recent, setrecent] = useState([]);
  
  useEffect(() => {
    const  x = async ()=>{
     const res = await  axios.get(`http://localhost:3000/api/conversations/Allconversation/${localStorage.getItem("userID")}`); 
      setrecent(res.data)
      console.log(res.data[0])
    }
   x(); 
 
  }, [])

  const allmsg = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/messages/${id}`);
    console.log(res.data)
    const x  = res.data.map((item)=>{return {text : item.text, cid : item.conversationId, sender : item.sender, time : item.createdAt}})
    console.log(x)
    if(x.length > 0){
    let newmsgs = [ ...x];
    setmessages(newmsgs);
    console.log(messages)
    setconvid(id)
  
  }
    

  }
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex"}, cursor : "pointer", marginLeft : "auto", boxShadow: "1"}}>
      <Box position="fixed" sxwidth={300} sx = {{marginLeft : "auto"}}>
        <Typography variant="h6" fontWeight={100}>
         Chats
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {recent.map((item) => (
      <ListItem alignItems="flex-start" key  = {item.conversationId} onClick = {()=>{allmsg(item.conversationId); }}>
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
               <h6 style = {{color : "limegreen"}}>online</h6>
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
