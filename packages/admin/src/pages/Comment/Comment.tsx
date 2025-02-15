import { Button, Radio, Space, Table, Popconfirm } from "antd";
import { formatTime } from "@utils/formatTime";
import { useCommentManagement } from "../../hooks/useCommentManagement";
import type { Comment } from "@api/postComment";

const CommentPage = () => {
  const { filterType, handleFilterChange, handleDelete, filteredData } =
    useCommentManagement();

  // 表格列定义
  const columns = [
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      width: 150,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: 400,
      ellipsis: true,
    },
    {
      title: "类型",
      key: "type",
      width: 100,
      render: (_: unknown, record: Comment) =>
        (record as unknown as { post: { id: number } })?.post?.id
          ? "文章评论"
          : "句子评论",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (time: Date) => formatTime(time),
    },
    {
      title: "操作",
      key: "action",
      width: 100,
      fixed: "right" as const,
      render: (_: unknown, record: Comment) => (
        <Popconfirm
          title="确定要删除这条评论吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" className="w-full">
        <div className="flex justify-between items-center">
          <Radio.Group onChange={handleFilterChange} value={filterType}>
            <Radio.Button value="post">文章评论</Radio.Button>
            <Radio.Button value="sentence">句子评论</Radio.Button>
          </Radio.Group>
          <span className="text-gray-500">
            共 {filteredData?.length ?? 0} 条评论
          </span>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ x: 1000 }}
        />
      </Space>
    </div>
  );
};

export default CommentPage;
