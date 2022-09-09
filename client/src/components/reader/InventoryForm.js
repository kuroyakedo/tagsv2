import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
//30342CB3E4103349EC246836
//30342E120C10529AC688C393
const InventoryForm = () => {
  const [codigo, setCodigo] = useState();
  const handleChange = (e) => {
    setCodigo(e.target.value);
  };
  const handleSubmit = async (e) => {
    /*const result = await fetch(
      `https://rfidcoder.gs1.org/api/tag/epc/${rfid}?apikey=${process.env.API_KEY}/`
    );*/
    const response = await fetch("http://localhost:3001/inventory/" + codigo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codigo),
    });
    await response.json();
  };
  //GS1.GTIN ES EL UPC
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
            Inventory
          </Typography>
          <CardContent>
            <form>
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
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InventoryForm;
