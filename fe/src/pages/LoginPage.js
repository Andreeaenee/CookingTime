// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:8080/login", { email, password });
      if (response.data.status === "success") {
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
