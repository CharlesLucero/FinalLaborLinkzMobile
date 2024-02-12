// // FavContext.js
// import React, { createContext, useContext, useState } from 'react';

// const FavContext = createContext();

// export const FavProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addToFavorites = (profileData, profilepost) => {
//     const existingIndex = favorites.findIndex(
//       (fav) => fav.profileData?.userId === profileData?.userId
//     );

//     if (existingIndex !== -1) {
//       // Remove from favorites if already exists
//       const updatedFavorites = [...favorites];
//       updatedFavorites.splice(existingIndex, 1);
//       setFavorites(updatedFavorites);
//     } else {
//       // Add to favorites if not in the list
//       setFavorites((prevFavorites) => [...prevFavorites, { profileData, profilepost }]);
//     }
//   };

//   const removeFromFavorites = (userId) => {
//     const updatedFavorites = favorites.filter(
//       (fav) => fav.profileData?.userId !== userId
//     );
//     setFavorites(updatedFavorites);
//   };

//   const contextValue = {
//     favorites,
//     addToFavorites,
//     removeFromFavorites,
//   };

//   return (
//     <FavContext.Provider value={contextValue}>
//       {children}
//     </FavContext.Provider>
//   );
// };


// export const useAuth = () => {
//   const context = useContext(FavContext);
//   if (!context) {
//     throw new Error('useAuth must be used within a FavProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState } from 'react';

const FavContext = createContext();

// export const FavProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addToFavorites = (profileData, profilepost) => {
//     const existingIndex = favorites.findIndex(
//       (fav) => fav.profileData?.userId === profileData?.userId
//     );

//     if (existingIndex !== -1) {
//       // Remove from favorites if already exists
//       const updatedFavorites = [...favorites];
//       updatedFavorites.splice(existingIndex, 1);
//       setFavorites(updatedFavorites);
//     }

//     // Add to favorites if not in the list
//     setFavorites((prevFavorites) => [...prevFavorites, { profileData, profilepost }]);
//   };
export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (profileData, profilepost) => {
    setFavorites((prevFavorites) => {
      const existingIndex = prevFavorites.findIndex(
        (fav) => fav.profileData?.userId === profileData?.userId
      );

      if (existingIndex !== -1) {
        // Remove from favorites if already exists
        const updatedFavorites = [...prevFavorites];
        updatedFavorites.splice(existingIndex, 1);
        return updatedFavorites;
      }

      // Add to favorites if not in the list
      return [...prevFavorites, { profileData, profilepost }];
    });
  };

  const removeFromFavorites = (userId) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.profileData?.userId !== userId
    );
    setFavorites(updatedFavorites);
  };

  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavContext.Provider value={contextValue}>
      {children}
    </FavContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error('useAuth must be used within a FavProvider');
  }
  return context;
};