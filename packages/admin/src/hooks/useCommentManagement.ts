import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllPostComment, deletePostComment } from "@api/postComment";
import {
  fetchSentenceCommentList,
  deleteSentenceComment,
} from "@api/sentenceComment";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { message } from "antd";

export const useCommentManagement = () => {
  const [filterType, setFilterType] = useState<"post" | "sentence">("post");
  const queryClient = useQueryClient();

  // 获取所有评论
  const { data } = useQuery({
    queryKey: ["comments", filterType],
    queryFn: () =>
      filterType === "post"
        ? fetchAllPostComment()
        : fetchSentenceCommentList(),
  });

  // 删除评论
  const { mutateAsync } = useMutation({
    mutationFn:
      filterType === "post"
        ? deletePostComment
        : deleteSentenceComment,
    onSuccess: () => {
      message.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  // 处理筛选
  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilterType(e.target.value);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    await mutateAsync(id);
  };

  // 根据筛选类型过滤数据
  const filteredData = data?.data;

  return {
    filterType,
    handleFilterChange,
    handleDelete,
    filteredData,
  };
};
