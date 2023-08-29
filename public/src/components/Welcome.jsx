import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import ChatContainer from "../components/ChatContainer"

export default function Welcome(allLastMessageForChat, arrivalLastMessage) {

  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  return (
    <Container>
      <div className="welcome">
        <div className="welcome_img">
          <img src={Robot} alt="" />
        </div>
        <div className="welcome_chat">
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h3>Please select a chat to Start.</h3>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  flex: 70% 1;
  background: #e5ddd5;

  .welcome_img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .welcome_chat {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -100px;
  }
`;
