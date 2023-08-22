import React from "react";
import CssBaseline from "@mui/material/CssBaseline"
import { ToastContainer } from "react-toastify"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
     <CssBaseline />
     <ToastContainer />
     <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
     </Routes>
    </>
  );
}

export default App;
