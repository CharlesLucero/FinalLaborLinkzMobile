// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const Fav2Context = createContext();

export const Fav2Provider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (profilepost) => {
    const existingIndex = favorites.findIndex((fav) => fav.userId === profilepost.userId);

    if (existingIndex !== -1) {
      // Remove from favorites if already exists
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(existingIndex, 1);
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites if not in the list
      setFavorites((prevFavorites) => [...prevFavorites, profilepost]);
    }
  };

  const removeFromFavorites = (userId) => {
    const updatedFavorites = favorites.filter((fav) => fav.userId !== userId);
    setFavorites(updatedFavorites);
  };

  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <Fav2Context.Provider value={contextValue}>
      {children}
    </Fav2Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Fav2Context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
