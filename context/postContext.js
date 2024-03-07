import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Initialize posts and set interval to fetch new data every 2 seconds
  useEffect(() => {
    getAllPosts(); // Initial call to get posts

    const interval = setInterval(() => {
      getAllPosts(); // Fetch new posts every 2 seconds
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };

// import React, {createContext, useState, useEffect} from "react";
// import axios from "axios";

// //context
// const PostContext = createContext();

// const PostProvider = ({children}) => {
// //state
// const [loading, setLoading] = useState(false);
// const [posts, setPosts] = useState([]);

//  //get posts
//  const getAllPosts = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/post/get-all-post");
//       setLoading(false);
//       setPosts(data?.posts);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
// // inintal  posts
//  useEffect(() => {
//     getAllPosts();
//   }, []);
// return (
//     <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
//       {children}
//     </PostContext.Provider>
//   );
// }

// export { PostContext, PostProvider };