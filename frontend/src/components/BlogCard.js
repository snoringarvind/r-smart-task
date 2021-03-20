import React, { useRef, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import axios from "axios";

const BlogCard = ({ index, value }) => {
  const blogCardRef = useRef();

  console.log(value);
  const [isVisible, setIsVisible] = useState(false);

  const [isBlogGet, setIsBlogGet] = useState(false);

  const [blog, setBlog] = useState({});

  useIntersectionObserver({
    target: blogCardRef,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      console.log(isIntersecting, index);

      if (isIntersecting) {
        if (!isBlogGet) {
          get_blogs();
          setIsVisible(true);
        }
        observerElement.unobserve(blogCardRef.current);
      }
    },
  });

  const get_blogs = async () => {
    console.log(value);
    const route = `http://localhost:3000/blog/${value._id}`;
    const method = "GET";

    setIsBlogGet(true);
    try {
      const response = await axios({ url: route, method: method });
      console.log(response);
      setBlog(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="BlogCard" ref={blogCardRef}>
      {isVisible && (
        <>
          <div className="title">{blog.title}</div>
          <div className="content">{blog.content}</div>
        </>
      )}
    </div>
  );
};

export default BlogCard;
