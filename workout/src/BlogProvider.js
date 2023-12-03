import React from "react";
import { makeId } from "./util";
import { useState } from "react";

export const BlogContext = React.createContext({});

const BlogProvider = ({ children }) => {
  // states from Blog
  const [posts, setPosts] = useState([]); // array to store the list of posts
  const [selectedPost, setSelectedPost] = useState(null);

  const closeEditor = () => {
    setSelectedPost(null);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        editorOpen: !!selectedPost, // returns a boolean
        selectedPost,
        closeEditor,
        postCount: posts.length, // footer

        // delete post
        deletePost: ({ id }) => setPosts(posts.filter((x) => x.id !== id)),

        // open editor
        openEditor: () => setSelectedPost({}),

        // open post
        openPost: ({ id }) => {
          const p = posts.find((p) => p.id === id);
          setSelectedPost(p);
        },

        savePost: ({ id, title, duration, repeat, pause }) => {
          const updatedPost = {
            //id: makeId(), // random num
            id,
            title,
            duration,
            repeat,
            pause,
          };

          if (id) {
            // update existing post
            const updatedPosts = posts.map((p) =>
              p.id === id ? updatedPost : p
            );
            setPosts(updatedPosts);
          } else {
            // create a new one
            setPosts([
              ...posts,
              {
                ...updatedPost,
                id: makeId(),
              },
            ]);
          }

          closeEditor();
        },
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
