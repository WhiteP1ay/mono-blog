import { useState } from "react";
import Md from "../../components/Md";
import { Post } from "../../api/post";

type ArticleProps = {
  data?: Post;
};

const Article = ({ data }: ArticleProps) => {
  const [expanded, setExpanded] = useState(false);

  const frontContent = data?.content?.split("\n").slice(0, 10).join("\n");
  const backContent = data?.content?.split("\n").slice(10).join("\n");

  return (
    <article className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md prose max-w-[800px] w-[800px]">
      {data?.content && <Md content={frontContent} />}
      {data?.content && data.content.split("\n").length > 10 && (
        <div className="flex justify-center sticky top-[10px]">
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "收起内容 ↑" : "展开更多 ↓"}
          </button>
        </div>
      )}
      {expanded && <Md content={backContent} />}
    </article>
  );
};

export default Article;
