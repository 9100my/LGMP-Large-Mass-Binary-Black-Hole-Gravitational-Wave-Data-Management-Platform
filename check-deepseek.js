const https = require('https');
require('dotenv').config();

console.log('🔍 检查DeepSeek API配置...\n');

// 检查环境变量
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';

console.log('📝 配置信息:');
console.log('   API密钥:', DEEPSEEK_API_KEY ? '已配置' : '❌ 未配置');
console.log('   Base URL:', DEEPSEEK_BASE_URL);
console.log('');

if (!DEEPSEEK_API_KEY) {
  console.log('❌ DeepSeek API密钥未配置！');
  console.log('💡 请在.env文件中设置DEEPSEEK_API_KEY');
  console.log('   示例: DEEPSEEK_API_KEY=sk-your-api-key-here');
  process.exit(1);
}

// 测试API连接
console.log('📝 测试DeepSeek API连接...');

const testMessage = "你好，请简单介绍一下引力波";

const postData = JSON.stringify({
  model: 'deepseek-chat',
  messages: [
    {
      role: 'system',
      content: '你是一个专业的引力波数据分析助手。'
    },
    {
      role: 'user',
      content: testMessage
    }
  ],
  temperature: 0.7,
  max_tokens: 500,
  stream: false
});

const options = {
  hostname: 'api.deepseek.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 30000
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('   状态码:', res.statusCode);
    
    if (res.statusCode === 200) {
      try {
        const response = JSON.parse(data);
        if (response.choices && response.choices[0]) {
          console.log('✅ DeepSeek API连接成功！');
          console.log('   测试消息:', testMessage);
          console.log('   响应内容:', response.choices[0].message.content.substring(0, 100) + '...');
          console.log('\n🎉 DeepSeek API配置正确，智能助手功能可用！');
        } else {
          console.log('❌ DeepSeek API响应格式错误');
          console.log('   响应数据:', data);
        }
      } catch (error) {
        console.log('❌ 解析响应失败:', error.message);
        console.log('   原始响应:', data);
      }
    } else {
      console.log('❌ DeepSeek API请求失败');
      console.log('   错误响应:', data);
      
      try {
        const errorResponse = JSON.parse(data);
        if (errorResponse.error) {
          console.log('   错误信息:', errorResponse.error.message || errorResponse.error);
        }
      } catch (parseError) {
        console.log('   无法解析错误信息');
      }
    }
  });
});

req.on('error', (error) => {
  console.log('❌ 请求错误:', error.message);
  if (error.code === 'ENOTFOUND') {
    console.log('💡 网络连接问题，请检查网络设置');
  } else if (error.code === 'ECONNREFUSED') {
    console.log('💡 连接被拒绝，请检查防火墙设置');
  }
});

req.on('timeout', () => {
  console.log('❌ 请求超时');
  req.destroy();
});

req.write(postData);
req.end(); 