const http = require('http');

console.log('🔍 测试服务器连接...\n');

// 测试健康检查端点
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log('✅ 服务器响应状态:', res.statusCode);
  console.log('响应头:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应数据:', data);
    console.log('✅ 服务器连接正常！');
  });
});

req.on('error', (error) => {
  console.error('❌ 连接错误:', error.message);
  if (error.code === 'ECONNREFUSED') {
    console.error('服务器可能没有运行，请确保后端服务器已启动');
  }
});

req.on('timeout', () => {
  console.error('❌ 请求超时');
  req.destroy();
});

req.end(); 