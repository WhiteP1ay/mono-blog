import { useMutation } from "@tanstack/react-query";
import { removePost } from "@api/post";

export const useDeletePost = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: number) => removePost(id),
  });

  return { mutateAsync, isPending };
};
