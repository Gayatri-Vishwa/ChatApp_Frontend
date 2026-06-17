import { Avatar, Stack, Typography } from "@mui/material";
import { transformImage } from "../../lib/featues";

function MobileProfile({ user }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        p: 2,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 60,
          height: 60,
        }}
      />

      <Stack>
        <Typography color="gray" fontWeight={600}>
          {user?.name}
        </Typography>

        <Typography color="gray" variant="body2">
          {user?.username}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default MobileProfile;