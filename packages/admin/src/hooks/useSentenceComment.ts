import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  addSentenceComment, 
  deleteSentenceComment, 
  fetchSentenceCommentList,
  type AddSentenceCommentData 
} from "@api/sentenceComment";

export const useSentenceComment = (sentenceId: number) => {
  const [data, setData] = useState<AddSentenceCommentData>({
    nickname: "",
    content: "",
    sentenceId,
  });

  const queryClient = useQueryClient();

  const { data: commentData } = useQuery({
    queryKey: ["sentenceComment", sentenceId],
    queryFn: () => fetchSentenceCommentList(sentenceId),
  });

  const { mutateAsync: addComment } = useMutation({
    mutationFn: addSentenceComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentenceComment", sentenceId] });
    },
  });

  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: deleteSentenceComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentenceComment", sentenceId] });
    },
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const handleAddComment = async () => {
    await addComment(data);
    setData((prev) => ({
      ...prev,
      content: "",
      nickname: "",
    }));
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
  };

  return {
    data,
    commentData,
    handleContentChange,
    handleNicknameChange,
    handleAddComment,
    handleDeleteComment,
  };
}; 