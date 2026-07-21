
import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
  REQUEST_UNREAD_ALERTS,
} from "../constants/events";
import { useErrors, useSocketEvents } from "../../Hooks/hook";
import { getOrSaveFromStorage } from "../../lib/featues";
import { useMyChatsQuery, useGetUnreadMessagesQuery } from "../../redux/api/api";
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
      console.log("element", element);
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      // deleteMenuAnchor.current = e.currentTarget;
      deleteMenuAnchor.current = element;
    };

    const handleMobileClose = () => dispatch(setIsMobileMenu(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        console.log("NEW_MESSAGE_ALERT received in AppLayout:", data);
        const cid = String(data.chatId);
        if (chatId && cid === chatId) return;
        dispatch(setNewMessagesAlert({ chatId: cid, count: Number(data.count) || 1 }));

      },
      [chatId],
    );


    
    // Fetch unread counts from API once on load (covers missed socket emits)
    const { data: unreadData } = useGetUnreadMessagesQuery(undefined, { skip: !user });

    useEffect(() => {
      if (!unreadData?.notifications) return;
      console.log("unreadData from API:", unreadData);
      unreadData.notifications.forEach((n) => {
        dispatch(setNewMessagesAlert({ chatId: String(n._id), count: Number(n.count) || 1 }));
      });
    }, [unreadData]);

    useEffect(() => {
      if (!socket || !user) return;

      const handleConnect = () => {
        try {
          socket.emit(REQUEST_UNREAD_ALERTS);
          console.log("AppLayout requested unread alerts from socket on connect");
        } catch (err) {
          console.warn("Failed to request unread alerts from socket on connect", err);
        }
      };

      socket.on("connect", handleConnect);
      if (socket.connected) {
        handleConnect();
      }

      return () => {
        socket.off("connect", handleConnect);
      };
    }, [socket, user]);

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

    // Ask server for any stored unread alerts after handlers are registered
    useEffect(() => {
      if (!socket) return;
      try {
        socket.emit(REQUEST_UNREAD_ALERTS);
        console.log("Requested unread alerts from server");
      } catch (err) {
        console.log("Failed to request unread alerts", err);
      }
    }, [socket]);

    useEffect(() => {
      if (user) {
        refetch();
      }
    }, [user]);

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

        <Grid
          container
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
            
              display: { xs: "none", sm: "block" },
            }}
          >
          
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

      
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            height="100%"
            sx={{ flex: 1, minWidth: 0 }}
          >
         
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={3}
            height="100%"
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
              flexShrink: 0,
            }}
          >
         
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
