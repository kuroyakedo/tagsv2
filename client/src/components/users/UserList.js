import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import Container from "../../containers/Container";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={12}
      >
        <h1>Users</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/newUser")}
        >
          New user
        </Button>
      </Stack>

      {users.map((u) => (
        <Card
          key={u.id}
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
              <Typography>{u.nombre}</Typography>
              <Typography>{u.usuario}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/users/${u.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(u.id)}
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

export default UserList;
