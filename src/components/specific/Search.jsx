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
  const [sendFriendRequest, { isLoading },isLoadingSendFriendRequest] = useSendFriendRequestMutation();

  const dispatch = useDispatch();
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  // let isLoadingSendFriendRequest = false;

  const addFriendHandler = async (id) => {
   const res= await sendFriendRequest("Sending friend request ...",{ userId:id})
      toast.success(res.message || "Request sent successfully");

  };


//   const addFriendHandler = async (id) => {
//   try {
//     const res = await sendFriendRequest({ userId: id }).unwrap();
//     toast.success(res.message || "Request sent successfully");
//   } catch (err) {
//     toast.error(err?.data?.message || "Something went wrong");
//   }
// };

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
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"}   sx={{
    width: {
      xs: "80vw",
      sm: "25rem",
    },
    maxWidth: "25rem",
  }}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      

        <List>
  {users.length > 0 ? (
    users.map((i) => (
      <UserItem
        user={i}
        key={i._id}
        handler={addFriendHandler}
        handlerIsLoading={isLoading}
        // handlerIsLoading={isLoadingSendFriendRequest}
      />
    ))
  ) : (
    search.value.trim() !== "" && (
      <ListItem>
        <ListItemText
          primary="User not found"
          sx={{ textAlign: "center", color: "gray" }}
        />
      </ListItem>
    )
  )}
</List>
      </Stack>
    </Dialog>
  );
}

export default Search;
