const http = require('http');

console.log('🔍 快速测试注册功能...\n');

// 测试数据
const testData = {
  username: 'testuser_' + Date.now(),
  email: `test${Date.now()}@example.com`,
  password: 'TestPass123!'  // 符合所有要求：大写、小写、数字、特殊字符
};

console.log('📝 测试数据:');
console.log('   用户名:', testData.username);
console.log('   邮箱:', testData.email);
console.log('   密码:', testData.password);
console.log('');

// 测试注册
const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 5000
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📝 注册响应:');
    console.log('   状态码:', res.statusCode);
    console.log('   响应:', data);
    
    if (res.statusCode === 201) {
      console.log('✅ 注册成功！');
      console.log('\n💡 现在您可以使用以下信息登录：');
      console.log('   用户名:', testData.username);
      console.log('   邮箱:', testData.email);
      console.log('   密码:', testData.password);
    } else {
      console.log('❌ 注册失败');
      try {
        const response = JSON.parse(data);
        console.log('   错误信息:', response.error);
        if (response.details) {
          console.log('   详细信息:', response.details);
        }
      } catch (error) {
        console.log('   无法解析错误信息');
      }
    }
  });
});

req.on('error', (error) => {
  console.log('❌ 请求失败:', error.message);
  if (error.code === 'ECONNREFUSED') {
    console.log('💡 服务器可能没有运行，请启动服务器：npm run server');
  }
});

req.on('timeout', () => {
  console.log('❌ 请求超时');
  req.destroy();
});

req.write(postData);
req.end(); 