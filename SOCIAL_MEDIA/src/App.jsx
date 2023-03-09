import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Stack from "@mui/material/Stack";
import Sidebar from "./components/sidebar";
import Posts from "./components/posts";
import Rightbar from "./components/rightbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnotherUser from "./components/user/anotheruser";
import Login from "./components/Login";
import Signup from "./components/Signup";
import store from "./store/store";
import Menu from "./components/menu";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { uiActions } from "./store/uiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SecureRoute from "./SecureRoute";
import Box from "@mui/material/Box";
import Chat from "./components/chat/chat";
import Rescent from "./components/chat/recentchat";
import SearchFriend from "./components/chat/searchFriend";
import Notifications from "./components/notifications";
import Typography from "@mui/material/Typography";
import Messanger from "./components/chat/messanger";
// import { Box, createTheme, ThemeProvider } from "@mui/material";

function App() {
  // localStorage.setItem("loginState", false);
  const [imagesdata, setImagesdata] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const allPosts = async () => {
      const posts = await axios.get(
        "http://localhost:3000/api/posts/myallPosts"
      );
      console.log(posts.data);
      const imgs = posts.data.map((x) => {
        return {
          username: x.username,
          image: x.img,
          userId: x.userId,
          likes: x.likes,
          id: x.id,
          desc: x.desc,
          isLiked: x.isLiked,
          date: x.date,
          userImg: x.userImg,
        };
      });
      console.log(imgs);
      setImages([...images, ...imgs]);
    };
    allPosts();
  }, []);
  const [theme, setTheme] = React.useState("light");
  const [mode, setMode] = React.useState("light");
  const themeHandle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // const dispatch = useDispatch();
  // const loginState = useSelector((state) => state.ui.isLoggedin);
  // useEffect(
  // () => {
  //   const getdata = async () => {
  //     try {
  //       const userdata = await axios.get(
  //         "http://localhost:3000/api/users/find/63c60296008a38f3e85a87e2"
  //       );
  //       // if (userdata.length > 0) {
  //       //   console.log(userdata);
  //       // }
  //       // else {
  //       //   console.log("NO User with this username")
  //       // }
  //       if (userdata) {
  //         console.log(userdata.data.profilePicture);
  //         setImages([...images, userdata.data.profilePicture]);
  //       } else {
  //         console.log("NO user with this id");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getdata();
  // }, []);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Box bgcolor={"background.default"} color="text.primary">
          <Navbar
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
          {showNotifications && <Notifications></Notifications>}
          <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Stack
            direction="row"
            spacing={2}
            sx={{ widthh: "100%", marginTop: "4rem" }}
          >
            {/* <AnotherUser></AnotherUser> */}

            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <SecureRoute>
                      {/* //Home page */}
                      <Sidebar setMode={setMode} mode={mode} />
                      <Posts images={images} />
                      <Rightbar></Rightbar>
                    </SecureRoute>
                  </>
                }
              />
              {/* ***Profile page */}
              <Route
                path="/profile/:userid"
                element={
                  <>
                    <SecureRoute>
                      <Sidebar setMode={setMode} mode={mode} />
                      <AnotherUser></AnotherUser>
                      <Rightbar></Rightbar>
                    </SecureRoute>
                  </>
                }
              ></Route>
              <Route
                path="/messanger"
                element={
                  <>
                    <SecureRoute>
                      <Messanger />
                    </SecureRoute>
                  </>
                }
              ></Route>
            </Routes>

            {/* */}
          </Stack>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
