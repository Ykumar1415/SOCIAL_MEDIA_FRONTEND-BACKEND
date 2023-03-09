import React from "react";
import { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import TopUseractions from "./TopUseractions";
import { useEffect } from "react";
import axios from "axios";
function UserTopbar(props) {
  const [user, setuser] = useState({
    name: "Josephine Langford",
    followers: 100,
    followings: 200,
    profilepic : "https://i.pinimg.com/736x/38/b2/72/38b2725d007f363d041cdd69bf490e49.jpg"
  });
  const [following , setfollowing ] = useState(false)
  useEffect(() => {
    const getinfo = async () => {
      const userx = await axios.get(
        `http://localhost:3000/api/users/find/${props.userId}`
      );
      // console.log(userx);

      setuser({
        ...user,
        name: userx.data.name,
        followers: userx.data.followers.length,
        followings: userx.data.followinzgs.length,
        profilepic : userx.data.profilePicture
      })
      if(userx.data.followers.includes(localStorage.getItem("userID"))){
        setfollowing(true)
      }
    };
    getinfo();
  }, []);
  const followhandler = async () => {
  (!following)  ? (await axios.put(`http://localhost:3000/api/users/follow/${props.userId}`, {
      userId: localStorage.getItem("userID"),
    })
    
)
: (await axios.put(`http://localhost:3000/api/users/unfollow/${props.userId}`, {
  userId: localStorage.getItem("userID"),
}) )

if(!following)
setuser({...user, followers : user.followers+1})
else
setuser({...user, followers : user.followers-1})
setfollowing(!following)
}
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: "2",
          alignItems: "start",

          marginTop: "1rem",
        }}
      >
        <List
          sx={{
            padding: "1rem",
            width: "100%",
            display: "flex",
            gap: "3rem",
            color: "brown",
            boxShadow: "1",
            borderRadius: " 1rem",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={user.profilepic}
            sx={{ height: "8rem", width: "8rem" }}
          />
          <Typography
            variant="div"
            color="initial"
            sx={{ fontWeight: "bold", marginTop: "1rem", fontSize: "1.5rem" }}
          >
            {user.name}
            <Typography
              variant="h1"
              color="initial"
              sx={{ display: "flex", gap: "3rem", marginTop: "12px" }}
            >
              <Typography>Followers</Typography>
              <Typography>Followings</Typography>
            </Typography>
            <Typography
              variant="h1"
              color="initial"
              sx={{ display: "flex", gap: "7rem", marginTop: "12px" }}
            >
              <Typography>{user.followers}</Typography>
              <Typography>{user.followings}</Typography>
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ height: "", marginTop: "2rem", marginLeft: "4rem" }}
            onClick={followhandler}
          >
           { (!following) ? "Follow" : "Unfollow"}
          </Button>
        </List>
      </Box>

  {  (props.userId == localStorage.getItem("userID"))&&  <TopUseractions width={1} />}
    </>
  );
}

export default UserTopbar;
