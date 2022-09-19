import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";

const ItemsList = () => {
  //const host_name = process.env.REACT_APP_HOST;
  //const port = process.env.REACT_APP_PORT;
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const loadItems = async () => {
    const response = await fetch("http://localhost:3001/items");
    const data = await response.json();
    setItems(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={12}
      >
        <h1>Items</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/newItem")}
        >
          New item
        </Button>
      </Stack>

      {items.map((i) => (
        <Card
          key={i.id}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{i.nombre}</Typography>
              <Typography>{i.descripcion}</Typography>
              <Typography>
                <img
                  src={"http://localhost:3001/" + i.rutaimagen}
                  alt="TEST"
                  width="500"
                  height="400"
                ></img>
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/items/${i.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(i.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ItemsList;
