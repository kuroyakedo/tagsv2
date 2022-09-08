import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Inventory from "./components/InventoryForm";
//import { Container } from "@mui/system";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
