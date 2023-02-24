import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/currentuserSlice";
import { useSelector } from "react-redux";
import axios from "axios";
function Login() {
  let [user, setuser] = useState({
    username: "",
    password: "",
    email: "",
    ImageUrl: "",
  });
  const adduserHandler = async () => {
    const adduser = await axios.post(
      "http://localhost:3000/api/auth/register",
     user
      
    );
    if (adduser) {
      console.log("success");
    } else console.lgo("error in adding user");
  };

  const dispatch = useDispatch();
  //  dispatch(userActions.addUser());
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        marginTop: "3rem",
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
        Signup
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
          id="Email"
          name="Email"
          label="Email"
          value={user.email}
          onChange={(e) => {
            setuser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <TextField
          id="Username"
          name="Username"
          label="Username"
          value={user.username}
          onChange={(e) => {
            setuser({
              ...user,
              username: e.target.value,
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
        <TextField
          id="ConfirmPassword"
          name="ConfirmPassword"
          label="ConfirmPassword"
          // value={user.email}
          // onChange={(e) => {
          //   setuser({
          //     ...user,
          //     email: user.email,
          //   });
          // }}
        />
       
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: "300px", flexShrink: "1" }}
        onClick={adduserHandler}
      >
        Signup
      </Button>
      <Typography variant="p" color="initial">
        You have a account? <a href="/login">Sign In</a>
      </Typography>
      <Typography variant="p" color="initial">
        Copyright © Yogi{" "}
      </Typography>
    </Box>
  );
}

export default Login;
