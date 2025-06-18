# DeepSeek AI 配置指南

## 🚀 快速开始

### 1. 获取DeepSeek API密钥

1. 访问 [DeepSeek Platform](https://platform.deepseek.com)
2. 注册账户并登录
3. 进入API管理页面
4. 创建新的API密钥
5. 复制API密钥（以 `sk-` 开头）

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 客户端URL
CLIENT_URL=http://localhost:3000

# JWT密钥
JWT_SECRET=c2bba74229f038a94532cf971d050b66d536291c0b753559e116d2bce04d3da1

# DeepSeek配置
DEEPSEEK_API_KEY=sk-your-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

# 数据库配置
DB_PATH=./database/gravitational_wave.db

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=50mb
```

### 3. 测试配置

运行以下命令测试DeepSeek API配置：

```bash
npm run check-deepseek
```

### 4. 启动应用

```bash
npm run dev
```

## 🔧 故障排除

### API密钥无效
- 确认API密钥格式正确（以 `sk-` 开头）
- 检查API密钥是否已激活
- 确认账户余额充足

### 网络连接问题
- 检查网络连接
- 确认防火墙设置
- 尝试使用VPN

### 服务不可用
- 检查DeepSeek服务状态
- 确认API版本兼容性
- 查看官方文档更新

## 📚 DeepSeek模型说明

### 可用模型
- `deepseek-chat`: 通用对话模型
- `deepseek-coder`: 代码生成模型

### 参数说明
- `temperature`: 0-2，控制输出随机性
- `max_tokens`: 最大输出令牌数
- `presence_penalty`: -2到2，控制话题重复
- `frequency_penalty`: -2到2，控制词汇重复

## 🎯 功能特性

### 智能助手能力
- 引力波物理知识解答
- 数据处理流程指导
- 数据质量分析
- 个性化操作建议
- 中文自然语言交互

### 本地回退机制
当DeepSeek API不可用时，系统会自动切换到本地回复模式，确保基本功能可用。

## 📞 技术支持

如遇到问题，请：
1. 检查配置是否正确
2. 查看控制台错误信息
3. 运行诊断脚本
4. 联系技术支持 