import React, { useEffect, useState } from "react";
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
} from "@mui/material";

const ItemForm = () => {
  const [item, setItem] = useState({
    nombre: "",
    upc: "",
    costo: 0,
    descripcion: "",
    rutaimagen: "",
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
      rutaimagen: data.rutaimagen,
    });
    setEditing(true);
  };

  const handleSubmit = async (event) => {
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
        const data = await response.json();
        sendHandler(data.id);
      } else {
        const response = await fetch("http://localhost:3001/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const data = await response.json();
        sendHandler(data.id);
      }
      setLoading(false);
      navigate("/items");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  /*************************************************************************** */
  /*************************************************************************** */
  const [file, setFile] = useState(null);

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = (id) => {
    if (file) {
      const formdata = new FormData();
      formdata.append("image", file);
      //formdata.append('id', id)
      console.log(file);
      fetch("http://localhost:3001/itemImage/" + id, {
        method: "PUT",
        body: formdata,
      })
        .then((res) => res.text())
        .then((res) => console.log(res))
        .catch((err) => {
          console.error(err);
        });
      document.getElementById("fileinput").value = null;
      setFile(null);
    }
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
              padding: "1rem",
            }}
          >
            <Typography variant="h5" textAlign="center">
              {editing ? "Update Item" : "Create Item"}
            </Typography>
            <CardContent>
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
              />

              <div>
                {" "}
                <img
                  src={"http://localhost:3001/" + item.rutaimagen}
                  alt="TEST"
                  width="auto"
                  height="220"
                />
              </div>

              <div>
                <input
                  id="fileinput"
                  onChange={selectedHandler}
                  className="form-control"
                  type="file"
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  !item.nombre || !item.upc || !item.costo || !item.descripcion
                }
                onClick={handleSubmit}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ItemForm;
