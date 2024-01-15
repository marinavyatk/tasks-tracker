import axios from "axios";
import { UserData, CommonResponse, DataForAuthorization } from "common/types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "e9641289-ee14-4d73-be86-68e64b3c2a02",
  },
});

// export const authApi = {
//   me() {
//     return instance.get<CommonResponse<UserData>>("auth/me");
//   },
//   login(authData: DataForAuthorization) {
//     return instance.post<CommonResponse<{ userId: 2 }>>("auth/login", authData);
//   },
//   logout() {
//     return instance.delete<CommonResponse>("auth/login");
//   },
// };
