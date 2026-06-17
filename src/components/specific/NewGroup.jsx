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
      open
      onClose={closeHandler}
      fullWidth
      maxWidth="xs" // responsive width
    >
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        spacing={"1.5rem"}
        sx={{
          width: "100%",
          maxHeight: "80vh", // prevent full screen scroll
        }}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="GroupName"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>

        <Stack
          sx={{
            maxHeight: {
              xs: "250px", // mobile
              sm: "300px", // tablet
              md: "350px", // desktop
            },
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            padding: "0.5rem",
          }}
        >
          {data?.friends?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              // isAdded={members.includes(i._id)}
              isAdded={selectedMembers.includes(i._id)}

              // handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
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
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
export default NewGroup;

// ======================================================================================================================

// import { useInputValidation } from "6pp";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Skeleton,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// // import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useAvailableFriendsQuery,
//   useNewGroupMutation,
// } from "../../redux/api/api";
// import { useAsyncMutation, useErrors } from "../../hooks/hook";
// import { setIsNewGroup } from "../../redux/reducers/misc";
// import toast from "react-hot-toast";

// const NewGroup = () => {
//   const { isNewGroup } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();

//   const { isError, isLoading, error, data } = useAvailableFriendsQuery();
//   const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

//   const groupName = useInputValidation("");

//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const errors = [
//     {
//       isError,
//       error,
//     },
//   ];

//   useErrors(errors);

//   const selectMemberHandler = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currElement) => currElement !== id)
//         : [...prev, id]
//     );
//   };

//   const submitHandler = () => {
//     if (!groupName.value) return toast.error("Group name is required");

//     if (selectedMembers.length < 2)
//       return toast.error("Please Select Atleast 3 Members");

//     newGroup("Creating New Group...", {
//       name: groupName.value,
//       members: selectedMembers,
//     });

//     closeHandler();
//   };

//   const closeHandler = () => {
//     dispatch(setIsNewGroup(false));
//   };

//   return (
//     <Dialog onClose={closeHandler} open={isNewGroup}>
//       <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
//         <DialogTitle textAlign={"center"} variant="h4">
//           New Group
//         </DialogTitle>

//         <TextField
//           label="Group Name"
//           value={groupName.value}
//           onChange={groupName.changeHandler}
//         />

//         <Typography variant="body1">Members</Typography>

//         <Stack>
//           {isLoading ? (
//             <Skeleton />
//           ) : (
//             data?.friends?.map((i) => (
//               <UserItem
//                 user={i}
//                 key={i._id}
//                 handler={selectMemberHandler}
//                 isAdded={selectedMembers.includes(i._id)}
//               />
//             ))
//           )}
//         </Stack>

//         <Stack direction={"row"} justifyContent={"space-evenly"}>
//           <Button
//             variant="text"
//             color="error"
//             size="large"
//             onClick={closeHandler}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={submitHandler}
//             disabled={isLoadingNewGroup}
//           >
//             Create
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default NewGroup;
