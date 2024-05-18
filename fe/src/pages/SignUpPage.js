// src/pages/SignUpPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { handleSignUp } from "../api/Users"; // Import the handleSignUp function

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginButtonStyle = {
    backgroundColor: "#f0f0f0", // Fundal gri deschis
    color: "#ff4081", // Roz vibrant
    fontWeight: "bold",
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    width: "100%", // Se asigură că butonul ocupă întreaga lățime
  };

  const loginButtonHoverStyle = {
    backgroundColor: "#ff4081", // Fundal roz vibrant
    color: "#ffffff", // Text alb
  };

  const handleSignUpWrapper = async (e) => {
    e.preventDefault();
    await handleSignUp(firstName, lastName, email, password, setOpenSuccess, setOpenError, setErrorMessage, navigate);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Sign Up
          </Typography>
          <form onSubmit={handleSignUpWrapper}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            color="secondary"
            fullWidth
            style={loginButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = loginButtonHoverStyle.backgroundColor;
              e.target.style.color = loginButtonHoverStyle.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = loginButtonStyle.backgroundColor;
              e.target.style.color = loginButtonStyle.color;
            }}
          >
            Already have an account? Login
          </Button>
        </CardContent>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          User created successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUpPage;
