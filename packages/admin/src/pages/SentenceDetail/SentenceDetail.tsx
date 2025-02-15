import { useParams } from "react-router-dom";
import { useFetchSentenceDetail } from "@hooks/useSentence";
import Article from "./Article";
import Comments from "./Comments";

const SentenceDetail = () => {
  const { id } = useParams();
  const { data } = useFetchSentenceDetail(Number(id));

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg min-h-[calc(100vh-64px)] shadow-md items-center">
      <Article data={data?.data} />
      <Comments />
    </div>
  );
};

export default SentenceDetail; 