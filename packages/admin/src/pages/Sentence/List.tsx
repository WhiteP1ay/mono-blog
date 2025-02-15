import { Button, Table } from "antd";
import type { Sentence } from "@api/sentence";
import type { ColumnsType } from "antd/es/table";

interface ListProps {
  data?: Sentence[];
  handleDelete?: (id: number) => void;
  gotoDetail?: (id: number) => void;
}

const List = ({ data, handleDelete, gotoDetail }: ListProps) => {
  const columns: ColumnsType<Sentence> = [
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: 400,
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <>
          <Button onClick={() => gotoDetail?.(record.id)}>查看</Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete?.(record.id)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
    />
  );
};

export default List;
