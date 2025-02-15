import { fetchApi } from "@utils/fetchUtils";
// import type { DetailRes } from "@api/base.types";

type LoginParams = {
  username: string;
  password: string;
};

export const login = async (params: LoginParams) => {
  const res = await fetchApi("/api/user/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
  return res;
};
