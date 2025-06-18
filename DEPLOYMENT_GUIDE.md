# 双黑洞引力波数据管理平台 - 部署指南

## 🚀 部署方案

### 方案一：云服务器部署（推荐）

#### 1. 购买云服务器
- **阿里云/腾讯云/华为云**：选择2核4G以上配置
- **操作系统**：Ubuntu 20.04 LTS 或 CentOS 8
- **带宽**：至少5Mbps

#### 2. 服务器环境配置
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2进程管理器
sudo npm install -g pm2

# 安装Nginx
sudo apt install nginx -y

# 安装MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 3. 项目部署
```bash
# 克隆项目到服务器
git clone <your-repository-url>
cd platform

# 安装依赖
npm run install-all

# 配置环境变量
cp env.example .env
# 编辑.env文件，设置数据库连接、API密钥等

# 构建前端
npm run build

# 使用PM2启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Nginx配置
```bash
sudo nano /etc/nginx/sites-available/gravitational-wave
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名

    # 前端静态文件
    location / {
        root /path/to/platform/client/build;
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket支持
    location /socket.io/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/gravitational-wave /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. 域名和SSL配置
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 方案二：Docker部署

#### 1. 创建Docker Compose配置
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000：5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/gravitational-wave
      - JWT_SECRET=your-jwt-secret
      - DEEPSEEK_API_KEY=your-deepseek-key
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./client/build:/usr/share/nginx/html
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongo_data:
```

#### 2. 部署命令
```bash
# 构建并启动
docker-compose -f docker-compose.prod.yml up -d

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f
```

### 方案三：Vercel/Netlify部署（前端）+ 云函数（后端）

#### 1. 前端部署到Vercel
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署前端
cd client
vercel --prod
```

#### 2. 后端部署到云函数
- 使用阿里云函数计算或腾讯云云函数
- 将后端API转换为云函数格式

## 🔧 环境变量配置

### 生产环境变量
```env
# .env.production
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://localhost:27017/gravitational-wave
JWT_SECRET=your-super-secret-jwt-key
DEEPSEEK_API_KEY=your-deepseek-api-key
CORS_ORIGIN=https://your-domain.com
```

## 📊 性能优化

### 1. 数据库优化
```javascript
// 添加数据库索引
db.users.createIndex({ "username": 1 }, { unique: true })
db.projects.createIndex({ "userId": 1 })
db.dataGroups.createIndex({ "projectId": 1 })
```

### 2. 缓存配置
```javascript
// Redis缓存
const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});
```

### 3. 负载均衡
```nginx
# Nginx负载均衡配置
upstream app_servers {
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
    server 127.0.0.1:5003;
}
```

## 🔒 安全配置

### 1. 防火墙设置
```bash
# 只开放必要端口
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. 安全头配置
```nginx
# 添加安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📈 监控和日志

### 1. PM2监控
```bash
# 查看应用状态
pm2 status
pm2 logs
pm2 monit
```

### 2. 日志管理
```javascript
// 使用Winston日志
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 🚀 快速部署脚本

### 一键部署脚本
```bash
#!/bin/bash
# deploy.sh

echo "🚀 开始部署双黑洞引力波数据管理平台..."

# 更新代码
git pull origin main

# 安装依赖
npm run install-all

# 构建前端
npm run build

# 重启应用
pm2 restart all

echo "✅ 部署完成！"
```

## 📞 技术支持

如果遇到部署问题，请检查：
1. 服务器防火墙设置
2. 域名DNS解析
3. SSL证书配置
4. 数据库连接
5. 环境变量配置

## 🌍 访问地址

部署完成后，用户可以通过以下地址访问：
- **HTTP**: http://your-domain.com
- **HTTPS**: https://your-domain.com 