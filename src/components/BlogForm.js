import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            type="text"
            name="Title"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="Author"
            value={author}
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="Url"
            value={url}
            id="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button id="create-button">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
