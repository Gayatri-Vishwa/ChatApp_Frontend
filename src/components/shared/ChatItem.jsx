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
  timer,
}) {
  const longPress = (e) => {
    // e.preventDefault();

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
            gap: 2,
            p: 1.8,
            mb: 1,
            borderRadius: "14px",
            width: "100%",
            cursor: "pointer",
            transition: "all .25s ease",

            bgcolor: sameSender ? "#2F80ED" : "#232533",
            color: "#FFFFFF",

            border: sameSender
              ? "1px solid #5CA9FF"
              : "1px solid rgba(255,255,255,0.06)",

            "&:hover": {
              bgcolor: sameSender ? "#3A8DFF" : "#2C3040",
              transform: "translateY(-2px)",
            },
          }}
        >
          {/* Avatar */}
          <AvatarCard avatar={avatar} />

          {/* Name + Message */}
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Typography
             
              sx={{
                fontWeight: 600,
                fontSize: "15px",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
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
      </motion.div>
    </Link>
  );
}

export default memo(ChatItem);
