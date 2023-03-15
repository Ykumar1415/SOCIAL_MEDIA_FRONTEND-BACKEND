import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { uiActions } from "./store/uiSlice";
import { useSelector } from "react-redux";
// import { Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
function SecureRoute(props) {
  const loginState = localStorage.getItem("loginState");
  // if (loginState==null) {
  //   localStorage.setItem("loginState", false);
  // }
  console.log(loginState);
  return loginState ? props.children : <Navigate to="/login" />;
}

export default SecureRoute;
