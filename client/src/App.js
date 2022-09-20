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
import Login from "./components/login/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import UserContext from "./components/AccountContext";
//import { Container } from "@mui/system";

const App = () => {
  return (
    <UserContext>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/users" element={<UserList />} />
              <Route path="/newUser" element={<UserForm />} />
              <Route path="/users/:id/edit" element={<UserForm />} />
              <Route path="/items" element={<ItemsList />} />
              <Route path="/newItem" element={<ItemForm />} />
              <Route path="/items/:id/edit" element={<ItemForm />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/cashier" element={<Cashier />} />
              <Route path="/guard" element={<Guard />} />
            </Route>
            <Route path="*" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserContext>
  );
};

export default App;
