require('dotenv').config();

console.log('🔍 环境变量检查:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? '已配置' : '未配置');
console.log('DEEPSEEK_BASE_URL:', process.env.DEEPSEEK_BASE_URL || '使用默认值');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '已配置' : '未配置');

if (process.env.DEEPSEEK_API_KEY) {
  console.log('✅ DeepSeek API密钥已正确配置');
} else {
  console.log('❌ DeepSeek API密钥未配置');
  console.log('💡 请检查 .env 文件是否存在且包含正确的配置');
} 