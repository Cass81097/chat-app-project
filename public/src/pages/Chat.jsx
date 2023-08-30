import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import ChatBox from "../components/ChatBox";
import PotentialChats from "../components/PotentialChats";
import UserChat from "../components/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {

  const { user } = useContext(AuthContext)

  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)

  // console.log("UserChats", userChats);

  return (
    <Container>
      <PotentialChats/>
      {userChats?.length < 1 ? null :
        <Stack direction="horizontal" gap={4} className="aligh-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                 <UserChat chat={chat} user={user}/> 
                </div>
              )
              })}
          </Stack>  
          <ChatBox/>
        </Stack>
      }
    </Container>
  );
}


