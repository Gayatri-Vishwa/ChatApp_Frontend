import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import Box from "@mui/material/Grid";
import AppBar from '@mui/material/AppBar';
import { grayColor, orange } from '../components/constants/Color';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




const Home=()=> {
  return<Box bgcolor={grayColor} height={"100%"}>
     <Typography p={"2rem"} variant='h5' textAlign={"center"}>
    Select a friend to chat 
  </Typography>
  </Box>
};

export default AppLayout()(Home);