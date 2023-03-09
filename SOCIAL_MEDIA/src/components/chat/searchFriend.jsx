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
import styled from "@emotion/styled";
const Rightbar = () => {
  const Search = styled("div")({
    backgroundColor: "#fff",
    // marginLeft: "auto",
    borderRadius: "0.5rem",
    width: "100%",
    marginLeft : "1rem",
    marginTop : "1rem",

   border : "1px solid #000"
  });
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
               
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
     
    </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
