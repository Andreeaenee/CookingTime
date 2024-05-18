// src/pages/LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { handleLogin } from "../api/Users"; // Import the handleLogin function as named export
import Wrapper from "../components/Wrapper"; // Import the Wrapper component

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signUpButtonStyle = {
    backgroundColor: "#f0f0f0", // Fundal gri deschis
    color: "#ff4081", // Roz vibrant
    fontWeight: "bold",
    marginTop: "20px",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    width: "100%", // Se asigură că butonul ocupă întreaga lățime
  };

  const signUpButtonHoverStyle = {
    backgroundColor: "#ff4081", // Fundal roz vibrant
    color: "#ffffff", // Text alb
  };

  const handleLoginWrapper = async (e) => {
    e.preventDefault();
    await handleLogin(email, password, setOpenError, setErrorMessage, navigate);
  };
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Login
            </Typography>
            <form onSubmit={handleLoginWrapper}>
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
                Login
              </Button>
            </form>
            <Button
              onClick={() => navigate("/signup")}
              variant="text"
              color="secondary"
              fullWidth
              style={signUpButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = signUpButtonHoverStyle.backgroundColor;
                e.target.style.color = signUpButtonHoverStyle.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = signUpButtonStyle.backgroundColor;
                e.target.style.color = signUpButtonStyle.color;
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </CardContent>
        </Card>
        <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
          <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
