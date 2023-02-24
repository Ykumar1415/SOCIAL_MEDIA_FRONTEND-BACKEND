import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  let [user, setuser] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const usera = await axios.post("http://localhost:3000/api/auth/login", user);
      if (usera.status === 200) {
        localStorage.setItem("loginState", true);
        const x = `${usera.data}`; 
        localStorage.setItem("userID", `${x}`);
        console.log(usera.data )
        console.log("success");
        dispatch(uiActions.userIDnew(usera.data._id));
        dispatch(uiActions.setlogin(true));
        
        navigate("/")
        // console.log(usera);
      }
 
      else {
        console.log("error")
        navigate("/login")
      }

    
      
    }
    catch (e) {
      console.log(e);
      navigate("/login")
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        Login
      </Typography>
      <Typography
        variant="div"
        color="initial"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "1rem",
        }}
      >
        <TextField
          id="email"
          name="email"
          label="email"
          value={user.email}
          onChange={(e) => {
            setuser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <TextField
          id="Password"
          name="Password"
          label="Password"
          value={user.password}
          onChange={(e) => {
            setuser({
              ...user,
              password: e.target.value,
            });
          }}
        />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "300px", flexShrink: "1" }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="p" color="initial">
        Don't have an account? <a href="/signup">Signup</a>
      </Typography>
      <Typography variant="p" color="initial">
        Copyright © Yogi{" "}
      </Typography>
    </Box>
  );
}

export default Login;
