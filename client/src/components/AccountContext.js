import { createContext, useState } from "react";

export const AccountContext = createContext({});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    loggedIn: false,
  });

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
