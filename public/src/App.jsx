import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomNavbar from "./components/CustomNavbar";

export default function App() {
  const { user } = useContext(AuthContext)
  // console.log("ChatContextProvider", user);

  return (
    <>
      <ChatContextProvider user={user}>
        <CustomNavbar />
        <Container className="text-secondary">
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </>
  );
}
