import { Avatar, Stack, Typography, Paper } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/featues";

function Profile({ user }) {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      sx={{
        width: "100%",
       
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 180,
          height: 180,
          border: "5px solid #2F80ED",
          boxShadow: "0 0 25px rgba(47,128,237,0.5)",
        }}
      />

      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: 700,
        }}
      >
        {user?.name}
      </Typography>


      <Stack
        spacing="1.5rem"
        sx={{
          width:"90%",
          background:"rgba(255,255,255,0.05)",
          padding:"1.5rem",
          borderRadius:"20px",
          border:"1px solid rgba(255,255,255,0.1)",
          backdropFilter:"blur(10px)"
        }}
      >
        <ProfileCard
          heading="Bio"
          text={user?.bio}
        />

        <ProfileCard
          heading="Username"
          text={user?.username}
          Icon={UserNameIcon}
        />

        <ProfileCard
          heading="Name"
          text={user?.name}
          Icon={FaceIcon}
        />

        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).fromNow()}
          Icon={CalendarIcon}
        />
      </Stack>

    </Stack>
  );
}


const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing="1rem"
    sx={{
      color:"white",
    }}
  >

    {Icon && (
      <Icon
        sx={{
          color:"#5CA9FF",
          fontSize:"2rem"
        }}
      />
    )}

    <Stack>
      <Typography
        sx={{
          fontWeight:600,
          wordBreak:"break-word"
        }}
      >
        {text || "Not available"}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color:"rgba(255,255,255,0.5)"
        }}
      >
        {heading}
      </Typography>
    </Stack>

  </Stack>
);


export default Profile;