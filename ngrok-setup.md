# 内网穿透配置指南 - 使用ngrok

## 🚀 快速让其他人访问你的应用

### 方案一：使用ngrok（推荐，免费）

#### 1. 安装ngrok
```bash
# 下载ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip

# 解压
unzip ngrok-v3-stable-windows-amd64.zip

# 移动到系统路径
sudo mv ngrok /usr/local/bin/
```

#### 2. 注册ngrok账号
1. 访问 https://ngrok.com/
2. 注册免费账号
3. 获取你的authtoken

#### 3. 配置ngrok
```bash
# 设置authtoken
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

#### 4. 启动内网穿透
```bash
# 启动你的应用
npm run dev

# 在另一个终端启动ngrok
ngrok http 5001
```

#### 5. 获取公网地址
ngrok会显示类似这样的信息：
```
Forwarding    https://abc123.ngrok.io -> http://localhost:5001
```

其他人就可以通过 `https://abc123.ngrok.io` 访问你的应用了！

### 方案二：使用frp（免费，自建服务器）

#### 1. 下载frp
```bash
# 下载frp
wget https://github.com/fatedier/frp/releases/download/v0.51.3/frp_0.51.3_windows_amd64.tar.gz
tar -zxvf frp_0.51.3_windows_amd64.tar.gz
cd frp_0.51.3_windows_amd64
```

#### 2. 配置frpc.ini
```ini
[common]
server_addr = your-frp-server.com
server_port = 7000
token = your-token

[gravitational-wave]
type = http
local_port = 5001
custom_domains = your-domain.com
```

#### 3. 启动frp客户端
```bash
./frpc -c frpc.ini
```

### 方案三：使用Cloudflare Tunnel（免费）

#### 1. 安装cloudflared
```bash
# Windows
# 下载 https://github.com/cloudflare/cloudflared/releases

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
```

#### 2. 登录Cloudflare
```bash
cloudflared tunnel login
```

#### 3. 创建隧道
```bash
cloudflared tunnel create gravitational-wave
```

#### 4. 配置隧道
创建 `~/.cloudflared/config.yml`：
```yaml
tunnel: your-tunnel-id
credentials-file: ~/.cloudflared/your-tunnel-id.json

ingress:
  - hostname: your-domain.com
    service: http://localhost:5001
  - service: http_status:404
```

#### 5. 启动隧道
```bash
cloudflared tunnel run gravitational-wave
```

## 🔧 自动化脚本

### ngrok自动启动脚本
```bash
#!/bin/bash
# start-ngrok.sh

echo "🚀 启动双黑洞引力波平台..."
echo "=================================="

# 启动应用
echo "📱 启动应用服务器..."
npm run dev &

# 等待应用启动
sleep 5

# 启动ngrok
echo "🌐 启动内网穿透..."
ngrok http 5001

echo "✅ 启动完成！"
echo "🌍 其他人可以通过ngrok提供的地址访问你的应用"
```

### 使用方法
```bash
chmod +x start-ngrok.sh
./start-ngrok.sh
```

## 📋 注意事项

### 1. 安全性
- ngrok免费版会显示你的本地IP
- 建议设置应用的用户认证
- 定期更换ngrok地址

### 2. 性能
- 免费版有连接数限制
- 网络延迟可能较高
- 适合演示和测试

### 3. 稳定性
- 免费版地址会定期变化
- 建议升级到付费版获得固定域名
- 自建frp服务器更稳定

## 🌟 推荐方案

### 开发测试阶段
- 使用ngrok免费版
- 快速分享给同事测试

### 正式部署
- 购买云服务器
- 使用域名和SSL证书
- 参考 `DEPLOYMENT_GUIDE.md`

## 📞 常见问题

### Q: ngrok地址总是变化怎么办？
A: 升级到付费版或使用自建frp服务器

### Q: 连接速度慢怎么办？
A: 选择离你最近的ngrok服务器或使用自建服务器

### Q: 如何设置固定域名？
A: 购买域名并配置DNS解析，或使用付费版ngrok

### Q: 安全吗？
A: 建议设置用户认证，不要暴露敏感数据 