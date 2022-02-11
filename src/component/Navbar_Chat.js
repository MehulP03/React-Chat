import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Chat from "./Chat_Room";

function MenuBar() {
  const signin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        
      });
  };

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Typography>Chat App</Typography>
            <IconButton onClick={signin}> Login </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{margineTop:150}}>
      <Chat />
      </div>
      
    </>
  );
}
export default MenuBar;
