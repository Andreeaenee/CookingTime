// src/api/postUserLogin.js

import axios from "axios";

const handleLogin = async (email, password, setOpenError, setErrorMessage, navigate) => {
  try {
    const response = await axios.post("http://localhost:8080/login", {
      email,
      password,
    });
    console.log(response.data); // Log server response
    if (response.data.status === "success") {
      navigate("/");
    } else {
      setErrorMessage(response.data.message);
      setOpenError(true);
    }
  } catch (error) {
    console.error("Login error:", error); // Log error
    setErrorMessage(error.response && error.response.data ? error.response.data.message : error.message);
    setOpenError(true);
  }
};

export default handleLogin;
