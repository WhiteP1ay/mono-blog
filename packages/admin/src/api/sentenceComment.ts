import { fetchApi } from "@utils/fetchUtils";
import type { DetailRes, ListRes } from "@api/base.types";
import type { Comment } from "@api/postComment";

export type AddSentenceCommentData = {
  content: string;
  nickname?: string;
  sentenceId: number;
};

export const fetchSentenceCommentList = async (sentenceId?: number) => {
  return fetchApi<ListRes<Comment>>(
    `/api/sentence-comment${sentenceId ? `?id=${sentenceId}` : ""}`
  );
};

export const addSentenceComment = async (data: AddSentenceCommentData) => {
  return fetchApi<DetailRes<Comment>>(`/api/sentence-comment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteSentenceComment = async (commentId: number) => {
  return fetchApi<DetailRes<Comment>>(`/api/sentence-comment/${commentId}`, {
    method: "DELETE",
  });
};
