import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "e9641289-ee14-4d73-be86-68e64b3c2a02",
  },
});
