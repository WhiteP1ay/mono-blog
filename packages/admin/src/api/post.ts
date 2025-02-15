import { fetchApi } from "@utils/fetchUtils";
import type { DetailRes, ListRes } from "@api/base.types";

export type Post = {
  id: number;
  title: string;
  content: string;
};

export const fetchPostList = async (search?: string) => {
  return fetchApi<ListRes<Post>>(`/api/post?search=${search}`);
};

export const fetchPostDetail = async (id: number) => {
  return fetchApi<DetailRes<Post>>(`/api/post/${id}`);
};

export const removePost = async (id: number) => {
  return fetchApi<DetailRes<Post>>(`/api/post/${id}`, {
    method: "DELETE",
  });
};
