import { Stack } from "@mui/material";

import ChatItem from "../shared/ChatItem";
import React, { useRef } from "react";

export default function ChatList({
  w = "100%",
  chats = [],
  chatId,
  handleDeleteChat,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
})


 {

    const timer = useRef(null);

    
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}   sx={{
    overflowX: "hidden",   // ✅ IMPORTANT
    maxWidth: "100%",
  }}>
      {chats?.map((data, index) => {
        
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id,
        );
        const isOnline = members?.some((member) => onlineUsers.includes(member));
        // const isOnline = members?.some((member) => onlineUsers.includes(_id));
        // console.log("_id:", _id);
        return (
          <ChatItem
          index={index}
            newMessageAlert={newMessageAlert}
          
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
              timer={timer}     // 👈 ye add karo
            // key={chatId} 
          />
        );
      })}
    </Stack>
  );
}
