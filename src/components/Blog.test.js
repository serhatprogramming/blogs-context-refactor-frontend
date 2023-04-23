import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog tests", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test.com",
      likes: 0,
      user: { username: "testuser" },
    };

    container = render(<Blog blog={blog} username="user" />).container;
  });

  test("renders only title and author not likes nor url", async () => {
    const div = container.querySelector(".blogContent");
    expect(div).toHaveTextContent("test title");
    expect(div).not.toHaveTextContent("likes");
    expect(div).not.toHaveTextContent("test.com");
  });

  test("url and likes are visible when view button is clicked", async () => {
    const user = userEvent.setup();
    const div = container.querySelector(".blogContent");
    expect(div).not.toHaveTextContent("test.com");
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    expect(div).toHaveTextContent("test.com");
  });

  test("like button clicked twice", async () => {
    const user = userEvent.setup();
    const div = container.querySelector(".blogContent");
    expect(div).not.toHaveTextContent("test.com");
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
  });
});
