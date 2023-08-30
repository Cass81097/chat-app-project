import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";

export default function UserChat({ chat, user }) {
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src='https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-800x505.jpg' width="35px" height="35px" />
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.username}</div>
                    <div className="text">Text Message</div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-end">
                <div className="date">12/12/2023</div>
                <div className="this-user-notifications">2</div>
                <span className={isOnline ? "user-online" : ""}></span>
            </div>

        </Stack>
    );
}
