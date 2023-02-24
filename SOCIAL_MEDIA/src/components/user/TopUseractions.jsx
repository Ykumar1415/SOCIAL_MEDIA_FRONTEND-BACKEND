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
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ClosedCaptionDisabledSharp, ResetTvOutlined } from "@mui/icons-material";
function TopUseractions(props) {
  const [post, setPost] = useState({
    userId: localStorage.getItem("userID"),
    desc: "",
    img: "Random",
    likes: [],
  });
  const [selectedImage, setselectedImage] = useState("");
  const [desc, setdesc] = useState(''); 
  const [image, setImage] = useState("");

  useEffect(() => {
    const userImage = async () => {
      const userId = localStorage.getItem("userID");
      const user = await axios.get(
        `http://localhost:3000/api/users/find/${localStorage.getItem("userID")}`
      );
      // console.log(user);
      const userImage = user.data.profilePicture;
      setImage(userImage);
    };
    userImage();
  }, []);
  const postHandle = async () => {
    console.log("clicked");
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "azqdvg7a");
    axios
      .post("https://api.cloudinary.com/v1_1/da82eybwn/upload", formData)
      .then(async(response) => {
        console.log(response.data.url);
        try{const res = await axios.put("http://localhost:3000/api/posts/create", {
          userId: localStorage.getItem("userID"),
          desc: desc,
          posturl: response.data.url,
        }); if (res) {
          console.log("success");
        } else console.log("failed");}
        catch (err) {
          console.log(err.message);
      }
       
      });

    
    
  };

  let x = "500px";
  const userid = useSelector((state) => state.ui.userid);
  const url = `/profile/${localStorage.getItem("userID")}`;
  return (
    <Box
      flex={2}
      sx={{
        maxWidth: "500px",
        display: "flex",
        boxShadow: "1",
        margin: "1rem",
        marginLeft: { xs: "0", sm: "15%" },
        borderRadius: "0.7rem",
      }}
    >
      <List flex={2} sx={{ maxWidth: "500px", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Link to={url}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: "50px", height: "50px" }}
                src={image}
              />
            </Link>
          </ListItemAvatar>
          <InputBase
            placeholder="Write Something.......                        "
            sx={{
              paddingRight: "10px",
              paddingLeft: "10px",
              display: { xs: "none", sm: "block" },
            }}
            onChange={(e) => setdesc(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: "auto" }}
            onClick={postHandle}
          >
            Post
          </Button>
        </ListItem>
        <Box sx={{ display: "flex" }}>
          <label
            for="file"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              color: "orange",
              cursor: "pointer",
            }}
          >
            <ImageIcon
              sx={{ marginLeft: "auto", marginRight: "auto", color: "orange" }}
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none", visibility: "none" }}
            onChange={(e) => {
              setselectedImage(e.target.files[0]);
            }}
          />
          <Typography variant="h6" color="">
            Photo
          </Typography>
          <InsertEmoticonIcon
            sx={{ marginLeft: "auto", marginRight: "auto", color: "orange" }}
          />
          <Typography variant="h6" color="">
            Feelings
          </Typography>
        </Box>
      </List>
    </Box>
  );
}

export default TopUseractions;
