import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const ItemForm = () => {
  const [item, setItem] = useState({
    nombre: "",
    upc: "",
    costo: 0,
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadItem(params.id);
    }
  }, [params.id]);

  const loadItem = async (id) => {
    const res = await fetch("http://localhost:3001/items/" + id);
    const data = await res.json();
    setItem({
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
    });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:3001/items/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:3001/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        await response.json();
      }
      setLoading(false);
      navigate("/items");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

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
            {editing ? "Update Item" : "Create Item"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Name"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="nombre"
                onChange={handleChange}
                value={item.nombre}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                label="UPC"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="upc"
                onChange={handleChange}
                value={item.upc}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                label="Cost"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                type="number"
                name="costo"
                onChange={handleChange}
                value={item.costo}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="outlined"
                label="Description"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="descripcion"
                onChange={handleChange}
                value={item.descripcion}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  !item.nombre || !item.upc || !item.costo || !item.descripcion
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

export default ItemForm;
