import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
//30342CB3E4103349EC246836
//30342E120C10529AC688C393
const GuardForm = () => {
  const [codigo, setCodigo] = useState("");
  const [item, setItem] = useState(undefined);
  
  const handleChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = async (event) => {
   
    const res = await fetch("http://localhost:3001/guard/" + codigo);
    const data = await res.json();
    console.log(data);
    if (!data.id) {
      loadItem();
    }
  };
  const loadItem = async () => {
    const res = await fetch("http://localhost:3001/itemsRfid/" + codigo);
    const data = await res.json();
    console.log(data);
    setItem({
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
      rutaimagen:data.rutaimagen
    });
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
            Guard
          </Typography>
          <CardContent>
            <TextField
              label="Codigo"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="codigo"
              value={codigo}
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

            <Typography variant="h5" textAlign="center" color="white">
              {item !== undefined ? <img
                  src={"http://localhost:3001/" + item.rutaimagen}
                  alt="TEST"
                  width="100"
                  height="150"
                ></img> : ""}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuardForm;
