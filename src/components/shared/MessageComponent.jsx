import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../constants/Color";
import moment from "moment";
import { fileFormat } from "../../lib/featues";
import RenderAttachments from "./RenderAttachments";
import RenderAttachment from "./RenderAttachments";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

function MessageComponent({ message, user }) {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "8px",
        maxWidth: "60%",
        width: "fit-content",
        wordBreak: "break-word",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                <RenderAttachments file={file} url={url} />
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
}

export default memo(MessageComponent);
