import { fetchApi } from "@utils/fetchUtils";
import type { DetailRes, ListRes } from "@api/base.types";

export type Sentence = {
  id: number;
  title: string;
  content: string;
};

export const fetchSentenceList = async (search?: string) => {
  return fetchApi<ListRes<Sentence>>(`/api/sentence?search=${search}`);
};

export const fetchSentenceDetail = async (id: number) => {
  return fetchApi<DetailRes<Sentence>>(`/api/sentence/${id}`);
};

export const removeSentence = async (id: number) => {
  return fetchApi<DetailRes<Sentence>>(`/api/sentence/${id}`, {
    method: "DELETE",
  });
};

