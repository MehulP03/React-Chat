import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState();
//   const [messages, setMessages] = useState([]);


const subm = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        // uid: user.uid,
        message: input,
        // userId: user.uid,
      });
      setInput("");

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

//   const addMessage = (event) => {
//     event.preventDefault();
//     db.collection("messages").add({
//       message: input,
//       timestamp: db.fieldValue.serverTimestamp(),
//     });
//     setInput("");
//   };
  return (
    <>
       <h3>You are in chat Room</h3>
    <Container maxWidth="sm">
      <TextField
        id="standard-basic"
        label="Type Something"
        variant="standard"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button type="submit" onClick={subm} variant="contained">
        Send
      </Button>
    </Container>
    </>
  );
}
export default Chat;
