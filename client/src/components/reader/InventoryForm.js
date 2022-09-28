import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Container from "../../containers/Container";

const InventoryForm = () => {
  const [codigo, setCodigo] = useState({
    rfid: "",
  });
  const [items, setItems] = useState([]);
  const handleChange = (e) => {
    setCodigo({ ...codigo, rfid: e.target.value });
  };
  const handleSubmit = async (event) => {
    const response = await fetch("http://localhost:3001/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codigo),
    });
    const data = await response.json();
    const nuevoItem = {
      id: data.idcatalogo,
      nombre: data.nombre,
      upc: data.upc,
      total: data.total,
      costo: data.costo,
      descripcion: data.descripcion,
      rutaimagen: data.rutaimagen,
    };
    setItems((items) => [...items, nuevoItem]);
    setCodigo({ ...codigo, rfid: "" });
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
              backgroundColor: "#1E272E",
              padding: "1rem",
            }}
          >
            <Typography variant="h5" textAlign="center" color="white">
              Inventory
            </Typography>
            <CardContent>
              <TextField
                label="Codigo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="codigo"
                value={codigo.rfid}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!codigo}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Imagen</th>
              <th>Descripcion</th>
              <th>Costo</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={uuidv4()}>
                <td>{i.nombre}</td>
                <td>
                  <img
                    src={"http://localhost:3001/" + i.rutaimagen}
                    alt="TEST"
                    width="100"
                    height="150"
                  ></img>
                </td>
                <td>{i.descripcion}</td>
                <td>{i.costo}</td>
                <td>{i.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Container>
  );
};

export default InventoryForm;
