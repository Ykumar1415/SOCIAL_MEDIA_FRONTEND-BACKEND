import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ReactDOM from "react-dom" 
import {
  Avatar,
  Box,
  CardActions,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { Favorite } from "@mui/icons-material";
import { useReducer } from "react";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
 
function ShowPost({setpartimg,partimgid }) {
 const [imgData, setimgData] = useState(); 
  const [like, setLike] = useState(false);
  const [userName , setUserName] = useState()
  const [userImg , setUserImg] = useState()
 useEffect(() => {
   const x = async () => {
      const post = await axios.get(
        `http://localhost:3000/api/posts/postById/${partimgid}`
      );
      console.log(post.data);
      setimgData(post.data);
     setLike(imgData?.likes?.includes(localStorage.getItem("userID"))) 
    }
    const y = async () => {
      const user = await axios.get(`http://localhost:3000/api/users/find/${imgData?.userId}`)
   console.log(user.data)
    setUserName(user.data.name)
    setUserImg(user.data.profilePicture)
    }

    x(); 

 y(); 


 }, [like])
 

  return (<>
    {ReactDOM.createPortal(
      <>
     <Box
      sx={{
        display: "flex",
      position:'absolute',
        // flex : "",
        justifyContent: "center",
       alignItems: "center",
        backgroundColor: "rgba(1,0,0,0.5)",
        height:  "100vh" ,
        width: "500rem",
        zIndex: "400",

        
      }}
      onClick = {()=>{setpartimg(false)}}
    > </Box>

    <Box
      sx={{
        display: "flex",
      position:'absolute',
        // flex : "",
        justifyContent: "center",
       alignItems: "center",
        backgroundColor: "transparent",
        marginTop: "5%",
       marginLeft : {xs : "2%",sm : "40%"},
       marginRight: {xs : "2%",sm : "40%"},
        zIndex: "500",

        
      }}
     
    >
      <Typography
        variant="div"
        color="initial"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "0.8rem",
          backgroundColor: "white",
          border : "1px solid #e0e0e0",
          width: "23rem",
          height: "30rem",
          zIndex: "550",
        }}
      >
        <Typography variant="div" color="initial">
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              borderRadius: "1rem",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={userName}src={userImg} />
              </ListItemAvatar>
              <ListItemText
                primary={userName}
                secondary={
                  <React.Fragment>
                    <Typography variant="h10" color="inherit">{imgData?.desc}</Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Typography>
        <img
          src={imgData?.img}
           alt="image"
          style={{ width : '100%', height:"60%", paddingBottom: "1rem" , marginBottom : "0" , objectFit: "contain" }}
        />
        <CardActions disableSpacing>
         
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              name="checkedH"
              checked={like}
              onChange={async () => {
                const liked = await axios.put(
                  `http://localhost:3000/api/posts/like/${partimgid}`,
                  {
                    userId: localStorage.getItem("userID"),
                  }
                );
                if (liked.status === 200) {
                  console.log(liked.data)
                   setLike(!like)
                   
                }
              }}
            />
          </IconButton>
          <Typography variant="h9" color="initial" sx = {{fontFamily : "italian"}}>𝒯𝒽𝒾𝓈 𝒫𝑜𝓈𝓉 𝐻𝒶𝓈 𝐿𝒾𝓀𝑒𝓈 : {imgData?.likes.length}</Typography>
        </CardActions>
      </Typography>
    </Box>
  </>
    , document.getElementById("portal"))}</>
  );
}
export default ShowPost;


