import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { registerRoute } from "../utils/services"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

export default function Register() {
  const { registerInfo, registerUser, updateRegisterInfo, registerError, isRegisterLoading } = useContext(AuthContext)

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "20%"
        }}>

          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control name="username" type="username" placeholder="Username" onChange={(e) => updateRegisterInfo({ username: e.target.value })}></Form.Control>
              <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ password: e.target.value })}></Form.Control>
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Creating your account" : "Register"}
              </Button>
              {
                registerError?.error && (<Alert variant="danger"><p>{registerError?.message}</p></Alert>)
              }
            </Stack>
          </Col>
        </Row>
      </Form>

    </>
  );
}

