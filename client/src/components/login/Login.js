import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AccountContext } from "../AccountContext";

const Login = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    usuario: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    const data = await response.json();
    setLoading(false);
    if (data.id) {
      setUser({
        ...data,
        id: data.id,
        username: data.username,
        name: data.name,
        role: data.role,
        loggedIn: true,
        status: "Logged in",
      });
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);

      if (data.rol === 1) navigate("/users");
      if (data.rol === 2) navigate("/inventory");
      if (data.rol === 3) navigate("/cashier");
      if (data.rol === 4) navigate("/guard");
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Typography variant="h5" textAlign="center" color="white">
        Log in
      </Typography>
      <CardContent>
        <form>
          <TextField
            variant="outlined"
            label="User"
            sx={{
              display: "block",
              margin: ".5rem 0",
            }}
            name="usuario"
            onChange={handleChange}
            value={usuario.usuario}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            placeholder="Enter username"
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            sx={{
              display: "block",
              margin: ".5rem 0",
            }}
            name="password"
            onChange={handleChange}
            value={usuario.password}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            placeholder="Enter password"
          />
        </form>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!usuario.usuario || !usuario.password}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="inherit" size={25} /> : "Log in"}
        </Button>
      </CardContent>
    </Grid>
  );
};

export default Login;
