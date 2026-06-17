import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ManageAccounts as ManageAccountsManagement,
  Group as GroupIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
// import { Link } from "../styles/StyledComponents";
import { grayColor, matBlack } from "../constants/Color";
function AdminLayout({ children }) {
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  const Link = styled(LinkComponent)`
    text-decoration: "none";
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
      color: rgba(0, 0, 0, 0.54);
    }
  `;

  const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "User",
      path: "/admin/user",
      icon: <ManageAccountsManagement />,
    },
    {
      name: "Chat",
      path: "/admin/chat",
      icon: <GroupIcon />,
    },
    {
      name: "Message",
      path: "/admin/message",
      icon: <MessageIcon />,
    },
  ];
  const logoutHandler = () => {};

  const handleMobile = () => setIsMobile(true);

  const handleClose = () => setIsMobile(false);

  const Sidebar = ({ w = "100%" }) => {
    return (
      <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
        <Typography variant="h5" textTransform={"uppercase"}>
          chattu
        </Typography>
        <Stack spacing={"1rem"}>
          {adminTabs.map((i) => (
            <Link
              key={i.path}
              to={i.path}
              sx={
                location.pathname === i.path && {
                  bgcolor: matBlack,
                  color: "white",
                  ":hover": {
                    color: "white",
                  },
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {i.icon}
                <Typography >{i.name}</Typography>
              </Stack>
            </Link>
          ))}

          <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToAppIcon />
              <Typography>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    );
  };
  const isAdmin=true

  if(!isAdmin) return <Navigate to={'/admin'}/>

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          position: "fixed",
          right: "1rem",
          top: "1rem",
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid
        size={{ md: 4, lg: 3 }}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar width="50vw" />
      </Grid>

      <Grid
        size={{ md: 8, lg: 9, xs: 12 }}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar width={"50vw"} />
      </Drawer>
    </Grid>
  );
}

export default AdminLayout;
