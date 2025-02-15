import { Button, Input } from "antd";

interface SearchProps {
  search: string;
  onChange: (search: string) => void;
  onSearch: () => void;
}

const Search = ({ search, onChange, onSearch }: SearchProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Input
        type="text"
        placeholder="搜索句子"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <Button type="primary" onClick={onSearch}>
        搜索
      </Button>
    </div>
  );
};

export default Search; 