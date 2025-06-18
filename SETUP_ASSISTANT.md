# 智能助手设置指南

## 🔧 快速设置

### 1. 创建环境变量文件

在项目根目录创建 `.env` 文件：

```bash
# 复制示例文件
cp env.example .env
```

### 2. 配置DeepSeek API

编辑 `.env` 文件，设置您的DeepSeek API密钥：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 客户端URL
CLIENT_URL=http://localhost:3000

# JWT密钥
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# DeepSeek配置
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

# 数据库配置
DB_PATH=./database/gravitational_wave.db

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=50mb
```

### 3. 获取DeepSeek API密钥

1. 访问 [DeepSeek官网](https://platform.deepseek.com/)
2. 注册并登录账户
3. 进入API管理页面
4. 创建新的API密钥
5. 复制密钥到 `.env` 文件

### 4. 启动服务器

```bash
# 启动后端服务器
npm run server

# 或使用开发模式
npm run dev
```

### 5. 测试智能助手

```bash
# 测试DeepSeek API连接
node check-deepseek.js

# 测试智能助手功能
node test-assistant.js
```

## 🚨 常见问题

### 问题1: "DeepSeek API密钥未配置"

**解决方案：**
- 确保 `.env` 文件存在
- 检查 `DEEPSEEK_API_KEY` 是否正确设置
- 重启服务器

### 问题2: "智能助手暂时不可用"

**解决方案：**
- 检查网络连接
- 验证API密钥是否有效
- 查看服务器日志

### 问题3: "服务器连接失败"

**解决方案：**
- 确保服务器正在运行
- 检查端口5000是否被占用
- 重启服务器

## 🔍 调试步骤

1. **检查环境变量**
   ```bash
   node -e "require('dotenv').config(); console.log('API Key:', process.env.DEEPSEEK_API_KEY ? '已配置' : '未配置')"
   ```

2. **测试API连接**
   ```bash
   node check-deepseek.js
   ```

3. **检查服务器状态**
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **查看服务器日志**
   - 启动服务器时查看控制台输出
   - 检查是否有错误信息

## 💡 使用提示

- 智能助手需要先登录才能使用
- 助手会记住对话历史
- 支持上下文感知的回答
- 可以分析用户数据并提供建议

## 🛠️ 高级配置

### 自定义模型参数

在 `server/routes/assistant.js` 中可以调整：

```javascript
const postData = JSON.stringify({
  model: 'deepseek-chat',        // 模型名称
  messages: messages,
  temperature: 0.7,              // 创造性 (0-1)
  max_tokens: 2000,              // 最大输出长度
  stream: false                  // 是否流式输出
});
```

### 自定义系统提示词

修改 `buildSystemPrompt` 函数来自定义助手的角色和行为。 