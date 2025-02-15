import List from "./List";
import Upload from "./Upload";
import Search from "./Search";
import { Button } from "antd";
import { useFetchPostList } from "@hooks/useFetchPostList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "@hooks/useDeletePost";
const Post = () => {
  const [search, setSearch] = useState("");
  const { data, refetch } = useFetchPostList(search);
  const navigate = useNavigate();
  const onSearch = () => {
    refetch();
  };

  const handleView = (id: number) => {
    navigate(`/${id}`);
  };

  const { mutateAsync } = useDeletePost();
  const handleDelete = async (id: number) => {
    await mutateAsync(id);
    refetch();
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button type="primary" onClick={() => setOpen(true)}>
          上传文件
        </Button>
        <Search search={search} onChange={setSearch} onSearch={onSearch} />
      </div>
      <List
        data={data?.data}
        handleView={handleView}
        handleDelete={handleDelete}
      />
      <Upload open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default Post;
