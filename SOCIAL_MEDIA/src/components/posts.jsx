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
import axios from "axios";
export default function RecipeReviewCard(props) {
  const matches = useMediaQuery("(max-width:850px)");

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
          <Card
            key={image.id}
            sx={{
              maxWidth: { sm: 400, md: 500 },
              flex: "1",
              marginBottom: "12px",
              marginLeft: { xs: "0", sm: "15%" },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              //   width  = "500"
              max-height="450"
              // image=
              image={image.image} // image coming from array
              sx={{ padding: "16px", paddingRight: "12px" }}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<ThumbUpOutlinedIcon sx={{}} />}
                  checkedIcon={<ThumbUpRoundedIcon sx={{ color: "blue" }} />}
                  name="checkedH"
                />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  name="checkedH"
                  onChange={async () => {
                    const like = await axios.put(
                      `http://localhost:3000/api/posts/like/${image.id}`,
                      {
                        userId: localStorage.getItem("userID"),
                      }
                    );
                    if (like.status === 200) {
                      console.log(like);
                    }
                  }}
                />
              </IconButton>
            </CardActions>
          </Card>
        ))}{" "}
      </Box>
    </>
  );
}
