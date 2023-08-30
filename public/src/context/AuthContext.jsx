import React, { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState(
    {
      username: "",
      password: ""
    });

  // console.log("User", user);
  // console.log("Login", loginInfo);

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user));
  }, [])

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();

    setIsRegisterLoading(true);
    setRegisterError(null)

    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

    if (response.error) {
      return setRegisterError(response);
    }

    setIsRegisterLoading(false);
    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [registerInfo])

  const loginUser = useCallback(async (e) => {
    e.preventDefault();

    setIsLoginLoading(true);
    setLoginError(null)

    const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))

    if (response.error) {
      return setLoginError(response);
    }

    setIsLoginLoading(false);
    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [loginInfo])

  const logOutUser = useCallback((info) => {
    localStorage.removeItem("User")
    setUser(null);
  }, [])

  return (
    <AuthContext.Provider value={{ user, registerInfo, registerUser, updateRegisterInfo, registerError, isRegisterLoading, logOutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading }}>
      {children}
    </AuthContext.Provider>
  );
};