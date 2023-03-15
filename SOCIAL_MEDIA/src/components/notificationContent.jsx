import React from "react";
import { Box, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
function notificationContent() {
  return (
    <Box sx={{ display: "flex", position: "absolute", zIndex: "200", marginTop: "0", width: "100%", justifyContent: "center",}}>
      <Typography
              sx={{
            display : "flex" ,
          color: "black",
          fontSize: "1.5rem",
          fontWeight: "bold",
          height: "12rem", bgcolor: "#FDEBED", width: "60%"
          

        }}
      >
        <Box sx={{ display : "flex", flexDirection : "column", gap : "1rem", width: "100%"}}>
        <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", width: "100%",  fontWeight :"bold"}}>You have a new message!</Typography>
          <Typography variant="p" color="primary" sx={{ display: "flex", justifyContent: "center", width: "100%", fontWeight: "bold" }}>First Notification</Typography>
      </Box></Typography>
    </Box>
  );
}

export default notificationContent;
