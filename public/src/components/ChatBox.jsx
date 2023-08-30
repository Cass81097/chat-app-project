import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";

export default function ChatBox() {
    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const chatBoxRef = useRef(null); 
  
    const handleSendMessage = () => {
        if (!textMessage) return;
        sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    if (!recipientUser) {
        return (
            <p style={{ textAlign: "center", width: "100%", color: "white" }}>
                No conversation selected yet...
            </p>
        )
    }

    if (isMessagesLoading) {
        return (
            <p style={{ textAlign: "center", width: "100%", color: "white" }}>
                Loading Chat...
            </p>
        )
    }

    return (
        <Stack gap={4} className="chat-box" style={{ height: "100vh" }}>
            <div className="chat-header">
                <strong style={{ color: "white", fontWeight: "600", fontSize: "1.5rem" }}>{recipientUser?.username}</strong>
            </div>
            <Stack gap={3} className="messages">
                {messages && messages.map((message, index) =>
                    <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message self align-self-start flex-grow-0"}`}>
                        <span>{message.text}</span>
                        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>)}
                <div ref={chatBoxRef} /> 
            </Stack>

            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTextMessage} onKeyDown={handleKeyDown} fontFamily="Nunito" borderColor="rgba(72,112,223,0.2)" />
                <button className="submit-button" onClick={handleSendMessage}>
                    <IoMdSend />
                </button>
            </Stack>
        </Stack>

    );
}