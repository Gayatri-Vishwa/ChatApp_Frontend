import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  ListItem,
  Stack,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useErrors, useAsyncMutation } from "../../Hooks/hook";
import { useDispatch ,useSelector} from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

function NewGroup() {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const groupName = useInputValidation(); // to select and unnselect

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id],
    );
  };


  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
    
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };


return (
  <Dialog
    open={isNewGroup}
    onClose={closeHandler}
    fullWidth
    maxWidth="xs"
      scroll="paper"
    PaperProps={{
      sx:{
        bgcolor:"#232533",
        color:"#fff",
        borderRadius:"16px",
        border:"1px solid rgba(255,255,255,0.08)",
      }
    }}
  >
    <Stack
      p={{ xs:"1rem", sm:"2rem" }}
      spacing="1.5rem"
        sx={{
    maxHeight:"90vh",
    overflow:"hidden",
  }}

    >

      <DialogTitle
        textAlign="center"
        variant="h4"
        sx={{
          color:"#fff",
          fontWeight:700,
        }}
      >
        New Group
      </DialogTitle>


      <TextField
        label="Group Name"
        value={groupName.value}
        onChange={groupName.changeHandler}
        sx={{
          "& .MuiOutlinedInput-root":{
            color:"#fff",

            "& fieldset":{
              borderColor:"rgba(255,255,255,0.3)"
            },

            "&:hover fieldset":{
              borderColor:"#2F80ED"
            },

            "&.Mui-focused fieldset":{
              borderColor:"#5CA9FF"
            }
          },

          "& .MuiInputLabel-root":{
            color:"rgba(255,255,255,0.6)"
          }
        }}
      />


      <Typography
        sx={{
          color:"#fff",
          fontWeight:600
        }}
      >
        Members
      </Typography>


      <Stack
        sx={{
          maxHeight:{
            xs:"250px",
            sm:"300px",
            md:"350px",
          },

          overflowY:"auto",

          bgcolor:"#181A20",

          border:"1px solid rgba(255,255,255,0.08)",

          borderRadius:"10px",

          padding:"0.5rem",
        }}
      >

        {data?.friends?.map((i)=>(
          <UserItem
            user={i}
            key={i._id}
            handler={selectMemberHandler}
            isAdded={selectedMembers.includes(i._id)}
          />
        ))}

      </Stack>


      <Stack
        direction="row"
        justifyContent="space-evenly"
      >

        <Button
          variant="text"
          color="error"
          size="large"
          onClick={closeHandler}
        >
          Cancel
        </Button>


        <Button
          variant="contained"
          size="large"
          onClick={submitHandler}
          disabled={isLoadingNewGroup}
          sx={{
            bgcolor:"#2F80ED",
            borderRadius:"10px",
            fontWeight:600,

            "&:hover":{
              bgcolor:"#5CA9FF"
            }
          }}
        >
          Create
        </Button>


      </Stack>

    </Stack>

  </Dialog>
);

}
export default NewGroup;
