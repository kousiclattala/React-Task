import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import { setIsLoggedIn } from "../redux/authSlice";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../screens/ForgotPassword";

function DecideNavigator() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("@token");

    console.log("token ", token);

    if (token == null) {
      dispatch(setIsLoggedIn(false));
    } else {
      dispatch(setIsLoggedIn(true));
    }
  }, []);

  console.log("is logged in ", isLoggedIn);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<HomeScreen />} />
      ) : (
        <>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/signin"} />}
      />
    </Routes>
  );
}

export default DecideNavigator;
