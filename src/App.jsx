import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Groups = lazy(() => import("./pages/Groups"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
import { Toaster } from "react-hot-toast";

import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { server } from "./components/constants/config";
import { userNotExists,userExists } from "../src/redux/reducers/auth";
import { SocketProvider } from "./utils/socket.jsx";

// let user = false;



function App() {
  const dispatch = useDispatch();
const {user,loader}=useSelector((state)=>state.auth)
 

//   useEffect(() => {
//   axios
//     .get(`${server}/api/v1/user/me`)
//     .then((res) =>   dispatch(userExists(res.data.user)))
//     .catch((err) => {
//       console.log("error",err.response?.data);
//       dispatch(userNotExists());
      
//     });
// }, [dispatch]);


useEffect(() => {
  axios
    .get(`${server}/api/v1/user/me`, {
      withCredentials: true,
    })
    // .then((res) => dispatch(userExists(res.user)))
    .then((res) => dispatch(userExists(res.data.data)))
    .catch(() => dispatch(userNotExists()));
}, [dispatch]);
  
  return loader? <LayoutLoaders /> : (
    <>
      <BrowserRouter> 
        <Suspense fallback={<LayoutLoaders />}>
          <Routes>
            <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>
              <Route path="/" element={<Home />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/chat/:chatId" element={<Chat />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectRoute user={!user} redirect="/">
                  <Login />
                </ProtectRoute>
              }
            />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/user" element={<UserManagement />} />
            <Route path="/admin/message" element={<MessageManagement />} />
            <Route path="/admin/chat" element={<ChatManagement />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
