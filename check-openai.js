const OpenAI = require('openai');
require('dotenv').config();

console.log('🔍 检查DeepSeek配置...\n');
DEEPSEEK_API_KEY=sk-f96016b2a6e344e7b55c5a4505b5a129
// 检查环境变量
const apiKey = process.env.DEEPSEEK_API_KEY;
const baseURL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';

console.log('📋 配置信息：');
console.log(`API Key: ${apiKey ? '✅ 已配置' : '❌ 未配置'}`);
console.log(`Base URL: ${baseURL}\n`);

if (!apiKey) {
  console.log('❌ 错误：未配置DEEPSEEK_API_KEY环境变量');
  console.log('\n💡 解决方法：');
  console.log('1. 在项目根目录创建.env文件');
  console.log('2. 添加以下内容：');
  console.log('   DEEPSEEK_API_KEY=your-api-key-here');
  console.log('   DEEPSEEK_BASE_URL=https://api.deepseek.com/v1');
  console.log('\n3. 重启服务器');
  process.exit(1);
}

// 创建DeepSeek客户端
const deepseek = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL
});

console.log('🧪 测试DeepSeek连接...');

// 测试连接
async function testConnection() {
  try {
    const completion = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "user", content: "Hello, this is a test message." }
      ],
      max_tokens: 50
    });

    console.log('✅ DeepSeek连接成功！');
    console.log('回复:', completion.choices[0].message.content);
    console.log('\n🎉 配置正确，智能助手可以正常使用！');
    
  } catch (error) {
    console.log('❌ DeepSeek连接失败:', error.message);
    
    if (error.status === 401) {
      console.log('💡 提示：API密钥无效，请检查DEEPSEEK_API_KEY');
    } else if (error.status === 429) {
      console.log('💡 提示：请求过于频繁，请稍后再试');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 提示：网络连接问题，请检查网络');
    } else {
      console.log('💡 提示：服务不可用，请检查API状态');
    }
    
    console.log('\n🔧 故障排除：');
    console.log('1. 确认API密钥正确');
    console.log('2. 检查网络连接');
    console.log('3. 确认DeepSeek服务状态');
    console.log('4. 尝试使用官方API地址');
  }
}

testConnection(); 