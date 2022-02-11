import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { db } from "../firebase.js";
// import { collection, addDoc, QuerySnapshot } from "firebase/firestore";
import MessageDataService from "../services/messageService";

function Chat() {
  const [input, setInput] = useState();
  const [mssg, setMssg] = useState({ error: false, msg: "" });

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const data = await MessageDataService.getAllMessages();
    console.log(data.docs);
    setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMssg("");

    // if (input === "") {
    //   setMssg({ error: true, msg: "All fields are mandatory!" });
    //   return;
    // }
    // if (input !== "") {
    //   setMssg({ error:false, msg: "We get value in field"});
    //   return;
    // }
    const newMessage = {
      input,
    };
    console.log(newMessage);

    try {
      await MessageDataService.addMessages(newMessage);
      setMssg({ error: false, mssg: "New Message added succesfuly" });
    } catch (error) {
      setMssg({ error: true, mssg: error.mssg });
    }

    setInput("");
  };
  const deleteHandler = async (id) => {
    await MessageDataService.deleteMessage(id);
    getMessages();
  };

  return (
    <>
      {mssg?.msg && (
        <Alert
          variant={mssg?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMssg("")}
        >
          {mssg?.msg}
        </Alert>
      )}
      {/* <pre>{JSON.stringify(messages, undefined, 2)}</pre> */}
      <Container >
        {messages.map((doc, messages) => {
          return (
            <Card  key={doc.id} sx={{ marginTop: 5 ,minWidth: 275 , maxWidth : 100 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography sx={{ fontSize: 18 }} color="text.secondary">{doc.input}</Typography>
                <Button
                  varient="secondary"
                  size="small"
                  onClick={(event) => deleteHandler(doc.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Container>
      <h3>You are in chat Room</h3>
      <Container maxWidth="sm">
        <TextField
          id="standard-basic"
          label="Type Something"
          variant="standard"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type="submit" onClick={handleSubmit} variant="contained">
          Send
        </Button>
      </Container>
    </>
  );
}
export default Chat;
