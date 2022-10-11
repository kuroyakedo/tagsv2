import React, { useEffect, useState } from "react";
//import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../containers/Container";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const UserForm = () => {
  const [usuario, setUsuario] = useState({
    usuario: "",
    nombre: "",
    role: 1,
    password: "",
  });
  const [localValue, setLocalValue] = useState(0);
  const handleChangeSelect = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setUsuario({
      ...usuario,
      role: e.target.value,
    });
    console.log(usuario);
  };
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const loadUser = async (id) => {
    const res = await fetch("http://localhost:3001/users/" + id);
    const data = await res.json();
    setUsuario({
      usuario: data.usuario,
      nombre: data.nombre,
      role: data.role,
      password: data.password,
    });
    setEditing(true);
    setLocalValue(data.role);
  };
  useEffect(() => {
    if (params.id) {
      loadUser(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:3001/users/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        });
        await response.json();
      }
      setLoading(false);
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    console.log(usuario);
  };

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5 }}
            style={{
              backgroundColor: "",
              padding: "1rem",
            }}
          >
            <Typography variant="h5" textAlign="center">
              {editing ? "Update User" : "Create User"}
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="filled"
                  label="Username"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="usuario"
                  onChange={handleChange}
                  value={usuario.usuario}
                />
                <TextField
                  variant="outlined"
                  label="Name"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="nombre"
                  onChange={handleChange}
                  value={usuario.nombre}
                />
                <FormControl
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                >
                  <InputLabel
                    id="test-select-label"
                    sx={{
                      display: "block",
                      margin: ".5rem 0",
                    }}
                  >
                    Role
                  </InputLabel>
                  <Select
                    name="Role"
                    label="Role"
                    value={localValue}
                    defaultValue={localValue}
                    onChange={handleChangeSelect}
                    sx={{
                      display: "block",
                      margin: ".5rem 0",
                    }}
                  >
                    <MenuItem value={1}>Manager</MenuItem>
                    <MenuItem value={2}>Inventory</MenuItem>
                    <MenuItem value={3}>Cashier</MenuItem>
                    <MenuItem value={4}>Guard</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  label="Password"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={usuario.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    !usuario.usuario ||
                    !usuario.nombre ||
                    !usuario.role ||
                    !usuario.password
                  }
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserForm;
