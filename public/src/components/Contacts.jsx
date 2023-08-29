import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { getLastMessage } from "../utils/APIRoutes"
import axios from "axios";
import { getLastMessageByUserIds } from "../utils/APIRoutes";

export default function Contacts({ contacts, changeChat, allLastMessage, allLastMessageForChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [lastId, setLastId] = useState(null);
  const [messageValue, setMessageValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    setLastId(contact._id);
    changeChat(contact);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const dataId = data._id;
      if (lastId && allLastMessageForChat && lastId === allLastMessageForChat.receiverId) {
        const test = document.getElementById(`${allLastMessageForChat.receiverId}`);
        if (dataId === allLastMessageForChat.senderId) {
          test.innerHTML = `Bạn: ${allLastMessageForChat.message}`;
        } else {
          test.innerHTML = allLastMessageForChat.message;
        }
        setMessageValue('0');
      } else {
        setMessageValue('');
      }
    }
    fetchData();
  }, [lastId, allLastMessageForChat]);

  // const convertUTCToVietnamTime = (utcTime, index) => {
  //   const message = currentLastmessage[index];
  //   const vietnamTime = message ? moment.utc(message.createdAt).local().format('HH:mm') : '';
  //   return vietnamTime;
  // };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="leftSide">
          <div className="header">
            <div className="userimg">
              <img className="cover" src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
              <p className="current_name">{currentUserName}</p>
            </div>
            <ul className="nav_icons">
              <li><i className="fas fa-comment-alt"></i></li>
              <li><i className="fas fa-ellipsis-v"></i></li>
            </ul>
          </div>

          <div className="search_chat">
            <div>
              <input type="text" placeholder="Search or start new chat..." />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="chatlist">
            {contacts.map((contact, index) => {
              const message = allLastMessage[index];
              // console.log(message);
              return (
                <div
                  key={contact._id}
                  className={`block ${index === currentSelected ? "active" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="imgbx">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" className="cover" />
                  </div>
                  <div className="details">
                    <div className="listHead">
                      <h4>{contact.username}</h4>
                      {/* <p className="time">{vietnamTime}</p> */}
                    </div>
                    <div className="message_p">
                      <p id={contact._id}>{message ? message.message : messageValue}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}