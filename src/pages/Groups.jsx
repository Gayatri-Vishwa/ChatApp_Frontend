// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Done as DoneIcon,
//   Edit as EditIcon,
//   KeyboardBackspace as KeyboardBackspaceIcon,
//   Menu as MenuIcon,
// } from "@mui/icons-material";
// import {
//   Avatar,
//   Backdrop,
//   Box,
//   Button,
//   Drawer,
//   Grid,
//   IconButton,
//   Stack,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";

// import { bgGradient, matBlack } from "../components/constants/Color";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { memo, useState, useEffect, lazy, Suspense } from "react";
// import { Link } from "../components/styles/StyledComponents";
// import { LayoutLoaders } from "../components/layout/Loaders";
// import AvatarCard from "../components/shared/AvatarCard";
// import { sampleChats, sampleUsers } from "../components/constants/sampleData";
// import UserItem from "../components/shared/UserItem";
// import {useMyGroupsQuery,useChatDetailsQuery} from '../redux/api/api'
// import { useErrors } from "../Hooks/hook";

// const ConfirmDeleteDialog = lazy(
//   () => import("../components/dialogs/ConfirmDeleteDialog"),
// );
// const AddMemberDialog = lazy(
//   () => import("../components/dialogs/AddMemberDialog"),
// );
// function Groups() {
//   const [iseMobileOpen, setIsMobileOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState();
//   const [groupName, setGroupName] = useState("");
//   const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
//   const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

 
// const myGroups = useMyGroupsQuery("");
//   const isAddMember = false;



//   const navigate = useNavigate();
//   const navigateBack = () => {
//     navigate("/");
//   };
//   const handleMobile = () => {
//     setIsMobileOpen((prev) => !prev);
//   };
//   const openAddMemberHandler = () => {};

//   const openConfirmDeleteHandler = () => {
//     setConfirmDeleteDialog(true);
//     console.log("group deleted");
//   };

//   const closeConfirmDeleteHandler = () => {
//     setConfirmDeleteDialog(false);
//   };
//   const deleteHandler = () => {
//     console.log("delete handler");
//     closeConfirmDeleteHandler();
//   };
//   const removeMemberHandler = (id) => {
//     console.log("removed memvber", id);
//   };

//   const chatId = useSearchParams()[0].get("group");
//   console.log(chatId);

//   const handleMobileClose = () => {
//     setIsMobileOpen(false);
//   };



//   const IconButtons = () => {
//     return  (
//       <>
//         <Box
//           sx={{
//             display: {
//               xs: "block",
//               sm: "none",
//               position: "fixed",
//               right: "1rem",
//               top: "1rem",
//             },
//           }}
//         >
//           <IconButton onClick={handleMobile}>
//             <MenuIcon />
//           </IconButton>
//         </Box>

//         <Tooltip title="back">
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: "2rem",
//               left: "2rem",
//               bgcolor: matBlack,
//               color: "white",
//               ":hover": {
//                 bgcolor: "rgba(0,0,0,0.7)",
//               },
//             }}
//             onClick={navigateBack}
//           >
//             <KeyboardBackspaceIcon />
//           </IconButton>
//         </Tooltip>
//       </>
//     );
//   };



//   const updateGroupName = () => {
//     setIsEdit(false);
//     console.log(groupNameUpdatedValue);
//   };

//   const GroupName = (
//     <Stack
//       direction={"row"}
//       alignItems={"center"}
//       justifyContent={"center"}
//       spacing={"1rem"}
//       padding={"3rem"}
//     >
//       {isEdit ? (
//         <>
//           <TextField
//             value={groupNameUpdatedValue}
//             onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
//           />
//           <IconButton onClick={updateGroupName}>
//             <DoneIcon />
//           </IconButton>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4">{groupName}</Typography>
//           <IconButton onClick={() => setIsEdit(true)}>
//             <EditIcon />
//           </IconButton>
//         </>
//       )}
//     </Stack>
//   );

