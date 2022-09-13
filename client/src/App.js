import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/users/UserList";
import UserForm from "./components/users/UserForm";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Inventory from "./components/reader/InventoryForm";
import Cashier from "./components/reader/CashierForm";
import Guard from "./components/reader/GuardForm";
import ItemsList from "./components/items/ItemsList";
import ItemForm from "./components/items/ItemForm";
import ErrorGuard from "./components/reader/ErrorGuard";
//import { Container } from "@mui/system";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/newUser" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/newItem" element={<ItemForm />} />
          <Route path="/items/:id/edit" element={<ItemForm />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/guard" element={<Guard />} />
          <Route path="/error" element={<ErrorGuard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
