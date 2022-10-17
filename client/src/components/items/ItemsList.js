import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import Container from "../../containers/Container";

const ItemsList = () => {
  const host_name = process.env.NODE_ENV_HOST;
  const port = process.env.NODE_ENV_PORT;
  console.log(host_name, port);
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
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={12}
        style={{
          paddingBottom: "1rem",
        }}
      >
        <h1
          style={{
            color: "white",
          }}
        >
          Items catalog
        </h1>
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
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{i.nombre}</Typography>
              <Typography>{i.descripcion}</Typography>
              <Typography>${i.costo}</Typography>
            </div>
            <div>
              {" "}
              <img
                src={"http://localhost:3001/" + i.rutaimagen}
                alt="TEST"
                width="auto"
                height="100"
              />
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
                color="secondary"
                onClick={() => handleDelete(i.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ItemsList;
