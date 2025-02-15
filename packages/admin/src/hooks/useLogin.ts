import { useNavigate } from "react-router-dom";
import { login } from "@api/login";
import { message } from "antd";

export const useLogin = (Form: any) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const res = (await login(values)) as {
        success: boolean;
        error: string;
        token: string;
        username: string;
      };

      if (res.success) {
        message.success("登录成功");
        navigate("/");
        localStorage.setItem("token", "Bearer " + res.token);
        localStorage.setItem("username", res.username);
        window.location.reload();
      } else {
        message.error(res.error);
      }
    } catch {
      message.error("登录失败");
    }
  };

  return { form, onFinish };
};
