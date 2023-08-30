import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import { useFetchLastestMessage } from "../hooks/useFetchLastestMessage";
import { unreadNotificationsFunc } from "../hooks/unreadNotifications"
import moment from "moment";

export default function UserChat({ chat, user }) {
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { lastestMessage } = useFetchLastestMessage(chat)

    const { notifications, onlineUsers, markThisUserNotificationsAsRead } = useContext(ChatContext)

    const unreadNotifications = unreadNotificationsFunc(notifications)
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId == recipientUser?._id
    )

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20)

        if (text.length > 20) {
            shortText = shortText + "..."
        }
        return shortText;
    }

    console.log(lastestMessage);

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
            onClick={() => {
                if (thisUserNotifications?.length !== 0) {
                    markThisUserNotificationsAsRead(thisUserNotifications, notifications)
                }
            }}
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src='https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-800x505.jpg' width="35px" height="35px" />
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.username}</div>
                    <div className="text">{
                        lastestMessage?.text && (
                            <span>
                                {truncateText(lastestMessage?.text)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(lastestMessage?.createdAt).calendar()}</div>
                <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
                    {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
                </div>
                <span className={isOnline ? "user-online" : ""}></span>
            </div>

        </Stack>
    );
}
