import React from "react";
import Blog from "./Blog";
import Notification from "./Notification";

import { useQuery } from "react-query";

import blogService from "../services/blogs";

const Blogs = ({ user, notification, handleLogout, createNewBlog, token }) => {
  const result = useQuery("blgs", () => blogService.getAll(token));

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  const blogs = result.data;

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {`${user.username} is logged in`}{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </p>
      {createNewBlog()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            token={token}
            username={user.username}
          />
        ))}
    </div>
  );
};

export default Blogs;
