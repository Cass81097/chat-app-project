import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import UserChat from "../components/UserChat";

export default function PotentialChats() {
    const {user} = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)
    

    return (
        <>
            <div className="all-users">
                {potentialChats && potentialChats.map((u, index) => {
                    const isOnline = onlineUsers?.some((user) => user?.userId === u?._id)
                    return (
                        <div className="single-users" key={index} onClick={() => createChat(user._id, u._id)}>
                            {u.username}
                            <span 
                            className={isOnline ? "user-online" : ""}></span>
                        </div>
                    )
                })}
            </div>
        </>

    );
}


