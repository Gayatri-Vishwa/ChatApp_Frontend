import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useClearChatMutation,
} from "../../redux/api/api";

import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";


const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc,
  );

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation,
  );

//   const [clearChat, ___, clearChatData] =
//     useAsyncMutation(useClearChatMutation);

    const [clearChat, ___,clearChatData] = useAsyncMutation(useClearChatMutation);

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation,
  );

  const isGroup = selectedDeleteChat.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    console.log("Leave Group clicked");
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const deleteChatHandler = () => {
    console.log("Deleting Chaclicked");
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };

  const clearChatHandler = () => {
    console.log("Clear Chat clicked");
    closeHandler();
    clearChat("Clearing Chat...", selectedDeleteChat.chatId);
  };

useEffect(() => {
  if (deleteChatData || leaveGroupData ||clearChatData)
    navigate("/");
}, [deleteChatData, leaveGroupData,clearChatData]);


return (
//   <Menu
//     open={isDeleteMenu}
//     onClose={closeHandler}
//     anchorEl={deleteMenuAnchor.current}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "center",
//       horizontal: "center",
//     }}
//   >
//     {isGroup ? (
//       <Stack
//         sx={{
//           width: "10rem",
//           padding: "0.5rem",
//           cursor: "pointer",
//         }}
//         direction="row"
//         alignItems="center"
//         spacing="0.5rem"
//         onClick={leaveGroupHandler}
//       >
//         <ExitToAppIcon />
//         <Typography>Leave Group</Typography>
//       </Stack>
//     ) : (
//       <>
//         <Stack
//           sx={{
//             width: "10rem",
//             padding: "0.5rem",
//             cursor: "pointer",
//           }}
//           direction="row"
//           alignItems="center"
//           spacing="0.5rem"
//           onClick={clearChatHandler}
//         >
//           <DeleteIcon />
//           <Typography>Clear Chat</Typography>
//         </Stack>

//         <Stack
//           sx={{
//             width: "10rem",
//             padding: "0.5rem",
//             cursor: "pointer",
//           }}
//           direction="row"
//           alignItems="center"
//           spacing="0.5rem"
//           onClick={deleteChatHandler}
//         >
//           <DeleteIcon />
//           <Typography>Delete Chat</Typography>
//         </Stack>
//       </>
//     )}
//   </Menu>






  <Menu
    open={isDeleteMenu}
    onClose={closeHandler}
    anchorEl={deleteMenuAnchor.current}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "center",
      horizontal: "center",
    }}
  >
  <MenuItem onClick={clearChatHandler}>
    <ListItemIcon>
      <DeleteIcon color="warning" />
    </ListItemIcon>
    <ListItemText>Clear Chat</ListItemText>
  </MenuItem>

  {isGroup ? (
    <MenuItem onClick={leaveGroupHandler}>
      <ListItemIcon>
        <ExitToAppIcon color="error" />
      </ListItemIcon>
      <ListItemText>Leave Group</ListItemText>
    </MenuItem>
  ) : (
    <MenuItem onClick={deleteChatHandler}>
      <ListItemIcon>
        <DeleteIcon color="error" />
      </ListItemIcon>
      <ListItemText>Delete Chat</ListItemText>
    </MenuItem>
  )}
</Menu>
);
};

export default DeleteChatMenu;
