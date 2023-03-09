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

const Rightbar = () => {
  const [recent, setrecent] = useState([]);
  console.log("outside")
  useEffect(() => {
    const  x = async ()=>{
     const res = await  axios.get(`http://localhost:3000/api/conversations/${localStorage.getItem("userID")}`); 
      setrecent(res.data)
      console.log(res.data)
    }
   x(); 
   console.log("inside")
  }, [])
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex"},  marginLeft : "auto", boxShadow: "1"}}>
      <Box position="fixed" sxwidth={300} sx = {{marginLeft : "auto"}}>
        <Typography variant="h6" fontWeight={100}>
         Chats
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {recent.map((item) => (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="../../icons8-globe-with-meridians-32.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Yogesh"
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
