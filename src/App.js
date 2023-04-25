import { useState, useRef, useEffect } from "react";
//components
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
//services
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
// react-query
import { useQueryClient, useMutation } from "react-query";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  // const queryClient = useQueryClient();

  // const addBlog = useMutation({
  //   mutationFn: ({ newBlog }) => blogService.createNew(newBlog, token),

  //   onSuccess: () => {
  //     queryClient.invalidateQueries("blgs");
  //     const message = {
  //       content: `a new blog added`,
  //       style: "info",
  //     };
  //     showNotification(message);
  //   },
  //   onError: () => {
  //     const message = {
  //       content: `Fill out all the fields.`,
  //       style: "error",
  //     };
  //     showNotification(message);
  //   },
  // });

  const useAddBlog = (newBlog) => {
    const queryClient = useQueryClient();
    const { mutate, isLoading, error, data } = useMutation(
      () => blogService.createNew(newBlog, token),
      {
        onSuccess: async (data) => {
          queryClient.invalidateQueries("blgs");
          console.log("data: ", data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );

    return data;
  };

  useEffect(() => {
    const userLocalStorage = JSON.parse(
      window.localStorage.getItem("loggedBlogUser")
    );

    if (userLocalStorage) {
      setToken(loginService.setToken(userLocalStorage.token));
      setUser(userLocalStorage);
    }
  }, []);

  //======================================================//

  //======================================================//

  //======================================================//
  const showLogin = () => (
    <>
      <h3>login to application</h3>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="login-button">login</button>
      </form>
    </>
  );
  //======================================================//

  const handleCreateBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisible();
    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };

    addBlog(newBlog);
  };
  //======================================================//

  const createNewBlog = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  );
  //======================================================//

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const retrievedUser = await loginService.login(username, password);
      setUser(retrievedUser);
      setToken(loginService.setToken(retrievedUser.token));
      window.localStorage.setItem(
        "loggedBlogUser",
        JSON.stringify(retrievedUser)
      );
    } catch (error) {
      const message = {
        content: `Wrong Credentials.`,
        style: "error",
      };
      showNotification(message);
    }
  };
  //======================================================//

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  //======================================================//

  const showNotification = (message) => {
    setNotification({
      notification: message.content,
      notificationStyle: message.style,
    });
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };
  //======================================================//

  return (
    <div>
      {user ? (
        <Blogs
          user={user}
          notification={notification}
          handleLogout={handleLogout}
          createNewBlog={createNewBlog}
          token={token}
        />
      ) : (
        showLogin()
      )}
    </div>
  );
};

export default App;
