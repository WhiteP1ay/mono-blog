import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "@api/post";

export const useFetchPostList = (search?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPostList(search),
  });

  return { data, isLoading, error, refetch };
};
