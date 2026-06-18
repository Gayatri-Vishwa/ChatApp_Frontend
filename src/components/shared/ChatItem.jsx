// ===============trail= but best================
import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Stack, Typography, Box } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";


function ChatItem({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  index = 0,
  newMessageAlert,
  handleDeleteChat,
  timer 
}) {
const longPress = (e) => {
  e.preventDefault();

  const element = e.currentTarget;

  timer.current = setTimeout(() => {
    handleDeleteChat(element, _id, groupChat);
  }, 700);
};
  return (
<Link
  to={`/chat/${_id}`}
  onContextMenu={(e) => {
    e.preventDefault();
    handleDeleteChat(e.currentTarget, _id, groupChat);
  }}
  onTouchStart={longPress}
  onTouchEnd={() => clearTimeout(timer.current)}
  onTouchMove={() => clearTimeout(timer.current)}
  sx={{
    padding: 0,
    textDecoration: "none",
    display: "block",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  }}
>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            gap: 2,
            borderRadius: 2,
            width: "100%",
            cursor: "pointer",
            transition: "0.2s ease",

            bgcolor: sameSender ? "#111" : "white",
            color: sameSender ? "white" : "black",

            "&:hover": {
              transform: "scale(1.02)",
              backgroundColor: sameSender ? "#000" : "#f5f5f5",
            },
          }}
        >
          {/* Avatar */}
          <AvatarCard avatar={avatar} />

          {/* Name + Message */}
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontWeight={600}
              sx={{
                whiteSpace: "normal",
                overflowWrap: "anywhere", // 🔥 important
                wordBreak: "break-word",
              }}
            >
              {name}
            </Typography>

            {newMessageAlert && (
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "green",
                }}
              >
                {newMessageAlert.count} new message
              </Typography>
            )}
          </Stack>

          {/* Online dot */}
          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#00ff6a",
                boxShadow: "0 0 8px #00ff6a",
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.4)", opacity: 0.6 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
            />
          )}

          {/* Unread badge */}
          {newMessageAlert && (
            <Box
              sx={{
                background: "red",
                color: "white",
                fontSize: "0.7rem",
                px: 1,
                py: 0.3,
                borderRadius: "50px",
                minWidth: "20px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {newMessageAlert.count}
            </Box>
          )}
        </Box>
        {/* <IconButton
  onClick={(e) => {
    deleteMenuAnchor.current = e.currentTarget;

    dispatch(
      setIsDeleteMenu({
        chatId: chat._id,
        groupChat: chat.groupChat,
      })
    );
  }}
>
  <MoreVertIcon />
</IconButton> */}
      </motion.div>
    </Link>
  );
}

export default memo(ChatItem);



// import React, { memo } from "react";
// import { Link } from "../styles/StyledComponents";
// import { Box, Stack, Typography } from "@mui/material";
// import AvatarCard from "./AvatarCard";
// import { motion } from "framer-motion";

// const ChatItem = ({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,
// }) => {
//   return (
//     <Link
//       sx={{
//         padding: "0",
//       }}
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: "-100%" }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 * index }}
//         style={{
//           display: "flex",
//           gap: "1rem",
//           alignItems: "center",
//           backgroundColor: sameSender ? "black" : "unset",
//           color: sameSender ? "white" : "unset",
//           position: "relative",
//           padding: "1rem",
//         }}
//       >
//         <AvatarCard avatar={avatar} />

//         <Stack>
//           <Typography>{name}</Typography>
//           {newMessageAlert && (
//             <Typography>{newMessageAlert.count} New Message</Typography>
//           )}
//         </Stack>

//         {isOnline && (
//           <Box
//             sx={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "green",
//               position: "absolute",
//               top: "50%",
//               right: "1rem",
//               transform: "translateY(-50%)",
//             }}
//           />
//         )}

{
  /* Unread badge */
}
// {newMessageAlert && (
//   <Box
//     sx={{
//       background: "red",
//       color: "white",
//       fontSize: "0.7rem",
//       px: 1,
//       py: 0.3,
//       borderRadius: "50px",
//       minWidth: "20px",
//       textAlign: "center",
//       fontWeight: "bold",
//     }}
//   >
//     {newMessageAlert.count}
//   </Box>
// )}
//       </motion.div>
//     </Link>
//   );
// };

// export default memo(ChatItem);
