import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import classes from "./Login.module.css";
import { SGID_BACKEND_URL } from "../config/constants";
import useAuth from "../hooks/useAuth";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
  Spacer,
} from "@chakra-ui/react";

const LoginPage = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const loginHandler = () => {
  //   setIsLoggedIn(true);
  // };

  // let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `/home`;
  //   navigate(path);
  // };
  const [isLoading, setIsLoading] = useState(false);

  const logInHandler = () => {
    setIsLoading(true);

    fetch(`${SGID_BACKEND_URL}/api/auth-url`, {
      credentials: "include",
    })
      .then(async (r) => await r.json())
      .then(({ url }) => {
        window.location.href = url;
      })
      .catch((e) => {
        setIsLoading(false);
        if (e instanceof Error) {
          return alert("ERROR");
        }
      });
  };

  const { user, isLoading: isUserLoading } = useAuth();

  if (isUserLoading) {
    return <h1>Loading....</h1>;
  }

  // if (user !== null) {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div className={classes.login}>
      <VStack>
        <Image
          src={require("../assets/login-vector-2.png")}
          borderRadius="ml"
          maxWidth="70%"
          minWidth="400px"
        />

        <div className={classes["login-card"]}>
          <button className={classes["button-sgid"]}>
            Log in with Singpass
          </button>
          <button className={classes.button}>Log in with Google</button>
          <button className={classes.button}>Log in with Facebook</button>
          <button className={classes.button}>Log in with Github</button>
        </div>
      </VStack>
    </div>
  );
};

export default LoginPage;
