

import { Avatar, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/featues";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row">
      <Box
        width="4.5rem"
        height="3rem"
        position="relative"
      >
        {avatar.slice(0, max).map((i, index) => (
          <Avatar
            key={index}
            src={transformImage(i)}
            alt={`Avatar ${index}`}
            sx={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              left: `${index * 0.8}rem`,
              border: "2px solid #232533",
              zIndex: max - index,
              bgcolor: "#333645",
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default AvatarCard;