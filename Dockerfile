# 使用Node.js官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json文件
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# 安装依赖
RUN npm run install-all

# 复制源代码
COPY . .

# 构建前端应用
RUN cd client && npm run build

# 暴露端口
EXPOSE 3000 5000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=5000

# 启动命令
CMD ["npm", "run", "dev"] 