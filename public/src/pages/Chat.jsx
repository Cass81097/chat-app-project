import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { getLastMessageByUserIds } from "../utils/APIRoutes";
import { getLastMessage } from "../utils/APIRoutes";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLastMessage, setIsLastMessage] = useState(null);
  const [allLastMessage, setAllLastMessage] = useState(null);
  const [allLastMessageForChat, setAllLastMessageForChat] = useState(null);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id

    if (currentChat) {
      const dataMessage = await axios.get(
        `${getLastMessageByUserIds}?senderId=${senderId}&receiverId=${currentChat._id}`
      )
      setIsLastMessage(dataMessage.data)
    }
  }, [currentChat]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id
    
    const dataMessage = await axios.get(
      `${getLastMessage}/${senderId}`
    )
    setAllLastMessage(dataMessage.data)
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id
    
    const dataMessage = await axios.get(
      `${getLastMessage}/${senderId}`
    )
    setAllLastMessageForChat(dataMessage.data)
  }, []);

  const updateAllLastMessage = (data, id) => {
    setAllLastMessageForChat(data, id);
  };

  return (
    <>

      <div className="container_chat">
        <Contacts contacts={contacts} changeChat={handleChatChange} currentChat={currentChat} allLastMessage={allLastMessage} allLastMessageForChat={allLastMessageForChat} />
        {currentChat === undefined ? ( <Welcome allLastMessageForChat={allLastMessageForChat} /> ) : (
          <ChatContainer currentChat={currentChat} socket={socket} updateAllLastMessage={updateAllLastMessage} contacts={contacts} />
        )}
      </div>

    </>
  );
}


