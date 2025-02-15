import { Outlet } from "react-router-dom";
import { Button } from "antd";
import { useNavbar } from "@hooks/useNavbar";

const MainLayout = () => {
  const { logout, goTo, username } = useNavbar();
  return (
    <div>
      {/* logout */}
      <div className="flex justify-between w-full">
        <div>
          <Button type="link" onClick={() => goTo("/")}>
            文章管理
          </Button>
          <Button type="link" onClick={() => goTo("/sentence")}>
            一句话管理
          </Button>
          <Button type="link" onClick={() => goTo("/comment")}>
            评论管理
          </Button>
        </div>
        <div>
          <span>欢迎，{username}</span>

          <Button
            type="link"
            onClick={() => {
              logout();
            }}
          >
            退出登录
          </Button>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
      {/* 这里可以放页脚等公共组件 */}
    </div>
  );
};

export default MainLayout;
