import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";
import { fetchApi } from "@utils/fetchUtils";

interface UploadProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const Add = ({ open, onCancel, onSuccess }: UploadProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await fetchApi("/api/sentence", {
        method: "POST",
        body: JSON.stringify(values),
      });
      message.success("添加成功");
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      console.error(error);
      message.error("添加失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="新增句子"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          确定
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: "请输入内容" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add; 