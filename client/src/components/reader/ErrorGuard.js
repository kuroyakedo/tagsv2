import React, { useState } from "react";
import {
  Button,
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
const ErrorGuard = () => {
 
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };  
  //GS1.GTIN ES EL UPC
  return (
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
  );
};

export default ErrorGuard;
