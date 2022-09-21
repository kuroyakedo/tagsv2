import { useEffect, useState ,useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import {  Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";

export default function ButtonAppBar() {
const [navbarUserIsLogged,setnavbarUserIsLogged]=useState(false);
const [enlaces,setEnlaces]=useState([])
const {user} = useContext(AccountContext);
useEffect(() => {
  (async () => {    
    if (user.id){setnavbarUserIsLogged(true); loadLinks(user.rol);}
  })();
}, [navbarUserIsLogged]);
const loadLinks = async (id) => {
  const response = await fetch("http://localhost:3001/links/"+id);
  const data = await response.json();
  setEnlaces(data);
};
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                READER
              </Link>         
              <Link to="/cashier" style={{ textDecoration: "none", color: "#eee" }}>
                READER
              </Link>         
              {enlaces.map((e) => (
                <Link to={e.enlace} style={{ textDecoration: "none", color: "#eee" }}>
                {e.nombre}
              </Link> 
              ))}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