//   const ButtonGroup = (
//     <Stack
//       direction={{
//         sm: "row",
//         xs: "column-reverse",
//       }}
//       spacing={"1rem"}
//       p={{
//         sm: "1rem",
//         xs: "0",
//         md: "1rem 4rem",
//       }}
//       marginTop={"1rem"}
//     >
//       <Button
//         size="large"
//         color="error"
//         startIcon={<DeleteIcon />}
//         onClick={openConfirmDeleteHandler}
//       >
//         Delete Group
//       </Button>
//       <Button
//         size="large"
//         variant="contained"
//         startIcon={<AddIcon />}
//         onClick={openAddMemberHandler}
//       >
//         Add Member
//       </Button>
//     </Stack>
//   );

//   useEffect(() => {
//     if (chatId) {
//       setGroupName(`Group name${chatId}`);
//       setGroupNameUpdatedValue(`Group name${chatId}`);
//     }
//     return () => {
//       setGroupName("");
//       setGroupNameUpdatedValue("");
//       setIsEdit(false);
//     };
//   }, [chatId]);


//   console.log("data.....",myGroups.data)




//      const groupDetails = useChatDetailsQuery(
//     { chatId, populate: true },
//     { skip: !chatId }
//   );
//     const errors = [
//     {
//       isError: myGroups.isError,
//       error: myGroups.error,
//     },
//     {
      
//       isError: groupDetails.isError,
//       error: groupDetails.error,
//     },
//   ];
//   useErrors(errors)






//   return myGroups.isLoading ? <LayoutLoaders /> : (
//     <Grid
//       container
//       sx={{ height: "100vh", width: "100vw", overflowX:"hidden" }}
//     >
//       {/* Left Side */}
//       <Grid
//         size={{ xs: 0, sm: 4 }}
//         sx={{
//           display: { xs: "none", sm: "block" },
//           // display: { xs: "none", sm: "block" },
//           height: "100%",
//         }}
//       >
//         {/* <GroupsList myGroups={sampleChats} chatId={chatId} /> */}
//         <GroupsList
//   myGroups={myGroups.data?.groups || []}
//   chatId={chatId}
// />
//       </Grid>

//       {/* Right Side */}
//       <Grid
//         size={{ xs: 12, sm: 8 }}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "1rem 3rem",
//           position: "relative",
//           overflowX: "hidden",
//           height:"100%"
//         }}
//       >
//         {<IconButtons />}
//         {groupName && (
//           <>
//             {GroupName}
//             <Typography margin={"2rem"} alignSelf={"flex-start"} variant="boy1">
//               Members
//             </Typography>
//             <Stack
//               maxWidth={"45rem"}
//               width={"100%"}
//               boxSizing={"border-box"}
//               padding={{
//                 sm: "1rem",
//                 xs: "0",
//                 md: "1rem 4rem",
//               }}
//               spacing={"1rem"}
//               height={"50vh"}
           
//               // overflow={"auto"}
//               sx={{
//                 flex: 1, // 🔥 THIS IS THE MAGIC
//                 overflowY: "auto", // 🔥 scroll only here
//               }}
//             >
//               {/* membersssss */}

//               {sampleUsers.map((i) => (
//                 <UserItem
//                   key={i._id}
//                   user={i}
//                   isAdded
//                   styling={{
                   
//                     boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
//                     padding: {
//                       sm:"1rem 2rem",
//                       xs:"0.5rem",
//                     },
//                     borderRadius: "1rem",
//                   }}
//                   handler={removeMemberHandler}
//                 />
//               ))}
//             </Stack>
//             {ButtonGroup}
//           </>
//         )}
//       </Grid>

