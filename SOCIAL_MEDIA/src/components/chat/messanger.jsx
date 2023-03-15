import React from "react";
import { useState } from "react";
 
import SearchFriend from "./searchFriend";
import Chat from "./chat";
 import { useRef } from "react";
import Rescent from "./recentchat";
import moment from 'moment'
import axios from "axios";import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,Button,
  ImageList,
  ImageListItem,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import styled from "@emotion/styled";
import io from "socket.io-client";
const Socket = io.connect("ws://localhost:8900");
function messanger() {
  const [messages, setmessages] = useState([]);
  const [convid, setconvid] = useState("");
  // const [clicked, setclicked] = useState("");
  // const [friends, setfriends] = useState([]);

  // useEffect(() => {
  //   const x = async () => {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/users/friends/${localStorage.getItem(
  //         "userID"
  //       )}`
  //     );
  //     setfriends(res.data);
  //     console.log(res.data[0]);
  //   };
  //   x();
  // }, []);

  // const newconversation = async (id) => {
  //   const res = await axios.post(
  //     `http://localhost:3000/api/conversations/searchandcreate`,
  //     { senderId: localStorage.getItem("userID"), receiverId: id }
  //   );
  //   console.log(res.data + "new conversation");
  //   const res2 = await axios.get(
  //     `http://localhost:3000/api/messages/${res.data._id}`
  //   );
  //   console.log(res2.data);
  //   const x = res2.data.map((item) => {
  //     return {
  //       text: item.text,
  //       cid: item.conversationId,
  //       sender: item.sender,
  //       time: item.createdAt,
  //     };
  //   });
  //   setmessages(x);
  //   setconvid(res.data._id);

  //   setclicked(id);
  // };

  const messageRef = useRef();

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // // *********************** set socket for socket.io **********************
  // // const [Socket, setSocket] = useState(null);
  // // useEffect(() => {
  // //   const newSocket = io("ws://localhost:8900");
  // //   setSocket(newSocket);
  // //   // return () => newSocket.close();
  // // }, []);
  // const Socket = useRef();
  useEffect(() => {
    // Socket.current = io("ws://localhost:8900");
    Socket.emit("addUser", localStorage.getItem("userID"));
    Socket.on("getUsers", (users) => {
      console.log(users);
    });
  }, []);
  const time = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  
  const Search = styled("div")({
    backgroundColor: "#fff",
    // marginLeft: "auto",
    borderRadius: "0.5rem",
    width: "100%",
    marginLeft: "1rem",
    marginTop: "1rem",

    border: "1px solid #000",
  });
 
  const [clicked, setclicked] = useState("");
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    const x = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/users/friends/${localStorage.getItem(
          "userID"
        )}`
      );
      setfriends(res.data);
      console.log(res.data[0]);
    };
    x();
  }, []);
    const newconversation = async (id) => {
    const res = await axios.post(
      `http://localhost:3000/api/conversations/searchandcreate`,
      { senderId: localStorage.getItem("userID"), receiverId: id }
    );

    const res2 = await axios.get(
      `http://localhost:3000/api/messages/${res.data._id}`
    );
  
    const m = res2.data.map((item) => {
      return {
        text: item.text,
        cid: item.conversationId,
        sender: item.sender,
        time: item.createdAt,
      };
    });
    setmessages(m);
    setconvid(res.data._id);

    setclicked(id);
  };
  const sendmsg = async () => {
    const msg = await messageRef.current.value;
    const res = await axios.post(`http://localhost:3000/api/messages/newMsg`, {
      text: msg,
      sender: localStorage.getItem("userID"),
      conversationId: convid,
    });
      setmessages(messages =>([
      ...messages,
      {
        text: msg,
        cid: convid,
        sender: localStorage.getItem("userID"),
        time: res.data.createdAt,
      },
    ]));
    messageRef.current.value = "";
    const res2 = await axios.get(
      `http://localhost:3000/api/conversations/getconversation/${convid}`
    );
    console.log(res2.data.members[1]);
    Socket.emit("sendMessage", {
      senderId: localStorage.getItem("userID"),
      receiverId:
        res2.data.members[1] != localStorage.getItem("userID")
          ? res2.data.members[1]
          : res2.data.members[0],
      text: msg,
    });
    // setmessages([
    //   ...messages,
    //   {
    //     text: msg,
    //     cid: convid,
    //     sender: localStorage.getItem("userID"),
    //     time: res.data.createdAt,
    //   },
    // ]);
  };
  useEffect(() => {
   
    Socket.on("getMessage", (data) => {
      console.log("new message from server io", data);
      setmessages(messages =>([
        ...messages,
        {
          text: data.text,
          cid: convid,
          sender: data.senderId,
          time: new Date(Date.now()),
        },
      ]));
    });
  }, [Socket]);

  
  return (
    <Typography
      variant="div"
      color="initial"
      sx={{ display: "flex", height: "100%", width: "100%" }}
    >
      <Box
        flex={1}
        p={2}
        sx={{
          display: { xs: "none", sm: "flex" },
          marginLeft: "auto",
          boxShadow: "1",
        }}
      >
        <Box position="fixed" sxwidth={300} sx={{ marginLeft: "auto" }}>
          <Typography variant="h6" fontWeight={100} sx={{ marginLeft: "1rem" }}>
            Search Friends
          </Typography>
          <Search sx={{ display: { xs: "none", sm: "block" }, width: "100%" }}>
            <InputBase
              placeholder="search..."
              sx={{ paddingLeft: "10px", display: { xs: "none", sm: "block" } }}
            />
          </Search>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {friends.map((item) => (
              <ListItem
                alignItems="flex-start"
                key={item.id}
                sx={{
                  cursor: "pointer",
                  borderRadius: "1rem",
                  backgroundColor: item.id == clicked ? "lightgray " : "white",
                }}
                onClick={() => {
                  newconversation(item.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={item.profilePicture} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
            <Divider variant="inset" component="li" />
          </List>
        </Box>
      </Box>
      <Box sx={{ flex: "2", height: "90vh", width: "auto" }}>
        <Box
          sx={{
            height: "60%",
            width: "100%",
            backgroundColor: "white",
            boxShadow: "1",
            overflowY: "scroll",
          }}
        >
          {messages.length == 0 ? (
            <h1>Nothin Here</h1>
          ) : (
            messages.map((item) => (
              <div ref={scrollRef}>
                {/* // <Message send={(item.sender==localStorage.getItem('userID')) ? "1" : "0"} message={item.text} time={(item.time)} key = {item.cid}  cid = {item.cid}/> */}
                <div
                  key={item.cid}
                  cid={item.cid}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      item.sender == localStorage.getItem("userID")
                        ? "flex-end"
                        : "flex-start",
                    margin: "1rem",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      backgroundColor:
                        item.sender == localStorage.getItem("userID")
                          ? "#dcf8c6"
                          : "#e6dcf5",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "1rem",
                    }}
                  >
                    {item.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ color: "gray", marginTop: "0.5rem" }}
                  >
                    <p>{item.sender}</p>
                    <p>{moment(item.time).fromNow()}</p>
                  </Typography>
                </div>
              </div>
            ))
          )}
        </Box>
        <Typography
          sx={{
            height: "30%",
            width: "100%",
            marginTop: "2rem",
            display: "flex",
            flex: "1",
            alignItems: "center",
          }}
        >
          <textarea
            id=""
            ref={messageRef}
            style={{
              display: "flex",
              flex: "2",
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "12px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              height: "2.5rem",
              marginLeft: { xs: "12px", sm: "2rem" },
            }}
            onClick={sendmsg}
          >
            Send
          </Button>
        </Typography>
      </Box>
      {/* <Rescent
        messages={messages}
        setmessages={setmessages}
        setconvid={setconvid}
      ></Rescent> */}
    </Typography>
  );
}

export default messanger;
