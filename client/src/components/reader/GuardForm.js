import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Dialog,
  ListItem,
  List,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
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
  const [open, setOpen] = React.useState(false);

  /*const handleClickOpen = () => {
    setOpen(true);
  };*/

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    /*const result = await fetch(
      `https://rfidcoder.gs1.org/api/tag/epc/${rfid}?apikey=${process.env.API_KEY}/`
    );*/
    const response = await fetch("http://localhost:3001/guard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(codigo),
    });
    if (response) {
      setOpen(true);
      event.preventDefault();
    } else {
      await response.json();
    }
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
            <form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!codigo}
              >
                Save
              </Button>
            </form>

            <Dialog fullScreen open={open} onClose={handleClose}>
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    X
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Sound
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleClose}>
                    save
                  </Button>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem button>
                  <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary="Default notification ringtone"
                    secondary="Tethys"
                  />
                </ListItem>
              </List>
            </Dialog>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuardForm;
