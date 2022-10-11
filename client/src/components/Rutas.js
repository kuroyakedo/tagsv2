import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./users/UserList";
import UserForm from "./users/UserForm";
import Inventory from "./reader/InventoryForm";
import Cashier from "./reader/CashierForm";
import Guard from "./reader/GuardForm";
import ItemsList from "./items/ItemsList";
import ItemForm from "./items/ItemForm";
import Login from "./login/Login";
import RequireAuth from "../components/RequireAuth";
//import { Container } from "@mui/system";

const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
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
    </BrowserRouter>
  );
};

export default Rutas;
