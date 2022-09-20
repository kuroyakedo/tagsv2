import React, { useState } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const Login = () => {
    const [user, setUser] = useState({
        usuario: "",
        password: ""        
      });
      const [loading, setLoading] = useState(false);
      const handleChange = (e) =>
      setUser({ ...user, [e.target.name]: e.target.value });

      const handleSubmit=(e)=>{
        setLoading(true);
      }
  
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
        <Typography variant="h5" textAlign="center" color="white">
            Log in
          </Typography>
          <CardContent>
    <form onSubmit={handleSubmit}>
    <TextField
              variant="outlined"
              label="User"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="usuario"
              onChange={handleChange}
              value={user.usuario}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              placeholder="Enter username"
            />       
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="password"
              onChange={handleChange}
              value={user.password }
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              placeholder="Enter password"
            />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !user.usuario || !user.password 
              }              
            >
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Log in"
              )}
            </Button>
    </form>
          </CardContent>
    </Grid>

  )
}

export default Login;