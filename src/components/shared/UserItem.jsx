import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { transformImage } from "../../lib/featues";

function UserItem({
  user,
  handler,
  handlerIsLoading,
  isAdded,
  styling = {},
}) {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction="row"
        alignItems="center"
        spacing="1rem"
        width="100%"
        {...styling}
        sx={{
          borderRadius: 3,
          backgroundColor: "#181A20",
          border: "1px solid rgba(255,255,255,0.08)",
          padding:"0.8rem",

          transition:"all 0.3s ease",

          "&:hover":{
            backgroundColor:"#232533",
            transform:"translateY(-2px)",
          },
        }}
      >

        <Avatar
          src={transformImage(avatar?.url || avatar)}
          sx={{
            width:"45px",
            height:"45px",
          }}
        />


        <Typography
          sx={{
            flexGrow:1,
            color:"#fff",

            display:"-webkit-box",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",

            overflow:"hidden",
            textOverflow:"ellipsis",

            fontWeight:500,
          }}
        >
          {name}
        </Typography>


        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded 
              ? "#E53935" 
              : "#2F80ED",

            color:"#fff",

            "&:hover":{
              bgcolor: isAdded 
                ? "#C62828" 
                : "#5CA9FF",
            },
          }}
        >
          {isAdded 
            ? <RemoveIcon/>
            : <AddIcon/>
          }

        </IconButton>

      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);