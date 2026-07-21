import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../Hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation,
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id],
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);
  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          bgcolor: "#232533",
          color: "#fff",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        {/* <DialogTitle textAlign={"center"}>Add Member</DialogTitle> */}
        <DialogTitle
          textAlign="center"
          sx={{
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Add Member
        </DialogTitle>

        <Stack >
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"} color="rgba(255,255,255,0.6)">
              No Friends
            </Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button
            color="error"
            onClick={closeHandler}
            sx={{
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addMemberSubmitHandler}
            disabled={isLoadingAddMembers}
            sx={{
              bgcolor: "#2F80ED",
              borderRadius: "10px",
              fontWeight: 600,

              "&:hover": {
                bgcolor: "#5CA9FF",
              },
            }}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
