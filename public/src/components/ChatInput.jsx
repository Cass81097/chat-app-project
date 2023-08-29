import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      console.log(msg);
    }
  };

  return (
    <Container className="chatbox_input">
        <div className="emoji">
          <i><BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </i>
          <i className="fas fa-paperclip"></i>
        </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type a message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    background: #f0f0f0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  .chatbox_input input {
      position: relative;
      width: 90%;
      margin: 0 20px;
      padding: 10px 20px;
      border: none;
      outline: none;
      border-radius: 30px;
      font-size: 1em;
  }
    .emoji {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: #8C91FF;
        font-size: 1.5rem;
        cursor: pointer;
       
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #ffff;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #ffff;
          width: 5px;
          &-thumb {
            background-color: #BCC0C4;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .emoji-group::before {
    background-color: #ffff !important;
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 60%;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
