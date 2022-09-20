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
    console.log(data);
    if (data.id) {
      setUser({ ...data });
      navigate("/items");
    }
    /*if (data) {
      //navigate("/items");
      console.log(data);
    } else {
      setUser({ usuario: "", password: "" });
    }*/
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
