import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

export default function Login() {
  const { loginInfo, loginUser, updateLoginInfo, loginError, isLoginLoading } = useContext(AuthContext)

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "20%"
        }}>

          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control type="text" placeholder="Username" onChange={(e) => updateLoginInfo({ username: e.target.value })}></Form.Control>
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ password: e.target.value })}></Form.Control>
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Getting you in..." : "Login"}
              </Button>
              {
                loginError?.error && (<Alert variant="danger"><p>{loginError?.message}</p></Alert>)
              }
            </Stack>  
          </Col>
        </Row>
      </Form>

    </>
  );
}

