# 双黑洞引力波数据管理平台

一个专门用于双黑洞引力波数据管理、处理、可视化和分析的综合性平台，集成智能助手。

## 功能特性

### 🔐 用户认证系统
- 用户注册和登录
- JWT令牌认证
- 权限管理

### 📊 项目管理
- 创建和管理项目
- 项目成员管理
- 项目权限控制

### 📁 数据管理
- 数据组创建和管理
- 文件上传和存储
- 数据分类和标签
- **数据分析**：智能分析上传的数据质量

### 🔄 数据处理
- 工作流设计和执行
- 数据预处理
- 降噪处理
- 批量处理

### 📈 数据可视化
- 交互式图表
- 实时数据展示
- 参数调节
- 多维度分析

### 🤖 智能助手 
- **智能问答**：专业回答引力波相关问题
- **数据分析**：分析用户上传的数据，提供质量评估
- **个性化建议**：基于用户数据情况提供定制化建议
- **快速操作**：智能推荐常用操作
- **数据统计**：实时显示用户数据统计信息

### 🎯 虚拟数据生成
- 参数化数据生成
- 模拟信号创建
- 测试数据生成

## 智能助手功能详解

### 🧠 DEEPSEEK集成
- 支持中文对话，专业回答引力波相关问题
- 结合用户实际数据提供个性化建议

### 📊 数据分析能力
- **数据质量评估**：分析数据完整性、噪声水平、信噪比
- **统计报告**：生成数据统计摘要、趋势分析
- **处理建议**：基于数据特征推荐合适的处理方法
- **异常检测**：识别数据中的异常模式和问题

### 🎯 个性化功能
- **用户数据统计**：显示项目、数据组、序列数量
- **智能建议**：根据用户数据情况推荐操作
- **快速操作**：提供常用问题的快速按钮
- **上下文感知**：基于当前页面和数据提供相关建议

### 📱 界面特性
- **固定位置**：右下角圆形按钮，随时可用
- **实时对话**：支持连续对话，保持上下文
- **美观界面**：现代化UI设计，良好的用户体验
- **响应式设计**：适配不同屏幕尺寸

## 技术栈

### 后端
- **Node.js** + **Express.js**
- **SQLite** 数据库
- **JWT** 认证
- **DEEPSEEK** 集成
- **Multer** 文件上传
- **Helmet** 安全中间件

### 前端
- **React** 18
- **Ant Design** UI组件库
- **React Router** 路由管理
- **Recharts** 数据可视化
- **Axios** HTTP客户端
- **Styled Components** 样式管理

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- DEEPSEEK密钥

### 安装依赖

```bash
# 安装所有依赖
npm run install-all

# 或者分别安装
npm install
cd server && npm install
cd ../client && npm install
```

### 环境配置

1. 复制环境配置示例文件：
```bash
cp env.example .env
```

2. 编辑 `.env` 文件，配置必要的环境变量：
```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 客户端URL
CLIENT_URL=http://localhost:3000

# JWT密钥
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# OpenAI配置 (必需)
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_BASE_URL=https://xiaoai.plus/v1

# 数据库配置
DB_PATH=./database/gravitational_wave.db

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=50mb
```

### 启动应用

```bash
# 开发模式（同时启动前后端）
npm run dev

# 或者分别启动
npm run server  # 启动后端服务器
npm run client  # 启动前端开发服务器
```

### 访问应用

- 前端应用：http://localhost:3000
- 后端API：http://localhost:5000
- API文档：http://localhost:5000/api/health

## 默认账户

系统会自动创建默认管理员账户：
- 用户名：admin
- 密码：admin123

## API接口

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 项目管理
- `GET /api/projects` - 获取项目列表
- `POST /api/projects` - 创建项目
- `PUT /api/projects/:id` - 更新项目
- `DELETE /api/projects/:id` - 删除项目
- `POST /api/projects/:id/members` - 添加项目成员

