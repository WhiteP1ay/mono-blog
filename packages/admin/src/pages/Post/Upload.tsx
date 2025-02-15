import { Modal, Button, Select } from "antd";
import { useUploadPost } from "@hooks/useUploadPost";
import { useFetchCategory } from "@hooks/useFetchCategory";
interface UploadProps {
  open: boolean;
  onCancel: () => void;
}

const Upload = ({ open, onCancel }: UploadProps) => {
  const { files, setFiles, handleUpload, category, setCategory } = useUploadPost();
  const { data: categoryList } = useFetchCategory();
 

  return (
    <Modal open={open} onCancel={onCancel} title="上传文件" footer={null}>
      <form className="flex flex-col items-center gap-4 p-6">
        <Select
          className="w-full"
          value={category}
          onChange={(value) => setCategory(value)}
          options={categoryList?.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
        <span className="text-sm text-gray-500">{files.length} 个文件</span>
        <label>
          <span className="mt-2 text-sm text-gray-500 cursor-pointer">
            选择文件
          </span>
          <input
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            type="file"
            multiple
          />
        </label>
        <Button
          type="primary"
          onClick={() => {
            if (files.length === 0) {
              return;
            }
            handleUpload();
          }}
        >
          上传文件
        </Button>
      </form>
    </Modal>
  );
};

export default Upload;
