
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";


function AdminLogin() {
const isAdmin=true

const secretKey=useInputValidation("")

const submitHandler=(e)=>{
    e.preventDefault()
    console.log("submit handler admin form");
    
}
if(isAdmin) return<Navigate to={"/admin/dashboard"}/>

  return (
      <div
      style={{
        // backgroundImage:bgGradient,
      
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "2rem 0", // 👈 space for scroll
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(10px)",
          }}
        >
         
         
              <Typography variant="h5" textAlign={"center"} m="1rem" color="primary">
                Login Form
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
                onSubmit={submitHandler}
              >
           

                <TextField
                  required
                  fullWidth
                  label="Secret key"
                  type="password"
                  margin="normal"
                  varient="outlined"
                  value={secretKey.value}
                  onChange={secretKey.changeHandler}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {" "}
                  Login{" "}
                </Button>

            
              </form>
          
         
        </Paper>
      </Container>
    </div>
  )
}

export default AdminLogin
