// import React, {
//   Fragment,
//   memo,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import { Icon, IconButton, Skeleton, Stack, Typography } from "@mui/material";
// import { grayColor, orange } from "../components/constants/Color";
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponents";
// import FileMenu from "../components/dialogs/FileMenu";
// import { sampleMessage } from "../components/constants/sampleData";
// import MessageComponent from "../components/shared/MessageComponent";
// import { getSocket } from "../utils/socket";
// import { useChaDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
// // import { NEW_MESSAGE } from "../../../server/constants/event";
// import { NEW_MESSAGE } from "../components/constants/events";
// import { useDispatch, useSelector } from "react-redux";
// import { useErrors, useSocketEvents } from "../Hooks/hook";
// // import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { useInfiniteScrollTop } from "6pp";
// import { setIsFileMenu } from "../redux/reducers/misc";
// import { removeNewMessagesAlert } from "../redux/reducers/chat";

// const Chat = ({ chatId, user }) => {
//   console.log("CHAT COMPONENT RENDERED");
//   console.log("Chat prop chatId =", chatId);
//   const containerRef = useRef(null);
//   const socket = getSocket();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
//   // const [showScrollButton, setShowScrollButton] = useState(false);
//   const dispatch = useDispatch();

//   // const chatDetails = useChaDetailsQuery({ chatId, skip: !chatId }); //if no chat id then skip "no call"
//   const chatDetails = useChaDetailsQuery({ chatId }, { skip: !chatId });

//   const oldMessagesChunk = useGetMessagesQuery(
//     { chatId, page },
//     { skip: !chatId },
//   );
// const chatIdRef = useRef(chatId);

// useEffect(() => {
//   chatIdRef.current = chatId;
// }, [chatId]);

//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages,
//   );


 
//   const errors = [
//     { isError: chatDetails.isError, error: chatDetails.error },
//     { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
//   ];

//   const allMessages = [...(oldMessages || []), ...messages];
// //   const allMessages = [
// //   ...(oldMessagesChunk.data?.messages || []),
// //   ...messages,
// // ];

//   const members = chatDetails?.data?.chat?.members;
//   //  const {user}=useSelector((state)=>state.auth)

//   const handleFileOpen = (e) => {
//     console.log("yes");
//     dispatch(setIsFileMenu(true));
//     setFileMenuAnchor(e.currentTarget);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     // Emitting the message to the server
//     socket.emit(NEW_MESSAGE, { chatId, members, message });
//     setMessage("");
//   };

//   useEffect(() => {
//     oldMessagesChunk.refetch();
//     // setMessages([]);
//   }, [chatId]);




//   console.log("oldMessages =", oldMessages);
// console.log("messages =", messages);
// console.log("allMessages =", allMessages);


// const newMessagesHandler = useCallback((data) => {
//   console.log("NEW MESSAGE RECEIVED", data);

//   if (data.chatId.toString() !== chatId.toString()) return;

//   setMessages((prev) => {
//     console.log("prev messages =", prev);

//     const updated = [...prev, data.message];

//     console.log("updated messages =", updated);

//     return updated;
//   });
// }, [chatId]);

// //   const newMessagesHandler = useCallback(
// //     (data) => {
// //       console.log("NEW MESSAGE RECEIVED", data);
// //       // if (data.chatId !== chatId) return;
// // if (data.chatId.toString() !== chatId.toString()) return;
      
// //       setMessages((prev) => {
// //         console.log("SETMESSAGES CALLED");
// //         const exists = prev.find((msg) => msg._id === data.message._id);

// //         if (exists) return prev;

// //         return [...prev, data.message];
// //       });
// //       // setMessages((prev) => [...prev, data.message]);
// //     },
// //     [chatId],
// //   );



//   const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };

//   useSocketEvents(socket, eventHandler);

//   useErrors(errors);
//   useEffect(() => {
//     console.log("CHAT MOUNTED");

//     return () => {
//       console.log("CHAT UNMOUNTED");
//     };
//   }, []);
 


//   useEffect(() => {
//     dispatch(removeNewMessagesAlert(chatId));
//     if (allMessages.length) {
//       setTimeout(() => {
//         containerRef.current?.scrollTo({
//           top: containerRef.current.scrollHeight,
//           behavior: "instant",
//         });
//       }, 0);
//       // return () => {
//       //   setMessages([]);
//       //   setMessage("");
//       //   // setOldMessages([]);
//       //   setPage(1);
//       // };
//     }
//   }, [ allMessages.length]);


// console.log("page =", page);
// console.log("totalPages =", oldMessagesChunk.data?.totalPages);
// console.log("oldMessages length =", oldMessages?.length);
// console.log("oldMessages =", oldMessages);
// console.log("oldMessagesChunk.data?.messages =", oldMessagesChunk.data?.messages);
// useEffect(() => {
//   setMessages([]);
//   setPage(1);
  
//   // setOldMessages([]);
// }, [chatId]);

// // useEffect(() => {
// //   if (!containerRef.current || allMessages.length === 0) return;

// //   setTimeout(() => {
// //     containerRef.current.scrollTo({
// //       top: containerRef.current.scrollHeight,
// //       behavior: "smooth",
// //     });
// //   }, 50);

// // }, [allMessages.length]);

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <Fragment>
//       <Stack
//         ref={containerRef}
//         boxSizing={"border-box"}
//         padding={"1rem"}
//         bgcolor={grayColor}
//         height={"90%"}
//         spacing={"1rem"}
//         sx={{
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         {allMessages.length === 0 && (
//           <Typography textAlign="center" color="text.secondary" variant="body2">
//             No messages yet. Say hello!
//           </Typography>
//         )}
//         {/* messages render */}
//         {allMessages?.map((i) => (
//           <MessageComponent
//             key={i._id}
//             message={i}
//             user={user}
//             containerRef={containerRef}
//           />
//         ))}
//       </Stack>

//       <form
//         style={{
//           height: "10%",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack
//           direction={"row"}
//           height={"100%"}
//           padding={"1rem"}
//           alignItems={"center"}
//           position={"relative"}
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//               rotate: "30deg",
//             }}
//             onClick={handleFileOpen}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             rows={1}
//             placeholder="Type message here ..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               // rotate:"-30deg",
//               backgroundColor: orange,
//               color: "white",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               "&:hover": {
//                 bgcolor: "error.dark",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>

//       <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
//     </Fragment>
//   );
// };

// // export default memo(Chat)

// export default AppLayout()(Chat);
// // export default memo(AppLayout()(Chat));






/////////////////////////////copy============================================================================================

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../components/constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../utils/socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
  

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useEffect(() => {
  if (oldMessagesChunk.data?.messages?.length === 0) {
    setOldMessages([]);
    setMessages([]);
  }
}, [oldMessagesChunk.data]);

  useSocketEvents(socket, eventHandler);

  useErrors(errors);
  useEffect(() => {
  if (chatDetails.isError) {
    navigate("/");
  }
}, [chatDetails.isError]);

  const allMessages = [...oldMessages, ...messages];

//   const allMessages = [
//   ...(oldMessagesChunk.data?.messages || []),
//   ...messages,
// ];




  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
          // alignItems="flex-start"
          
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
            // minWidth: 0,  
        }}
 


      >
        {allMessages.map((i) => (
          
          <MessageComponent key={i._id} message={i} user={user}   
 
  />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
      
    </Fragment>
  );
};

export default AppLayout()(Chat);
