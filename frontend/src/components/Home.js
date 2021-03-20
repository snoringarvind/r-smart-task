import React, { useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import "./Home.css";

const Home = () => {
  const [createBtn, setCreateBtn] = useState(false);
  const [blogs, setBlogs] = useState([]);
  return (
    <div className="Home">
      <header>
        <h1>My Blogs</h1>
      </header>
      <div className="create-blogs">
        <button
          className="create-btn"
          onClick={(e) => {
            e.preventDefault();
            setCreateBtn(!createBtn);
          }}
        >
          Create New Blogs
        </button>
      </div>
      {createBtn && (
        <BlogForm
          setCreateBtn={setCreateBtn}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
      <Blog blogs={blogs} setBlogs={setBlogs} />
    </div>
  );
};

export default Home;
