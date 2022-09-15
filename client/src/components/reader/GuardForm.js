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
//30342CB3E4103349EC246836
//30342E120C10529AC688C393
const GuardForm = () => {
  const [codigo, setCodigo] = useState("");
const [item,setItem]=useState({})
//const [robo,setRobo]=useState(false)
  const handleChange = (e) => {
    //setCodigo({ ...codigo, rfid: e.target.value });
    setCodigo( e.target.value );
  };

  const handleSubmit = async (event) => {
    /*const response = await fetch("http://localhost:3001/guard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codigo),
    })*/
    
    /*.then((response) => {
      if(response===undefined) {        
        loadItem(codigo)
        return response.json();
      }
      else return response.json();
    });*/    
    
    /*const res = await fetch("http://localhost:3001/guard/" + codigo);
    const data = await res.json();
    console.log(data.id)
    if(data){
      loadItem()
    }*/
    
    const res = await fetch("http://localhost:3001/itemsRfid/" + codigo);
    event.preventDefault()
    const data = await res.json();
    setItem({
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
    });
    
    
  };
  const loadItem = async () => {
    const res = await fetch("http://localhost:3001/itemsRfid/" + codigo);
    const data = await res.json();
    setItem({
      nombre: data.nombre,
      upc: data.upc,
      costo: data.costo,
      descripcion: data.descripcion,
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
            <form onSubmit={handleSubmit}>
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
              >
                Save
              </Button>
            </form>
            <Typography variant="h5" textAlign="center" color="white">
            {item?`${item.nombre}`:""}
          </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuardForm;
