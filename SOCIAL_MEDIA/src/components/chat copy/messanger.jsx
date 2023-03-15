import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import SearchFriend from "./searchFriend";
import Chat from "./chat";
import { useEffect } from "react";
import Rescent from "./recentchat";
import axios from "axios";
function messanger() {
  const [messages, setmessages] = useState([]);
  const [convid , setconvid] = useState("");
  return (
    <Typography variant="div" color="initial" sx={{ display: "flex" , height : "100%", width :"100%"}}>
      <SearchFriend messages={messages} setmessages = {setmessages} setconvid = {setconvid} />
    <Chat messages={messages} setmessages = {setmessages} setconvid = {setconvid} convid = {convid}/>
      <Rescent messages={messages} setmessages = {setmessages} setconvid = {setconvid}></Rescent>
    </Typography>
  );
}

export default messanger;
