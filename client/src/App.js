import React, { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import Rutas from "./components/Rutas";

export default function App() {
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.user) {
    }
  }, [auth]);

  return (
    <>
      <Rutas />
    </>
  );
}
