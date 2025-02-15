import { useQuery } from "@tanstack/react-query";
import { fetchPostDetail } from "@api/post";

export const useFetchPostDetail = (id: number) => {
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetail(id),
  });

  return { data };
};
