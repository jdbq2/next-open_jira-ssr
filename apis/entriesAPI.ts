import axios from "axios";

export const entriesAPI = axios.create({
  baseURL: "/api",
});
