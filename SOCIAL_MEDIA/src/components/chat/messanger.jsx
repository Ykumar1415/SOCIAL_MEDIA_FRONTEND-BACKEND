import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import SearchFriend from "./searchFriend";
import Chat from "./chat";
import { useEffect } from "react";
import Rescent from "./recentchat";
import axios from "axios";
function messanger() {
  

  return (
    <Typography variant="div" color="initial" sx={{ display: "flex" , height : "100%", width :"100%"}}>
      <SearchFriend />
      <Chat />
      <Rescent></Rescent>
    </Typography>
  );
}

export default messanger;
