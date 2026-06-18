// import React,{ useCallback,useMemo } from "react";
// import Header from "./Header";
// import Title from "../shared/Title.jsx";
// import Grid from "@mui/material/Grid";
// import Chatlist from "../specific/Chatlist.jsx";
// // import { sampleChats } from "../constants/sampleData.js";
// import { useParams } from "react-router-dom";
// import Profile from "../specific/Profile.jsx";
// import { useMyChatsQuery } from "../../redux/api/api.js";
// import { Drawer, Skeleton } from "@mui/material";
// import { useSelector ,useDispatch} from "react-redux";
// import { setIsMobileMenu } from "../../redux/reducers/misc.js";
// // import {useErrors} from "../../hooks/useErrors.js";\\
// // import {useErrors} from "../../Hooks/hook.jsx";
// import { useErrors, useSocketEvents } from "../../hooks/hook";
// import MobileProfile from "../specific/MobileProfile.jsx";
// import { getSocket } from "../../utils/socket.jsx";

// // import { NEW_MESSAGE, NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../../../server/constants/event.js";
// import { NEW_MESSAGE, NEW_MESSAGE_ALERT, NEW_REQUEST } from '../constants/events.js'
// import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";

// const AppLayout = () => (WrappedComponent) => {
//   return (props) => {
//     const params = useParams();
//     const chatId = params.chatId;

//     console.log("AppLayout chatId =", chatId);
//     const dispatch = useDispatch();
//     const socket=getSocket()
//     // console.log("socket id ",socket.id);

//     const {isSearch}= useSelector((state) => state.misc);
//     const { isMobileMenu } = useSelector((state) => state.misc);
//     const { user } = useSelector((state) => state.auth);
//     const { newMessagesAlert } = useSelector((state) => state.chat);
//     console.log("newMessagesAlert",newMessagesAlert)

//     const { isLoading, data, isError, error, refetch } = useMyChatsQuery(""); //to get the latest chats from server and update the chatlis
// // console.log("RTK Result:", isLoading, data, isError, error, refetch);
//     useErrors([{isError, error}]);

//     const handleDeleteChat = (e, _id, groupChat) => {
//       e.preventDefault();
//       console.log("delete chat ", _id, groupChat);
//     };

//     const handleMobileClose = () => {
//       dispatch(setIsMobileMenu(false));
//       // dispatch(setIsMobileMenu(!isMobileMenu));
//     };

// const newMessagesAlertHandler=useCallback((data)=>{

//   if(data.chatId===chatId) return
//   dispatch(setNewMessagesAlert(data))

// },[chatId])

// const newRequestHandler=useCallback(()=>{
//     console.log("NEW_REQUEST RECEIVED");
//   dispatch(incrementNotification())
// },[dispatch])

//   const eventHandlers = { [NEW_MESSAGE_ALERT]: newMessagesAlertHandler ,[NEW_REQUEST]: newRequestHandler };

// // const eventHandlers = useMemo(() => ({
// //   [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
// //   [NEW_REQUEST]: newRequestHandler,
// // }), [newMessagesAlertHandler, newRequestHandler]);

//   useSocketEvents(socket, eventHandlers);

// // console.log("Chats =", data?.chats);

//     return (
//       <>
//         <Title />
//         <Header />

//     {isLoading ? (
//               <Skeleton />
//             ) : (
//               <Drawer open={isMobileMenu} onClose={handleMobileClose}>
//                   {/* <MobileProfile user={user} /> */}
//               <Chatlist
//               width={"70vw"}
//                 chats={data?.chats || []}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}

//               />

//               </Drawer>
//             )}

//         <Grid container height={"calc(100vh - 4rem)"}>
//           <Grid
//             size={{ sm: 6, md: 3 }}
//             display={{ xs: "none", sm: "block" }}
//             height={"100%"}
//           >
//             {isLoading ? (
//               <Skeleton />
//             ) : (
//               <Chatlist
//                 chats={data?.chats}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}
//               />
//             )}
//             {isError && <div>Error loading chats: {error.message} </div>}
//           </Grid>
//           <Grid
//             size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
//             // display={{ xs: "none", sm: "block" }}
//             height={"100%"}
//           >
//             <WrappedComponent   {...props} chatId={chatId}   user={user}/>
//             {/* <WrappedComponent   key={chatId} {...props} chatId={chatId}   user={user}/> */}
//           </Grid>
//           <Grid
//             size={{ md: 4, lg: 3 }}
//             display={{ xs: "none", md: "block" }}
//             height={"100%"}
//             sx={{ padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }}
//           >
//             <Profile user={user}/>
//           </Grid>
//         </Grid>

//         <div>footer</div>
//       </>
//     );
//   };
// };
// export default AppLayout;

// ====================================

import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/featues";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../utils/socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import toast from "react-hot-toast";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();

    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (element, chatId, groupChat) => {
        console.log("element",element);
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      // deleteMenuAnchor.current = e.currentTarget;
        deleteMenuAnchor.current = element;
     
    };

    const handleMobileClose = () => dispatch(setIsMobileMenu(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId],
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container
          sx={{
    height: "calc(100vh - 4rem)",
    // paddingBottom:"2rem"

  }}
 
  >
          {/* //left */}



<Grid
  item
   height="100%" 
  sx={{
    width: "320px",
    // flexShrink: 0,
    display: { xs: "none", sm: "block" },
  }}
>
          {/* <Grid item sm={4} md={4}   height="100%" sx={{   display: { xs: "none", sm: "block" }}}> */}
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>

          {/* <Grid item xs={12} sm={8} md={6} lg={6} height="100%"> */}
            <Grid item xs={12} sm={8} md={5}   height="100%" sx={{ flex: 1, minWidth: 0 }}>
            {/* <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}> */}
            {/* <Grid item xs={12} sm={8} md={4} lg={4} height="100%"> */}
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>




<Grid item md={3}    height="100%" sx={{ display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)", flexShrink: 0 }}>
          {/* <Grid
            item
            xs={12}
            md={3}
            lg={3}
            height="100%"
         
          > */}
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
