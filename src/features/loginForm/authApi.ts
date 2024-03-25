import { instance } from "common/api";
import { CommonResponse, DataForLogin, UserData } from "common/types";

const AuthApi = {
  me() {
    return instance.get<CommonResponse<UserData>>("auth/me");
  },
  logIn(dataForLogin: DataForLogin) {
    return instance.post<CommonResponse<{ userId: number }>>("auth/login", dataForLogin);
  },
  logOut() {
    return instance.delete<CommonResponse>("auth/login");
  },
};

export default AuthApi;
