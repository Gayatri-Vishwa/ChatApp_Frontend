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
    <Dialog open={isNotification} onClose={onCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

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
              <Typography textAlign={"center"}>No notifications</Typography>
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
    <ListItem>
      <Stack
        direction="row"
        alignItems="center"
        spacing="1rem"
        width="100%"
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
          }}
        >{`${name || "Someone"} sent you a friend request`}</Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;


