# 构建阶段
FROM node:20-alpine as builder

WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN npm install -g pnpm
RUN pnpm install

# 复制源代码和环境变量文件
COPY . .
COPY .env .env

# 构建项目
RUN pnpm build

# 运行阶段
FROM node:20-alpine

WORKDIR /app

# 复制构建产物、依赖和环境变量文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./.env

# 设置环境变量
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["node", "dist/index.js"]