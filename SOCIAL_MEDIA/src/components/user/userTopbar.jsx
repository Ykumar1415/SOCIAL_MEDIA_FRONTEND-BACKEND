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
import {Skeleton} from "@mui/material";
import { Stack } from "@mui/material";


function UserTopbar(props) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);
  // take userid from url
  const user_ki_id  = useParams();
console.log("user ki id", user_ki_id.userid);
  const [profilePicture, setprofilePicture] = useState("");
  const [imagePreview, setimagePreview] = useState("");
  const [isloading, setisloading] = useState(false);
  const handleImageChange = (e) => {
    setprofilePicture(e.target.files[0]);
    // setimagePreview(URL.createObjectURL(e.target.files[0]));
  }
  ;
  const uploadImage = async (e) => {
    e.preventDefault();
    setisloading(true);
    try{
let imageurl; 
if(profilePicture ){
const image = new FormData();
// formData.append("file", selectedImage);
//     formData.append("upload_preset", "azqdvg7a");
image.append("file", profilePicture);
image.append("upload_preset", "azqdvg7a");
const res = await axios
.post("https://api.cloudinary.com/v1_1/da82eybwn/upload", image); 
console.log(res.data.url)
// send image url to backend
const res2 = await axios.put(`http://localhost:3000/api/users/update/profilepic/${localStorage.getItem('userID')}`, {
  "userId": localStorage.getItem('userID'),
 "imageurl" : res.data.url
});

imageurl = res.data.url;
alert(`${res2.data} , imageurl`);
setisloading(false);
    }}
   catch(err){
      console.log(err);
    }
  };

  const [user, setuser] = useState({
    name: "Josephine Langford",
    followers: 100,
    followings: 200,
    profilepic:
      "https://i.pinimg.com/736x/38/b2/72/38b2725d007f363d041cdd69bf490e49.jpg",
  });
  const [following, setfollowing] = useState(false);
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
        profilepic: userx.data.profilePicture,
      });
      if (userx.data.followers.includes(localStorage.getItem("userID"))) {
        setfollowing(true);
      }
    };
    getinfo();
  }, []);
  const followhandler = async () => {
    !following
      ? await axios.put(
          `http://localhost:3000/api/users/follow/${props.userId}`,
          {
            userId: localStorage.getItem("userID"),
          }
        )
      : await axios.put(
          `http://localhost:3000/api/users/unfollow/${props.userId}`,
          {
            userId: localStorage.getItem("userID"),
          }
        );

    if (!following) setuser({ ...user, followers: user.followers + 1 });
    else setuser({ ...user, followers: user.followers - 1 });
    setfollowing(!following);
  };
  return (
    <>
    {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : <>
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
          <Box sx = {{display : "flex", flexDirection : "column", justifyContent:"center"}}>
            <Avatar
              alt="Remy Sharp"
              src={user.profilepic}
              sx={{ height: "8rem", width: "8rem" }}
            />
           {user_ki_id.userid === localStorage.getItem("userID") && <form onSubmit={uploadImage}>
              <label For="fileInput" sx = {{cursor : "pointer", display : ( "none")}} > {(!isloading)? 'change' : 'uploading'}</label>
            <input type="file" id = "fileInput" name  = "image" onChange={handleImageChange} style = {{display : "none"}} />
            <button type = "submit" style = {{display : (profilePicture) ? 'block':"none"}} >submit</button>
          </form>}</Box>
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
            {!following ? "Follow" : "Unfollow"}
          </Button>
        </List>
      </Box>

      {props.userId == localStorage.getItem("userID") && (
        <TopUseractions width={1} />
      )}

      </>}
    </>
  );
}

export default UserTopbar;
