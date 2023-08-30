import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { FaEnvelope } from 'react-icons/fa';
import { unreadNotificationsFunc } from "../hooks/unreadNotifications"
import moment from "moment";

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(AuthContext)
    const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationsAsRead } = useContext(ChatContext)

    const unreadNotifications = unreadNotificationsFunc(notifications)
    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find(user => user._id === n.senderId);

        return {
            ...n,
            senderName: sender?.username
        }
    })

    return (
        <div className="notifications">
            <div className="notification-icon" style={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
                <FaEnvelope />
                {unreadNotifications?.length === 0 ? null : (
                    <span className="notification-count">
                        <span>{unreadNotifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ? (<div className="notification-box">
                <div className="notification-header" style={{ display: "flex" }}>
                    <h3>Notifications</h3>
                    <div className="mark-as-read" onClick={() => markAllNotificationsAsRead(notifications)}>
                        Mark all as read
                    </div>
                </div>
                {modifiedNotifications?.length === 0 ? <span className="notification">No notification</span> : null}
                {modifiedNotifications && modifiedNotifications.map((n, index) => {
                    return <div 
                    key={index} 
                    className={n.isRead ? 'notification' : 'notification not-read'}
                    onClick={() => {
                        markNotificationsAsRead(n, userChats, user, notifications)
                        setIsOpen(false);
                    }}
                    >
                        <span>{`${n.senderName} sent you a new message`}</span>
                        <span>{moment(n.date).calendar()}</span>
                    </div>
                })}
            </div>
            ) : null}

        </div>

    );
}


