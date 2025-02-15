import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载根目录的环境变量
  const env = loadEnv(mode, "../../", "");
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": `http://${env.APP_HOST}:${env.APP_PORT}`,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@utils": path.resolve(__dirname, "./src/utils"), 
        "@api": path.resolve(__dirname, "./src/api"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@layouts": path.resolve(__dirname, "./src/layouts")
      }
    },
    define: {
      // 注入环境变量到前端
      "process.env.APP_HOST": JSON.stringify(env.APP_HOST),
      "process.env.APP_PORT": JSON.stringify(env.APP_PORT),
    },
  };
});
