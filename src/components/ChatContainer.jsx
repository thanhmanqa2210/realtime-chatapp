import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import { v4 as uuidV4 } from "uuid";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";
function ChatContainer({ currentChat, currentUser, socket }) {
  console.log(uuidV4())
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isLoadMessages, setIsLoadMessages] = useState(false);
  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(await res.data);
    };
    getMessages();
    setIsLoadMessages(false);
  }, [isLoadMessages, currentChat,currentUser]);

  const handleSendMsg = async (msg) => {
   const dataTest = await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });
    console.log("dataTest",dataTest.data.msg);
    await setIsLoadMessages(true);
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentChat?.username}</h3>
            </div>
          </div>
          <Logout title={"Logout"} />
        </div>
        <Messages messages={messages} scrollRef={scrollRef} keyUuid={uuidV4} />
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </>
  );
}
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 76% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-auto-rows: 15% 75%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
    }
  }
`;
export default ChatContainer;
