import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/currentuserSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  let [user, setuser] = useState({
    username: "",
    password: "",
    email: "",
    ImageUrl: "",
  });
  const adduserHandler = async () => {
    if (!user.email.includes("@")) {
      alert("invalid email");
      return;
    }

    const adduser = await axios.post(
      "https://socialme-68rw.onrender.com/api/auth/register",
      user
    );
    if (adduser.status === 200) {
      console.log("success");
      alert("user added");
      navigate("/login");
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
          type = "email"
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
          type="password"
          value={user.password}
          onChange={(e) => {
            setuser({
              ...user,
              password: e.target.value,
            });
          }}
        />
        {/* <TextField
          id="ConfirmPassword"
          name="ConfirmPassword"
          type ="password"
          label="ConfirmPassword"
          // value={user.email}
          // onChange={(e) => {
          //   setuser({
          //     ...user,
          //     email: user.email,
          //   });
          // }}
        /> */}
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
        You have a account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </span>
      </Typography>
      <Typography variant="p" color="initial">
        Copyright © Yogi{" "}
      </Typography>
    </Box>
  );
}

export default Login;
