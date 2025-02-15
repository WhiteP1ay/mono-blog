import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePostComment,
  addPostComment,
  fetchPostCommentList,
  type AddCommentData,
} from "@api/postComment";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const useAddPostComment = (postId: number) => {
  const [data, setData] = useState<AddCommentData>({
    nickname: "",
    content: "",
    postId,
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const queryClient = useQueryClient();

  const handleAddComment = async () => {
    await mutateAsync();
    queryClient.invalidateQueries({ queryKey: ["comment", postId] });
    setData((prev) => ({
      ...prev,
      content: "",
      nickname: "",
    }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => addPostComment(data),
  });

  return {
    data,
    mutateAsync,
    isPending,
    handleContentChange,
    handleNicknameChange,
    handleAddComment,
  };
};

export const useDeletePostComment = (postId: number) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (commentId: number) => deletePostComment(commentId),
  });

  const queryClient = useQueryClient();

  const handleDeleteComment = async (commentId: number) => {
    await mutateAsync(commentId);
    queryClient.invalidateQueries({ queryKey: ["comment", postId] });
  };

  return { mutateAsync, isPending, handleDeleteComment };
};

export const useFetchPostComment = (postId: number) => {
  const { data } = useQuery({
    queryKey: ["comment", postId],
    queryFn: () => fetchPostCommentList(postId),
  });

  return { data };
};
