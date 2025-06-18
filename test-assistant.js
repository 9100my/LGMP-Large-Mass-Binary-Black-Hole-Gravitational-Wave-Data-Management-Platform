const http = require('http');
require('dotenv').config();

console.log('🔍 测试智能助手功能...\n');

// 检查环境变量
console.log('📝 环境变量检查:');
console.log('   DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '已配置' : '❌ 未配置');
console.log('   DEEPSEEK_BASE_URL:', process.env.DEEPSEEK_BASE_URL || '使用默认值');
console.log('');

// 1. 测试服务器连接
function testServerConnection() {
  return new Promise((resolve, reject) => {
    console.log('📝 1. 测试服务器连接...');
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      console.log('   状态码:', res.statusCode);
      if (res.statusCode === 200) {
        console.log('✅ 服务器连接正常');
        resolve();
      } else {
        console.log('❌ 服务器响应异常');
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      console.log('❌ 服务器连接失败:', error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 服务器可能没有运行，请启动服务器');
      }
      reject(error);
    });

    req.on('timeout', () => {
      console.log('❌ 服务器连接超时');
      req.destroy();
      reject(new Error('连接超时'));
    });

    req.end();
  });
}

// 2. 测试助手API（无需认证）
function testAssistantAPI() {
  return new Promise((resolve, reject) => {
    console.log('\n📝 2. 测试助手API...');
    
    const postData = JSON.stringify({
      message: '你好，测试消息',
      context: '测试上下文'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/assistant/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('   状态码:', res.statusCode);
        console.log('   响应:', data);
        
        if (res.statusCode === 401) {
          console.log('✅ 助手API存在，需要认证（正常）');
          resolve();
        } else if (res.statusCode === 404) {
          console.log('❌ 助手API路由不存在');
          reject(new Error('API路由未找到'));
        } else {
          console.log('⚠️ 意外响应');
          resolve();
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ 助手API请求失败:', error.message);
      reject(error);
    });

    req.on('timeout', () => {
      console.log('❌ 助手API请求超时');
      req.destroy();
      reject(new Error('请求超时'));
    });

    req.write(postData);
    req.end();
  });
}

// 3. 测试DeepSeek API配置
function testDeepSeekConfig() {
  console.log('\n📝 3. 测试DeepSeek配置...');
  
  if (!process.env.DEEPSEEK_API_KEY) {
    console.log('❌ DeepSeek API密钥未配置');
    console.log('💡 请创建.env文件并设置DEEPSEEK_API_KEY');
    console.log('   示例内容:');
    console.log('   DEEPSEEK_API_KEY=sk-your-api-key-here');
    console.log('   DEEPSEEK_BASE_URL=https://api.deepseek.com/v1');
    return Promise.reject(new Error('API密钥未配置'));
  }
  
  console.log('✅ DeepSeek API密钥已配置');
  return Promise.resolve();
}

// 主测试函数
async function runTests() {
  try {
    await testServerConnection();
    await testAssistantAPI();
    await testDeepSeekConfig();
    
    console.log('\n🎉 基础测试通过！');
    console.log('\n💡 如果智能助手仍然用不了，可能的原因：');
    console.log('   1. 需要先登录获取token');
    console.log('   2. DeepSeek API密钥无效');
    console.log('   3. 网络连接问题');
    console.log('   4. 前端组件问题');
    
  } catch (error) {
    console.log('\n❌ 测试失败:', error.message);
    console.log('\n💡 解决步骤：');
    console.log('   1. 确保服务器正在运行: npm run server');
    console.log('   2. 检查.env文件配置');
    console.log('   3. 检查网络连接');
  }
}

runTests(); 