import React, { useEffect, useState } from "react";
//import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom";

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
  const [user, setUser] = useState({
    usuario: "",
    nombre: "",
    role: "1",
    password: "",
  });
  const [localValue, setLocalValue] = useState("");
  const handleChangeSelect = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setUser({
      ...user,
      role: e.target.value,
    });
    console.log(user);
  };
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  /*const options = [
    { value: "1", label: "Manager" },
    { value: "2", label: "Inventory" },
    { value: "3", label: "Cashier" },
    { value: "4", label: "Guard" },
  ];*/
  const navigate = useNavigate();
  const params = useParams();

  const loadUser = async (id) => {
    const res = await fetch("http://localhost:3001/users/" + id);
    const data = await res.json();
    setUser({
      usuario: data.usuario,
      nombre: data.nombre,
      role: data.role,
      password: data.password,
    });
    console.log(data);
    setEditing(true);
    setLocalValue(user.role);
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
            body: JSON.stringify(user),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
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
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
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
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
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
                value={user.usuario}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
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
                value={user.nombre}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <FormControl
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                  color: "white",
                }}
              >
                <InputLabel
                  id="test-select-label"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                    color: "white",
                  }}
                >
                  Role
                </InputLabel>
                <Select
                  name="Role"
                  label="Role"
                  value={localValue}
                  onChange={handleChangeSelect}
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                    color: "white",
                  }}
                  SelectProps={{
                    renderValue: (value) => localValue,
                  }}
                >
                  <MenuItem key={"1"} value={"1"}>
                    Manager
                  </MenuItem>
                  <MenuItem key={"2"} value={"2"}>
                    Inventory
                  </MenuItem>
                  <MenuItem key={"3"} value={"3"}>
                    Cashier
                  </MenuItem>
                  <MenuItem key={"4"} value={"4"}>
                    Guard
                  </MenuItem>
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
                value={user.password}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  !user.usuario || !user.nombre || !user.role || !user.password
                }
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
  );
};

export default UserForm;
