#!/bin/bash

# 双黑洞引力波数据管理平台 - 一键部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始部署双黑洞引力波数据管理平台..."
echo "=================================="

# 检查Node.js版本
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js版本过低，需要18+，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js版本: $(node -v)"

# 检查PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装PM2..."
    npm install -g pm2
fi

# 创建日志目录
echo "📁 创建日志目录..."
mkdir -p logs

# 安装依赖
echo "📦 安装项目依赖..."
npm run install-all

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "⚠️  环境变量文件不存在，复制示例文件..."
    cp env.example .env
    echo "📝 请编辑 .env 文件配置必要的环境变量"
    echo "   特别是: MONGODB_URI, JWT_SECRET, DEEPSEEK_API_KEY"
fi

# 构建前端
echo "🔨 构建前端应用..."
npm run build

# 检查构建结果
if [ ! -d "client/build" ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

echo "✅ 前端构建成功"

# 启动应用
echo "🚀 启动应用..."
if pm2 list | grep -q "gravitational-wave-server"; then
    echo "🔄 重启现有应用..."
    pm2 restart gravitational-wave-server
else
    echo "🆕 启动新应用..."
    pm2 start ecosystem.config.js --env production
fi

# 保存PM2配置
pm2 save

# 设置开机自启
pm2 startup

echo ""
echo "✅ 部署完成！"
echo "=================================="
echo "📊 应用状态:"
pm2 status

echo ""
echo "🌐 访问地址:"
echo "   本地: http://localhost:5001"
echo "   网络: http://$(hostname -I | awk '{print $1}'):5001"
echo ""
echo "📋 常用命令:"
echo "   查看日志: pm2 logs"
echo "   监控应用: pm2 monit"
echo "   重启应用: pm2 restart all"
echo "   停止应用: pm2 stop all"
echo ""
echo "🔧 如果需要在公网访问，请参考 DEPLOYMENT_GUIDE.md" 