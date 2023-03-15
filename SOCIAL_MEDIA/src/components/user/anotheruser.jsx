import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserPosts from "./UserPosts";
import {useParams}  from "react-router-dom"
import UserTopbar from "./userTopbar";
function anotheruser() {
  const { userid } = useParams();
  console.log("another user "+ userid)
  
  return (
    <>
          <Box flex={ 2} sx={{ display :"flex", flexDirection : "column" , gap : "3rem"}}>
        <UserTopbar userId = {userid}/>
        <UserPosts userId = {userid}/>
      </Box>
    </>
  );
}

export default anotheruser;
