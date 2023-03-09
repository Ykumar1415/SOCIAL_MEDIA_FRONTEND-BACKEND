import React from "react";

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
import Message from "./message";
function chat() {
  return (
    <>
      <Box   sx={{ flex: "2", height: "90vh", width: "auto" , }}>
        <Box sx={{ height: "60%", width: "100%", backgroundColor: "white", boxShadow : "1" , overflowY: "scroll"}}>
          <Message send= {"0"} message = {"hello"} time = {"1 Hour"}/>
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
            onChange={() => {}}
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
          >
            Send
          </Button>
        </Typography>
      </Box>
    </>
  );
}

export default chat;
