import React, { useRef, useState } from "react";
import axios from "axios";

const BlogForm = ({ setCreateBtn, blogs, setBlogs }) => {
  const contentRef = useRef();
  const titleRef = useRef();

  const [postLoading, setPostLoading] = useState(false);

  const post_data = async () => {
    setPostLoading(true);

    const route = "http://localhost:3000/blog";
    const method = "POST";

    try {
      const response = await axios({
        url: route,
        method: method,
        data: {
          title: titleRef.current.value,
          content: contentRef.current.value,
        },
      });
      setBlogs([
        ...blogs,
        { title: titleRef.current.value, content: contentRef.current.value },
      ]);
      console.log(response);
      setPostLoading(false);
      setCreateBtn(false);
    } catch (err) {
      console.log(err.response);
      setPostLoading(false);
    }
  };
  return (
    <div className="BlogForm">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            placeholder="Title for your blog.."
            ref={titleRef}
            // value={titleRef.current.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write Something..."
            ref={contentRef}
            // value={contentRef.current.value}
          />
        </div>
        <div className="button-group">
          <div className="submit-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!postLoading) {
                  post_data();
                } else {
                  return;
                }
              }}
            >
              {postLoading ? "Adding" : "Add"}
            </button>
          </div>
          <div className="cancel-btn">
            <button onClick={() => setCreateBtn(false)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
