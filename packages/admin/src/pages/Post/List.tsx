import Markdown from "react-markdown";
import { Post } from "@api/post";
import { Button } from "antd";

interface ListProps {
  handleView?: (id: number) => void;
  handleDelete?: (id: number) => void;
  data?: Post[];
}

const List = ({ handleView, handleDelete, data }: ListProps) => {
  const handlePostAbstract = (content: string) => {
    return content.split("\n").slice(1, 5).join("\n");
  };

  return (
    <div>
      {data?.map((post) => (
        <div
          className="border-b-2 border-gray-200 p-4 flex items-center justify-between gap-2"
          key={post.id}
        >
          <div className="flex flex-col justify-between">
            <h4 className="text-2xl font-bold">{post.title}</h4>
            <div className="text-gray-500 line-clamp-2">
              <Markdown>{handlePostAbstract(post.content)}</Markdown>
            </div>
          </div>

          <div className="flex gap-2 h-[50px]">
            <Button
              onClick={() => {
                handleView?.(post.id);
              }}
            >
              查看
            </Button>
            <Button
              onClick={() => {
                handleDelete?.(post.id);
              }}
              type="primary"
              danger
            >
              删除
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
