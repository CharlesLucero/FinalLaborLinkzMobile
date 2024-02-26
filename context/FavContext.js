import React, { createContext, useContext, useState } from 'react';

const FavContext = createContext();

export const useAuth = () => {
  return useContext(FavContext);
};

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (userData, profilepost) => {
    // Add the new favorite to the existing favorites array
    setFavorites([...favorites, { userData, profilepost }]);
  };

  const removeFromFavorites = (index) => {
    // Filter out the favorite at the given index
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
  };

  return (
    <FavContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavContext.Provider>
  );
};
