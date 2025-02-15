import { fetchApi } from "@utils/fetchUtils";
import type { DetailRes, ListRes } from "@api/base.types";

export type Comment = {
  id: number;
  postId?: number;
  sentenceId?: number;
  content: string;
  nickname?: string;
  createdAt: Date;
};

export type AddCommentData = {
  content: string;
  nickname?: string;
  postId: number;
};

export const fetchPostCommentList = async (postId: number) => {
  return fetchApi<ListRes<Comment>>(`/api/comment?postId=${postId}`);
};

export const fetchSentenceCommentList = async (targetId: number) => {
  return fetchApi<ListRes<Comment>>(
    `/api/comment?targetId=${targetId}&type=sentence`
  );
};

export const fetchAllPostComment = async () => {
  return fetchApi<ListRes<Comment>>(`/api/comment`);
};

export const addPostComment = async (data: AddCommentData) => {
  return fetchApi<DetailRes<Comment>>(`/api/comment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deletePostComment = async (commentId: number) => {
  return fetchApi<DetailRes<Comment>>(`/api/comment/${commentId}`, {
    method: "DELETE",
  });
};
