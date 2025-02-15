import { useState } from "react";
import { fetchApi } from "@utils/fetchUtils";

export const useUploadPost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<number | undefined>(undefined);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetchApi(`/api/post/import?categoryId=${category}`, {
      method: "POST",
      body: formData,
    });

    return res;
  };

  return { files, setFiles, handleUpload, category, setCategory };
};
