import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import TopUseractions from "./user/TopUseractions";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SinglePost from './SinglePost'
import axios from "axios";
export default function RecipeReviewCard(props) {
  const matches = useMediaQuery("(max-width:850px)");
const f = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
  let x = matches ? "row" : "column";
  const likeHandler = async () => {
    const like = await axios.put(
      `http://localhost:3000/api/posts/like/${props.id}`,
      {
        userId: localStorage.getItem("userID"),
      }
    );
    if (like.status === 200) {
      console.log(like);
    }
  };
  return (
    <>
      {" "}
      <Box flex={2} sx={{ boxShadow: "1" }}>
        <TopUseractions width={0} />
        {props.images.map((image) => (
          <SinglePost image = {image} />
        ))}{" "}
      </Box>
    </>
  );
}