//       {isAddMember && (
//         <Suspense fallback={<Backdrop open />}>
//           <AddMemberDialog chatId={chatId} />
//         </Suspense>
//       )}
//       {confirmDeleteDialog && (
//         <>
//           <Suspense fallback={<Backdrop open />}>
//             <ConfirmDeleteDialog
//               open={confirmDeleteDialog}
//               handleClose={closeConfirmDeleteHandler}
//               deleteHandler={deleteHandler}
//             />
//           </Suspense>
//         </>
//       )}

//       <Drawer
//         open={iseMobileOpen}
//         onClose={handleMobileClose}
//         sx={{
//           display: {
//             xs: "block",
//             sm: "none",
//           },
//         }}
//       >
//         <GroupsList myGroups={sampleChats} chatId={chatId} width={"55vw"} />
//       </Drawer>
//     </Grid>
//   );
// }

// const GroupsList = ({ width = "100%", myGroups = [], chatId }) => (
//   <Stack
//     width={width}
//     sx={{
//       // display: { xs: "none", sm: "block" },
//       height: "100%",
//       backgroundImage: bgGradient,
//       overflow: "auto",
//     }}
//   >
//     {myGroups.length > 0 ? (
//       myGroups.map((group) => (
//         <GroupListItem key={group._id} group={group} chatId={chatId} />
//       ))
//     ) : (
//       <Typography textAlign={"center"} padding={"1rem"}>
//         No Groups
//       </Typography>
//     )}
//   </Stack>
// );

// const GroupListItem = memo(({ group, chatId }) => {
//   const { name, avatar, _id } = group;
//   const isSelected=(chatId === _id) 
//   return (
//     <Link
//       to={`?group=${_id}`}
//       onClick={(e) => {
//         if (isSelected) e.preventDefault();
//       }}
      
//     >
//       <Stack direction={"row"} spacing={"rem"}   
//         sx={{
//           padding: "1rem",
//           cursor: "pointer",
//           transition: "0.1s",
//           backgroundColor: isSelected ? "#5f4c4c2f" : "transparent",
//           borderRadius: "0.8rem",
          
//           "&:hover": {
//            transform: "translateY(-5px)",
//   transition: "0.3s ease"
//           },
//         }}
//         >
//         <AvatarCard avatar={avatar} />
//         <Typography>{name}</Typography>
//       </Stack>
//     </Link>
//   );
// });

// export default Groups;





// ===================================================================================================


import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoaders } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack } from "../components/constants/color";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import toast from "react-hot-toast";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
    toast.success("Group name Updated Successfully")
    
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }
    
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  useEffect(() => {
  const groupData = groupDetails.data;

  if (groupData) {
    setGroupName(groupData.chat.name);
    setGroupNameUpdatedValue(groupData.chat.name);
    setMembers(groupData.chat.members || []);
  }
}, [groupDetails.data]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoaders />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>


    
      <Grid
  item
  xs={12}
  sm={8}
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    padding: "1rem 3rem",
  }}
>
  {IconBtns}

  {!chatId ? (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",
      height: "100%",
      width: "50%",
    }}
  >
    <Typography variant="h5" color="gray">
      Select a Group
    </Typography>
  </Box>
  ) : (
    <>
      {GroupName}

      <Typography
        margin={"2rem"}
        alignSelf={"flex-start"}
        variant="body1"
      >
        Members
      </Typography>

      <Stack
        maxWidth={"45rem"}
        width={"100%"}
        boxSizing={"border-box"}
        padding={{
          sm: "1rem",
          xs: "0",
          md: "1rem 4rem",
        }}
        spacing={"2rem"}
        height={"50vh"}
        overflow={"auto"}
      >
        {isLoadingRemoveMember ? (
          <CircularProgress />
        ) : (
          members.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              isAdded
              styling={{
                boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                padding: "1rem 2rem",
                borderRadius: "1rem",
              }}
              handler={removeMemberHandler}
            />
          ))
        )}
      </Stack>

      {ButtonGroup}
    </>
  )}
</Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
      overflow: "auto",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
