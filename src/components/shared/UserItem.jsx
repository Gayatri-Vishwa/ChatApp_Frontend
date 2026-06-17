import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import {Add as AddIcon,Remove as RemoveIcon} from '@mui/icons-material'
import { transformImage } from '../../lib/featues'

function UserItem({user,handler,handlerIsLoading,isAdded,styling={}}) {
    const {name,_id,avatar}=user
  return <ListItem 
  
  >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} {...styling}    sx={{
      // p: 2,
      borderRadius: 3,
      backgroundColor: "white",
      border: "1px solid #eee",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        transform: "translateY(-4px)",
      },
    }}>
        {/* <Avatar src={transformImage(avatar)} /> */}
        <Avatar src={transformImage(avatar?.url || avatar)} />
        <Typography
        sx={{
            flexGrow:1,
            display:"-webkit-box",
            // WebkitAlignContentebkitLineClamp:1,
            WebkitLineClamp: 1,
            WebkitBoxOrient:"vertical",
            overflow:"hidden",
            width:"100%",
            textOverflow:"ellipsis"
        }}
        >{name}</Typography>
        <IconButton 
        size='small'
        sx={{
            bgcolor:isAdded?"error.main":"primary.main",
            color:"white",
            "&:hover":{
              bgcolor:isAdded?"error.dark":"primary.main",
            }
        }}
        onClick={()=>handler(_id)} disabled={handlerIsLoading}>
           {isAdded?<RemoveIcon/>: <AddIcon />}
        </IconButton>
    </Stack>
  </ListItem>
}

export default memo(UserItem)