### 数据管理
- `GET /api/data-groups` - 获取数据组列表
- `POST /api/data-groups` - 创建数据组
- `POST /api/data-groups/:id/upload` - 上传文件
- `DELETE /api/data-groups/:id` - 删除数据组

### 工作流管理
- `GET /api/workflows` - 获取工作流列表
- `POST /api/workflows` - 创建工作流
- `POST /api/workflows/:id/execute` - 执行工作流

### 数据可视化
- `GET /api/visualization/data` - 获取可视化数据
- `GET /api/visualization/signals` - 获取模拟信号
- `GET /api/visualization/comparison` - 获取对比数据

### 智能助手 
- `POST /api/assistant/query` - 智能对话
- `GET /api/assistant/quick-actions` - 获取操作建议
- `POST /api/assistant/analyze-data` - 数据分析

## 智能助手使用指南

### 🚀 快速开始
1. 登录系统后，在右下角找到智能助手按钮（🤖）
2. 点击按钮打开智能助手对话框
3. 开始对话

### 💬 对话示例
```
用户：如何上传数据？
助手：我来指导您上传数据...

用户：分析我的数据质量
助手：基于您的数据统计，我来为您分析...

用户：什么是引力波？
助手：引力波是时空的涟漪...
```

### 📊 数据分析功能
1. 在数据管理页面，点击"数据分析"按钮
2. 系统会使用GPT-4o分析该数据组
3. 查看详细的分析报告和建议

### 🎯 快速操作
- 点击快速操作按钮，自动发送预设问题
- 系统会根据您的数据情况推荐相关操作
- 支持一键跳转到相关功能页面

## 项目结构

```
platform/
├── client/                 # 前端React应用
│   ├── public/            # 静态文件
│   └── src/
│       ├── components/    # React组件
│       │   └── Assistant.js  # 智能助手组件
│       ├── pages/         # 页面组件
│       ├── services/      # API服务
│       ├── contexts/      # React上下文
│       └── index.js       # 应用入口
├── server/                # 后端Node.js应用
│   ├── routes/           # API路由
│   │   └── assistant.js  # 智能助手路由
│   ├── middleware/       # 中间件
│   │   └── auth.js       # 认证中间件
│   ├── database/         # 数据库相关
│   └── index.js          # 服务器入口
├── package.json          # 根项目配置
└── README.md            # 项目说明
```

## 开发指南

### 添加新功能
1. 在后端 `routes/` 目录下创建新的路由文件
2. 在 `server/index.js` 中注册新路由
3. 在前端 `services/api.js` 中添加API调用
4. 在 `pages/` 或 `components/` 中创建对应的UI组件

### 数据库修改
1. 修改 `server/database/init.js` 中的表结构
2. 删除现有的数据库文件重新初始化
3. 或者编写数据库迁移脚本

### 样式定制
- 全局样式：`client/src/index.css`
- 组件样式：`client/src/App.css`
- 主题色彩：使用CSS变量或Ant Design主题配置

### 智能助手扩展
1. 修改 `server/routes/assistant.js` 中的系统提示词
2. 在 `getUserDataContext` 函数中添加更多数据上下文
3. 在前端 `components/Assistant.js` 中添加新的UI功能

## 部署

### 生产环境部署
1. 设置 `NODE_ENV=production`
2. 配置生产环境的数据库
3. 设置安全的JWT密钥
4. 配置密钥
5. 配置HTTPS
6. 使用PM2或Docker进行部署

### Docker部署
```bash
# 构建镜像
docker build -t gravitational-wave-platform .

# 运行容器
docker run -p 3000:3000 -p 5000:5000 gravitational-wave-platform
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目维护者： 赵子阳
- 项目链接：https://github.com/your-username/gravitational-wave-platform

## 更新日志

### v1.1.0
- 升级智能助手到GPT-4o模型
- 添加数据分析功能
- 改进用户界面和用户体验
- 添加个性化建议功能

### v1.0.0
- 初始版本发布
- 基础功能实现
- 用户认证系统
- 数据管理功能
- 可视化界面
- 智能助手集成 