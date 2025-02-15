import { Button } from "antd";
import { useState } from "react";
import { useRemoveSentence, useFetchSentenceList } from "@hooks/useSentence";
import Search from "./Search";
import List from "./List";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
const Sentence = () => {
  const [search, setSearch] = useState("");
  const { data, refetch } = useFetchSentenceList(search);
  const { mutateAsync: removeSentence } = useRemoveSentence();
  const navigate = useNavigate();
  const onSearch = () => {
    refetch();
  };

  const handleDelete = async (id: number) => {
    await removeSentence(id);
    refetch();
  };

  const gotoDetail = (id: number) => {
    navigate(`/sentence/${id}`);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Button type="primary" onClick={() => setOpen(true)}>
          新增句子
        </Button>
        <Search search={search} onChange={setSearch} onSearch={onSearch} />
      </div>
      <List
        data={data?.data}
        handleDelete={handleDelete}
        gotoDetail={gotoDetail}
      />
      <Add open={open} onCancel={() => setOpen(false)} onSuccess={refetch} />
    </div>
  );
};

export default Sentence;
