import React from "react";
import CssBaseline from "@mui/material/CssBaseline"
import { ToastContainer } from "react-toastify"
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./pages/Navbar";


function App() {
  const location = useLocation();
  return (
    <>
     <CssBaseline />
     <ToastContainer />
     {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
     <Routes>
      <Route path="/" element={ <Navigate to="/post" /> } />
      <Route path="/post" element={ <Home /> } />
      <Route path="/post/addPost" element={ <AddPost /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
     </Routes>
    </>
  );
}

export default App;
