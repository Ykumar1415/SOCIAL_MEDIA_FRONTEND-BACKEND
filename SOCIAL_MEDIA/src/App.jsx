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
import Notifications from "./components/notifications";
function App() {
  // localStorage.setItem("loginState", false);
  const [imagesdata, setImagesdata] = useState([]);
  const [images, setImages] = useState([
    { image: "https://i.pinimg.com/736x/38/b2/72/38b2725d007f363d041cdd69bf490e49.jpg", id: 1 },
    {image : "https://i.pinimg.com/originals/7a/b7/47/7ab74773f38918c1c14ee0bcbc2ad2d8.jpg", id : 2},
    {image : "https://superstarsbio.com/wp-content/uploads/2019/11/Hande-Ercel.jpg", id : 3},
    
    {image : "https://media.vanityfair.com/photos/55423c5cdb753b82389ca5f0/3:2/w_900,h_600,c_limit/kristen-stewart-hollywood-sexism.jpg",id : 4}
  ]);
  useEffect(() => {
    const allPosts =async () => {
    const posts = await axios.get("http://localhost:3000/api/posts/myallPosts");
      console.log(posts.data);
     const imgs =  posts.data.map((x) => {
       return {image : x.img, id :x._id }; 
     })
      console.log(imgs);
      setImages([...images, ...imgs])
  }
  allPosts(); 
  
}, [])

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
   
      <BrowserRouter>
        <div className="App">
        <Navbar showNotifications={showNotifications}  setShowNotifications={ setShowNotifications} />
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
                    <Sidebar></Sidebar>
                    <Posts images={images} />
                      <Rightbar ></Rightbar>
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
                    <Sidebar></Sidebar>
                    <AnotherUser></AnotherUser>
                      <Rightbar ></Rightbar>
                    </SecureRoute>
                  </>
                }
              ></Route>
            </Routes>

            {/* */}
          </Stack>
        </div>
      </BrowserRouter>
  
  );
}

export default App;
