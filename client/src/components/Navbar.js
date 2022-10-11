import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const logout = useLogout();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ textDecoration: "none", backgroundColor: "#2c4f8f" }}
      >
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              RFID Inventory
            </Typography>
            {auth.role === 1 ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/users"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Users
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {auth.role === 1 || auth.role === 2 ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/items"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Items
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {auth.role === 1 || auth.role === 2 ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/inventory"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Inventory
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {auth.role === 1 || auth.role === 3 ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/cashier"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Cashier
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {auth.role === 1 || auth.role === 4 ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/guard"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Guards
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {auth ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to=""
                  onClick={handleClick}
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Log Out
                </Link>
              </Typography>
            ) : (
              ""
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
