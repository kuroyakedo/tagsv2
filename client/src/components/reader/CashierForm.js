import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Container from "../../containers/Container";

const CashierForm = () => {
  const [items, setItems] = useState([]);
  const [codigo, setCodigo] = useState({
    rfid: "",
  });
  /*const handleChange = (e) => {
    setCodigo({ ...codigo, rfid: e.target.value });
  };*/
  const handleSubmit = async (event) => {
    const response = await fetch("http://localhost:3001/cashier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...codigo, rfid: event.target.value }),
    });
    const data = await response.json();
    const nuevoItem = {
      id: data.idcatalogo,
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
      rutaimagen: data.rutaimagen,
    };
    setItems((items) => [nuevoItem, ...items]);
    setCodigo({ ...codigo, rfid: "" });
  };
  //GS1.GTIN ES EL UPC
  return (
    <Container>
      <Grid alignItems="center" direction="column" justifyContent="center">
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5 }}
            style={{
              padding: "1rem",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Cashier
            </Typography>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <TextField
                  autoFocus={true}
                  label="Codigo"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  name="codigo"
                  value={codigo.rfid}
                  onChange={handleSubmit}
                />
              </div>

              <div className="tabla">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Imagen</TableCell>
                      <TableCell>Descripcion</TableCell>
                      <TableCell>Costo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((i) => (
                      <TableRow
                        key={uuidv4()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{i.nombre}</TableCell>
                        <TableCell>
                          <img
                            src={"http://localhost:3001/" + i.rutaimagen}
                            alt="TEST"
                            width="auto"
                            height="100"
                          ></img>
                        </TableCell>
                        <TableCell>{i.descripcion}</TableCell>
                        <TableCell>{i.costo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CashierForm;
