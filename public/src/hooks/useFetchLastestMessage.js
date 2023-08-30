import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLastestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [lastestMessage, setLastestMessage] = useState(null);
    // console.log("lastestMessage", lastestMessage);

    useEffect(() => {
       const getMessages = async() => {              
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`)

            if(response.error) {
                return console.log("Error getting messages...")
            }

            const lastMessage =  response[response?.length-1]

            setLastestMessage(lastMessage)
       }
       getMessages()
      }, [newMessage, notifications]);

    return { lastestMessage }
}
