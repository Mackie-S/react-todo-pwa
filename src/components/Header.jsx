import React, { useContext, useState } from "react";
import dig from "object-dig";
import { logOut, signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { AppBar } from "@mui/material";
import {Toolbar} from "@mui/material";
import {Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {Button} from "@mui/material";

const useStyles = makeStyles(() => ({
  toolbar:{
    justifyContent: "space-between"
  },
  button:{
    color:"#FFF"
  }
}));

const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  const classes = useStyles();
  const buttonRender = () => {
    let buttonDom;
    //もしログインしていたら
    if (dig(currentUser, "currentUser", "uid")) {
      buttonDom = <Button variant="inherit" onClick={logOut}>ログアウト</Button>;
      //もしログインしていなかったら
    } else {
      buttonDom = <Button variant="inherit" onClick={signInWithGoogle}>ログイン</Button>;
    }
    return buttonDom;
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">React ToDo</Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
