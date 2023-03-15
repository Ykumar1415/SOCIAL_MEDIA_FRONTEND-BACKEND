import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { InputBase, TextField, Tooltip } from "@mui/material";
import { padding } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import { uiActions } from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import Notifications from "./notifications";
import {useNavigate} from 'react-router-dom';

function Navbar({showNotifications, setShowNotifications}) {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.ui.ListVisible);
  const [menu, MenuShow] = useState(false);
  const url = `/profile/${localStorage.getItem("userID")} `; 
  return (
    <div>
      <AppBar position="fixed" color="primary" sx={{ boxShadow: "1" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5", sm: "2rem" },
              marginLeft: { xs: "10px", sm: "1rem" },
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              SocialMe
            </Link>
          </Typography>
          <Typography variant="h1" color="initial"></Typography>
          <Typography variant="div" color="white"></Typography>
          <Typography
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
              width: "25%",
              marginLeft: "auto",
            }}
          >
            <Link to="/" underline = "hover" sx={{ color: "white", textDecoration: "none" }}>
              
              <Tooltip title="Home">
                <HomeIcon sx={{ color: "white" }} />
              </Tooltip>{" "}
            </Link>

            <Tooltip title="notifications">
              <NotificationsIcon onClick={() => {
                setShowNotifications(!showNotifications)
              console.log(showNotifications)}} />
            </Tooltip>
            <Tooltip title="chat">
              <ChatIcon onClick  = {()=>{navigate('/messanger')}}/>
            </Tooltip>
          </Typography>
          <Typography
            variant="div"
            color="black"
            sx={{
              display: "flex",
              height: "2rem",
              marginLeft: { xs: "10px", sm: "auto" },
              width: "15rem",
              background: "white",
              borderRadius: "10rem",
              marginRight: "auto",
            }}
          >
            <SearchIcon
              sx={{ marginLeft: "10px", marginTop: "2px", bgcolor: "primary" }}
            />
            <InputBase
              placeholder="search..."
              sx={{
                paddingRight: "10px",
                paddingLeft: "10px",
                display: { xs: "none", sm: "block" },
              }}
            />
          </Typography>
          <Tooltip
            title="Profile"
            sx={{ marginLeft: { xs: "10px" }, marginRight: "1rem" }}
          >
            <AccountCircleIcon
              onClick={() => {
                dispatch(uiActions.toggle());
              }}
            />

          </Tooltip>
          
          {showMenu && (
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={showMenu}
              onClose={() => {
                dispatch(uiActions.toggle());
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ marginTop: "0.4rem" }}
            >
            
              <MenuItem
                onClick={() => {
                  
                  dispatch(uiActions.toggle());
                }}
              >
                <Link to = {url} style={{ textDecoration: 'none' }}>
                My account</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("loginState");
                  dispatch(uiActions.toggle());
                  window.location.reload(false)
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
