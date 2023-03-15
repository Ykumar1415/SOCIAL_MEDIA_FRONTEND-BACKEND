import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
import { flexbox } from "@mui/system";
  import React from "react";
  import Sidebarcard from "./sidebarcard"
  import { useNavigate } from "react-router-dom";
  const Sidebar = ({mode,setMode}) => {
    return (
      <Box  display  = "fixed" flexGrow={1} flexShrink = {4} p={2} sx={{ display: { xs: "none", sm: "block" }, boxShadow: "1", height : '100vh' }}>
        <Box position="fixed">
        <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Pages" />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Groups" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Support" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItemButton>
            </ListItem>
           
            <ListItem disablePadding>
              <ListItemButton component="a" href={`/profile/${localStorage.getItem('userID')}`}>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" >
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>
          </List>

       </Box>
         
          
    
      </Box>
    
    );
  };
  
  export default Sidebar;