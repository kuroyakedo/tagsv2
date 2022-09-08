import React, { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const InventoryForm = () => {
  const [rfid, setRfid] = useState();

  const handleChange = async (e) => {
    setRfid(e.target.value);
    /*const result = await fetch(
      `https://rfidcoder.gs1.org/api/tag/epc/${rfid}?apikey=${process.env.API_KEY}/`
    );*/
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
                variant="filled"
                label="rfid"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="rfid"
                onChange={handleChange}
                value={rfid}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!rfid}
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
