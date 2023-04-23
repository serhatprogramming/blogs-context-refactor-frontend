import axios from "axios";
const baseUrl = "/api/login";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  return token;
};

const getToken = () => {
  return token;
};

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, setToken, getToken };
