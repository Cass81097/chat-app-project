import axios from "axios";
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLastMessageByUserIds, recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({ currentChat, socket, updateAllLastMessage }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const blockMessageRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        
        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
          senderId: data._id,
          receiverId: currentChat._id,
        });
  
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (currentChat) {
      fetchData();
    }
  }, [currentChat]);

  // const convertUTCToVietnamTime = (utcTime) => {
  //   const vietnamTime = moment.utc(utcTime).local().format('HH:mm');
  //   return vietnamTime;
  // };

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    // console.log('send', currentChat._id);

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    
    console.log('POST', currentChat._id);

    const dataMessage = await axios.get(`${getLastMessageByUserIds}?senderId=${senderId}&receiverId=${currentChat._id}`);
    const updatedAllLastMessage = dataMessage.data;
    updateAllLastMessage(updatedAllLastMessage);

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ message: msg });
        updateAllLastMessage(arrivalMessage);
        // alert('ok')
      });
    }
  }, []);

  useEffect( async() => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
      const receiverId = currentChat._id;
      const message = arrivalMessage.message;
      console.log({ message, receiverId });
      updateAllLastMessage({ message, receiverId });

      const dataMessage = await axios.get(`${getLastMessageByUserIds}?senderId=${senderId}&receiverId=${currentChat._id}`);
      const updatedAllLastMessage = dataMessage.data;

      if (senderId !== updatedAllLastMessage.senderId) {
        console.log('Tiep tuc return message ');
      } else {
        // blockMessageRef.current.textContent = '';
        console.log('Ko return');
      }
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="rightSide">
      <div className="header">
        <div className="imgText">
          <div className="userimg">
            <img className="cover" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <h4>{currentChat.username}<br></br><span>online</span></h4>
        </div>
        <ul className="nav_icons">
          <Logout />
        </ul>
      </div>

      <div className="chatBox">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div 
                ref={blockMessageRef}
                id={'blockMessage' + index}
                className={`message ${message.fromSelf ? "my_message" : "frnd_message"
                  }`}
              >
                <p>{message.message}<br></br><span></span></p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>

  );
}

