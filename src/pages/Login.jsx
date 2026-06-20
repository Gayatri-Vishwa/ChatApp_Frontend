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
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import usernameValidator from "../utils/validators";
// import passwordValidator from "../utils/passwordValidator";
import { bgGradient } from "../components/constants/Color";
import axios from "axios";
import { server } from "../components/constants/config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const {user}=useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleLogin = () => {
    // setIsLogin(!isLogin);
    setIsLogin((prev) => !prev);
  };

  //without use state management
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  // const avatar = useFileHandler("single");
  const avatar = useFileHandler("single", {
    accept: "image/png, image/jpeg, image/jpg",
    maxSize: 1024 * 1024,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading In....");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config,
      );
      dispatch(userExists(data.data));
      navigate("/");
      toast.success(data.message, { id: toastId });
    } catch (err) {
      // toast.error(error.response?.data?.message || "Login failed",{id:toastId});
     const msg =
    typeof err?.response?.data?.message === "string"
      ? err.response.data.message
      : err?.response?.data?.message?.message || "Login Failed";

  toast.error(msg,{id:toastId});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // // Perform signup logic here
    const toastId = toast.loading("Signing In...");
    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("name", name.value);
    formData.append("password", password.value);
    formData.append("avatar", avatar.file);
    formData.append("bio", bio.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config,
      );
      // dispatch(userExists(true));
      dispatch(userExists(data.data));
      navigate("/");
      toast.success(data.message, { id: toastId });
    } catch (err) {
      console.log(err);
      // toast.error(error.response?.data?.message || "Signup failed",{id:toastId});
      const msg =
    typeof err?.response?.data?.message === "string"
      ? err.response.data.message
      : err?.response?.data?.message?.message || "SignUp Failed";

  toast.error(msg,{id:toastId});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,

        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 0", // space for scroll
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
          {isLogin ? (
            <>
              <Typography
                variant="h5"
                textAlign={"center"}
                m="1rem"
                color="primary"
              >
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
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {" "}
                  Login{" "}
                </Button>

                <Typography> OR</Typography>

                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  {" "}
                  Sign Up instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                textAlign={"center"}
                m="1rem"
                color="primary"
              >
                Sign Up Form
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
                onSubmit={handleSignup}
              >
                <Stack alignItems="center">
                  <Stack position="relative" width="10rem">
                    <Avatar
                      sx={{ width: "10rem", height: "10rem" }}
                      src={avatar.preview}
                    />

                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "white",
                        bgcolor: "rgba(0,0,0,0.5)",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                      component="label"
                    >
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={avatar.changeHandler}
                      />
                    </IconButton>
                  </Stack>

                  {avatar.error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {avatar.error}
                    </Typography>
                  )}
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Name"
                  // margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  // margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  // margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="body2">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  // margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="body2">
                    {password.error}
                  </Typography>
                )}

                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {" "}
                  Sign Up{" "}
                </Button>

                <Typography> OR</Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Login instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
