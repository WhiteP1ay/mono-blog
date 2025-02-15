import { Sentence } from "@api/sentence";

type ArticleProps = {
  data?: Sentence;
};

const Article = ({ data }: ArticleProps) => {
  return (
    <article className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md prose max-w-[800px] w-[800px]">
      <p>{data?.content}</p>
    </article>
  );
};

export default Article; 