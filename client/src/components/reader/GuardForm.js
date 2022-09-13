import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
 
} from "@mui/material";
//30342CB3E4103349EC246836
//30342E120C10529AC688C393
const GuardForm = () => {
  const [codigo, setCodigo] = useState({
    rfid: "",
  });
  
  const handleChange = (e) => {
    setCodigo({ ...codigo, rfid: e.target.value });
  };

  const handleSubmit = async (event) => {
    const response = await fetch("http://localhost:3001/guard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codigo),
    });
       await response.json();  
    /*if (response) {
      navigate("/ErrorGuard"); 
    } */
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
            Guard
            
          </Typography>
          <CardContent>
            <form >
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
              
            </form>   
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!codigo}   
                onSubmit={handleSubmit}             
              >
                Save
              </Button>         
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuardForm;
