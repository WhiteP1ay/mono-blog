//sentence 增删改查
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchSentenceList,
  fetchSentenceDetail,
  removeSentence,
} from "@api/sentence";

export const useFetchSentenceList = (search: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["sentence", search],
    queryFn: () => fetchSentenceList(search),
  });

  return { data, isLoading, error, refetch };
};

export const useFetchSentenceDetail = (id: number) => {
  const { data } = useQuery({
    queryKey: ["sentence", id],
    queryFn: () => fetchSentenceDetail(id),
  });

  return { data };
};

export const useRemoveSentence = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: number) => removeSentence(id),
  });

  return { mutateAsync, isPending };
};
