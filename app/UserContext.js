'use client';
import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  userLogin: null,
  setUserLogin: () => {},
});

export const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);

  const value = {
    userLogin,
    setUserLogin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
