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
    // <div
    //   style={{
    //     alignSelf: sameSender ? "flex-end" : "flex-start",
    //     backgroundColor: "white",
    //     color: "black",
    //     borderRadius: "5px",
    //     padding: "0.5rem",
    //     // width: "fit-content",
    //     maxWidth: "40%", //  add this
    //     // wordBreak: "break-word",
    //     overflowWrap: "anywhere",
    //   }}
    // >
    //   {!sameSender && (
    //     <Typography color={lightBlue} fontWeight={"600"} variant="caption">
    //       {" "}
    //       {sender?.name}
    //     </Typography>
    //   )}

    //   {content && <Typography>{content}</Typography>}

    //   {/* Attachments */}
    //   {attachments.length > 0 &&
    //     attachments.map((attachment, index) => {
    //       const url = attachment.url;
    //       const file = fileFormat(url);
    //       return (
    //         // <Box key={index}>
    //         //   {/* <a href={url} target='_blank' download style={{ */}
    //         //   {/* // color:"black" */}
    //         //   {/* // }}> */}
    //         //   {/* {RenderAttachments (file,url)} */}
    //         //   {/* <RenderAttachments file={file} url={url} /> */}
    //         //   {/* </a> */}
    //         //   <Link
    //         //     to={url}
    //         //     target="_blank"
    //         //     download
    //         //     style={{
    //         //       color: "black",
    //         //     }}
    //         //   >
    //         //     <RenderAttachments file={file} url={url} />
    //         //   </Link>
    //         // </Box>

         
    //       );
    //     })}
    //   {/* <Typography variant="caption" color="text.secondary">
    //     {timeAgo}
    //   </Typography> */}
    // </div>


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
                <Typography
                  color={lightBlue}
                  fontWeight={"600"}
                  variant="caption"
                >
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
// export default MessageComponent;

// import { Box, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { lightBlue } from "../constants/color";
// import moment from "moment";
// import { fileFormat } from "../../lib/featues";
// import RenderAttachment from "./RenderAttachments";
// import { motion } from "framer-motion";

// const MessageComponent = ({ message, user }) => {
//   const { sender, content, attachments = [], createdAt } = message;

//   const sameSender = sender?._id === user?._id;

//   const timeAgo = moment(createdAt).fromNow();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: "-100%" }}
//       whileInView={{ opacity: 1, x: 0 }}
//       style={{
//         alignSelf: sameSender ? "flex-end" : "flex-start",
//         backgroundColor: "white",
//         color: "black",
//         borderRadius: "5px",
//         padding: "0.5rem",
//         width: "fit-content",
//       }}
//     >
//       {!sameSender && (
//         <Typography color={lightBlue} fontWeight={"600"} variant="caption">
//           {sender.name}
//         </Typography>
//       )}

//       {content && <Typography>{content}</Typography>}

//       {attachments.length > 0 &&
//         attachments.map((attachment, index) => {
//           const url = attachment.url;
//           const file = fileFormat(url);

//           return (
//             <Box key={index}>
//                <a
//                 href={url}
//                 target="_blank"
//                 download
//                 style={{
//                  color: "black",
//                  }}
//             //  >

//     sx={{
//       alignSelf: sameSender ? "flex-end" : "flex-start",
//       bgcolor: "white",
//       color: "black",
//       borderRadius: 2,
//       p: 1,
//       maxWidth: {
//         xs: "80%",
//         sm: "60%",
//       },
//       wordBreak: "break-word",
//     }}
//   >
//                 {RenderAttachment(file, url)}
//               </a>
//             </Box>
//           );
//         })}

//       <Typography variant="caption" color={"text.secondary"}>
//         {timeAgo}
//       </Typography>
//     </motion.div>
//   );
// };

// export default memo(MessageComponent);
