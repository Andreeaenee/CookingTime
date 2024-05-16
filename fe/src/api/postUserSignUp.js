import axios from "axios";

const handleSignUp = async (firstName, lastName, email, password, setOpenSuccess, setOpenError, setErrorMessage, navigate) => {
  try {
    const response = await axios.post("http://localhost:8080/user/", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    if (response.data.message === "User added successfully") {
      setOpenSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect după 2 secunde
    } else {
      setErrorMessage(response.data.message);
      setOpenError(true);
    }
  } catch (error) {
    setErrorMessage(error.response ? error.response.data.message : error.message);
    setOpenError(true);
  }
};

export default handleSignUp;
