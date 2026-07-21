import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Avatar,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../Hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

function Notifications() {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequests = data?.allRequests || [];

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptRequest({ requestId: _id, action: accept });
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setIsNotification(false));
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  const onCloseHandler = () => {
    dispatch(setIsNotification(false));
  };

  useErrors([{ error, isError }]);

  return (
  
    <Dialog
      open={isNotification}
      onClose={onCloseHandler}
      PaperProps={{
        sx: {
          bgcolor: "#232533",
          color: "#fff",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      {/* <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}> */}
      <Stack p={{ xs: "1rem", sm: "2rem" }} spacing="1rem" maxWidth="25rem">
       
        <DialogTitle
          sx={{
            color: "#fff",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Notifications
        </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {friendRequests.length > 0 ? (
              friendRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
            
              <Typography
                textAlign="center"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                No notifications
              </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender || {};
  return (
    // <ListItem>
    <ListItem
      sx={{
        bgcolor: "#181A20",
        borderRadius: "12px",
        mb: 1,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing="1rem"
        width="100%"
        sx={{
          color: "#fff",
        }}
      >
        <Avatar src={avatar} />
        <Typography
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "100%",
            textOverflow: "ellipsis",
            color: "#fff",
            fontWeight: 500,
          }}
        >{`${name || "Someone"} sent you a friend request`}</Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
         
          <Button
            onClick={() => handler({ _id, accept: true })}
            sx={{
              color: "#5CA9FF",
              fontWeight: 600,
            }}
          >
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handler({ _id, accept: false })}
            sx={{
              fontWeight: 600,
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
