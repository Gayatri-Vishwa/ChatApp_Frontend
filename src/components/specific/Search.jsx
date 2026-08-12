import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../constants/sampleData";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc.js";
import { useLazySearchUserQuery } from "../../redux/api/api.js";
import { useSendFriendRequestMutation } from "../../redux/api/api.js";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../Hooks/hook.jsx";

function Search() {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  // const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const [sendFriendRequest, { isLoading }, isLoadingSendFriendRequest] = useSendFriendRequestMutation();
  const [loadingUserId, setLoadingUserId] = useState(null);

  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  // let isLoadingSendFriendRequest = false;



  //original
  // const addFriendHandler = async (id) => {
  //   try {
  //     setLoadingUserId(id);
  //     const res = await sendFriendRequest({ userId: id })
  //     // toast.success(res.message || "Request sent successfully");
  //     toast.success(res.data.message);
  //   } catch (err) {
  //     // toast.error(err?.data?.message || "Something went wrong");
  //     const msg =
  //       typeof err?.data?.message === "string"
  //         ? err.data.message
  //         : err?.data?.message?.message ||
  //         "Request Already sent";

  //     toast.error(msg);
  //   } finally {
  //     setLoadingUserId(null);
  //   }
  // };


  const addFriendHandler = async (id) => {
    try {
      setLoadingUserId(id);

      const res = await sendFriendRequest({ userId: id }).unwrap();

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === id
            ? { ...user, isRequestSent: true }
            : user
        )
      );

      toast.success(res.message || "Request sent successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Request already sent");
    } finally {
      setLoadingUserId(null);
    }
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };


  //  // //my
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      // console.log("search value", search.value);
      if (search.value?.trim() === "") return setUsers([]);


      searchUser(search.value)
        .then(({ data }) => {
          console.log("search user data", data);
          setUsers(data.users);
        })
        .catch((err) => {
          console.log("search user error", err.response?.data);
        });
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value, searchUser]);



  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      PaperProps={{
        sx: {
          bgcolor: "#232533",
          color: "#fff",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
        }
      }}
    >

      <Stack
        p="2rem"
        direction="column"
        spacing="1.5rem"
        sx={{
          width: {
            xs: "80vw",
            sm: "25rem",
          },
          maxWidth: "25rem",
        }}
      >

        <DialogTitle
          textAlign="center"
          sx={{
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Find People
        </DialogTitle>


        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Search user..."

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "rgba(255,255,255,0.6)"
                  }}
                />
              </InputAdornment>
            )
          }}

          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.3)"
              },

              "&:hover fieldset": {
                borderColor: "#2F80ED"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#5CA9FF"
              }
            },

            "& input::placeholder": {
              color: "rgba(255,255,255,0.5)"
            }
          }}
        />


        <List
          sx={{
            maxHeight: "350px",
            overflowY: "auto",
          }}
        >

          {users.length > 0 ? (
            users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                isAdded={
                  i.isFriend ||
                  i.isRequestSent ||
                  i.isRequestReceived
                }
                handler={addFriendHandler}
                handlerIsLoading={loadingUserId === i._id}
              />
              // <UserItem

              //   user={i}
              //   key={i._id}
              //   handler={addFriendHandler}
              //   handlerIsLoading={loadingUserId===i._id}
              // />
            ))
          ) : (

            search.value.trim() !== "" && (

              <ListItem>
                <ListItemText
                  primary="User not found"
                  sx={{
                    textAlign: "center",

                    "& .MuiListItemText-primary": {
                      color: "rgba(255,255,255,0.6)"
                    }
                  }}
                />
              </ListItem>

            )
          )}

        </List>

      </Stack>

    </Dialog>
  );

  //   return (
  //     <Dialog open={isSearch} onClose={searchCloseHandler}>
  //       <Stack p={"2rem"} direction={"column"}   sx={{
  //     width: {
  //       xs: "80vw",
  //       sm: "25rem",
  //     },
  //     maxWidth: "25rem",
  //   }}>
  //         <DialogTitle textAlign={"center"}>Find People</DialogTitle>
  //         <TextField
  //           label=""
  //           value={search.value}
  //           onChange={search.changeHandler}
  //           variant="outlined"
  //           size="small"
  //           InputProps={{
  //             startAdornment: (
  //               <InputAdornment position="start">
  //                 <SearchIcon />
  //               </InputAdornment>
  //             ),
  //           }}
  //         />


  //         <List>
  //   {users.length > 0 ? (
  //     users.map((i) => (
  //       <UserItem
  //         user={i}
  //         key={i._id}
  //         handler={addFriendHandler}
  //         // handlerIsLoading={isLoading}
  //      handlerIsLoading={loadingUserId === i._id}
  //       />
  //     ))
  //   ) : (
  //     search.value.trim() !== "" && (
  //       <ListItem>
  //         <ListItemText
  //           primary="User not found"
  //           sx={{ textAlign: "center", color: "gray" }}
  //         />
  //       </ListItem>
  //     )
  //   )}
  // </List>
  //       </Stack>
  //     </Dialog>
  //   );
}

export default Search;
