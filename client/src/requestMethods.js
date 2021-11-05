import axios from "axios";

const BASE_URL = "https://ecommerce-1000.herokuapp.com/";
const token =
  (localStorage.getItem("persist:root") &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.token) ||
  "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
