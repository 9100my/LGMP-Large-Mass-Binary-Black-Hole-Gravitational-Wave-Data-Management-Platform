# 快速启动指南

## 🚀 一键启动（推荐）

### Windows用户
双击运行 `start.bat` 文件

### Linux/Mac用户
```bash
chmod +x start.sh
./start.sh
```

## 📋 手动启动步骤

### 1. 环境检查
```bash
npm run test-setup
```

### 2. 安装依赖
```bash
npm run install-all
```

### 3. 配置环境变量
创建 `.env` 文件并配置以下内容：
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
OPENAI_API_KEY=
OPENAI_BASE_URL=https://xiaoai.plus/v1
DB_PATH=./database/gravitational_wave.db
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=50mb
```

### 4. 启动应用
```bash
npm run dev
```

### 5. 访问应用
- 前端：http://localhost:3000
- 后端：http://localhost:5000
- 默认账户：admin / admin123

## 🐳 Docker启动

### 使用Docker Compose（推荐）
```bash
docker-compose up -d
```

### 使用Docker
```bash
docker build -t gravitational-wave-platform .
docker run -p 3000:3000 -p 5000:5000 gravitational-wave-platform
```

## 🔧 常见问题

### 端口被占用
如果3000或5000端口被占用，可以修改环境变量：
```env
PORT=5001
CLIENT_URL=http://localhost:3001
```

### 数据库初始化失败
删除 `server/database/gravitational_wave.db` 文件，重新启动服务器。

### 依赖安装失败
```bash
# 清除缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules server/node_modules client/node_modules

# 重新安装
npm run install-all
```

### OpenAI API配置
1. 注册OpenAI账户：https://platform.openai.com
2. 获取API密钥
3. 在 `.env` 文件中配置：
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   OPENAI_BASE_URL=https://api.openai.com/v1
   ```
4. 运行 `npm run check-openai` 检查配置

## 📞 技术支持

如果遇到问题，请检查：
1. Node.js版本 >= 16.0.0
2. npm版本 >= 8.0.0
3. 网络连接正常
4. 防火墙设置

## 🎯 功能演示

启动后可以体验以下功能：
- 🔐 用户认证（注册/登录）
- 📊 项目管理
- 📁 数据管理
- 🔄 数据处理工作流
- 📈 数据可视化
- �� 智能助手
- 🎯 虚拟数据生成 