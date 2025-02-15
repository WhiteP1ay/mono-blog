import { useParams } from "react-router-dom";
import { useFetchPostDetail } from "../../hooks/useFetchPostDetail";
import Article from "./Article";
import Comments from "./Comments";
const PostDetail = () => {
  const { postId } = useParams();
  const { data } = useFetchPostDetail(Number(postId));
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg min-h-[calc(100vh-64px)] shadow-md items-center">
      <Article data={data?.data} />
      <Comments />
    </div>
  );
};

export default PostDetail;
