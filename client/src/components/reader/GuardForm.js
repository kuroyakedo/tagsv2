import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import Container from "../../containers/Container";

const GuardForm = () => {
  const [codigo, setCodigo] = useState("");
  const [item, setItem] = useState(undefined);

  const handleSubmit = async (event) => {
    setCodigo(event.target.value);
    const res = await fetch(
      "http://localhost:3001/guard/" + event.target.value
    );
    const data = await res.json();
    if (data.id === 0) {
      loadItem(data.upc);
    } else {
      setCodigo("");
      setItem(undefined);
    }
  };
  const loadItem = async (upc) => {
    const res = await fetch("http://localhost:3001/itemsRfid/" + upc);
    const data = await res.json();
    console.log(data);
    setItem({
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
      rutaimagen: data.rutaimagen,
    });
    setCodigo("");
  };
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
              Guard
            </Typography>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Codigo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="codigo"
                value={codigo}
                onChange={handleSubmit}
              />
              <div>
                {item !== undefined ? (
                  <img
                    src={"http://localhost:3001/" + item.rutaimagen}
                    alt="TEST"
                    width="auto"
                    height="500"
                  ></img>
                ) : (
                  ""
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GuardForm;
