import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        height: "100%",
        background: "#161925",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "rgba(255,255,255,0.7)",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        Select a friend to chat 💬
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Start a conversation and connect with your friends
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);