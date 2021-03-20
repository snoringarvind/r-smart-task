import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import uniqid from "uniqid";

const Blog = ({ blogs, setBlogs }) => {
  const [getLoading, setGetLoading] = useState(true);
  useEffect(() => {
    get_blog_data();
  }, []);

  const get_blog_data = async () => {
    const route = "http://localhost:3000/blog/blog-data";
    const method = "GET";

    try {
      const response = await axios({ url: route, method: method });
      console.log(response);
      setBlogs(response.data);
      setGetLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      setGetLoading(false);
    }
  };

  console.log(blogs);

  return (
    <div className="Blog">
      {!getLoading &&
        blogs.map((value, index) => {
          return <BlogCard index={index} value={value} key={uniqid()} />;
        })}
    </div>
  );
};

export default Blog;
