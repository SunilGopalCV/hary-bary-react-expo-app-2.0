import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <AppContext.Provider value={{ imageUri, setImageUri, result, setResult }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
