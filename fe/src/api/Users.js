import axios from 'axios';

export const handleSignUp = async (firstName, lastName, email, password, setOpenSuccess, setOpenError, setErrorMessage, navigate) => {
  try {
    const response = await axios.post("http://localhost:8080/users", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (response.data.message === "User added successfully") {
      setOpenSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } else {
      setErrorMessage(response.data.message);
      setOpenError(true);
    }
  } catch (error) {
    setErrorMessage(error.response ? error.response.data.message : error.message);
    setOpenError(true);
  }
};

export const handleLogin = async (email, password, setOpenError, setErrorMessage, navigate) => {
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


