const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 测试数据
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'Test123!'
};

const testLogin = {
  username: 'testuser',
  password: 'Test123!'
};

// 测试函数
async function testAuth() {
  console.log('🧪 开始测试认证系统...\n');

  try {
    // 1. 测试注册
    console.log('1️⃣ 测试用户注册...');
    const registerResponse = await api.post('/auth/register', testUser);
    console.log('✅ 注册成功:', registerResponse.data.message);
    console.log('用户信息:', registerResponse.data.user);
    console.log('Token:', registerResponse.data.token.substring(0, 20) + '...\n');

    // 2. 测试重复注册
    console.log('2️⃣ 测试重复注册...');
    try {
      await api.post('/auth/register', testUser);
    } catch (error) {
      console.log('✅ 重复注册被正确拒绝:', error.response.data.error);
    }
    console.log('');

    // 3. 测试登录
    console.log('3️⃣ 测试用户登录...');
    const loginResponse = await api.post('/auth/login', testLogin);
    console.log('✅ 登录成功:', loginResponse.data.message);
    console.log('用户信息:', loginResponse.data.user);
    console.log('Token:', loginResponse.data.token.substring(0, 20) + '...\n');

    // 4. 测试错误密码登录
    console.log('4️⃣ 测试错误密码登录...');
    try {
      await api.post('/auth/login', { ...testLogin, password: 'wrongpassword' });
    } catch (error) {
      console.log('✅ 错误密码被正确拒绝:', error.response.data.error);
    }
    console.log('');

    // 5. 测试获取用户信息
    console.log('5️⃣ 测试获取用户信息...');
    const token = loginResponse.data.token;
    const meResponse = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ 获取用户信息成功:', meResponse.data.user);
    console.log('');

    // 6. 测试验证token
    console.log('6️⃣ 测试验证token...');
    const verifyResponse = await api.post('/auth/verify', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Token验证成功:', verifyResponse.data.message);
    console.log('');

    // 7. 测试修改密码
    console.log('7️⃣ 测试修改密码...');
    const newPassword = 'NewTest123!';
    const changePasswordResponse = await api.post('/auth/change-password', {
      currentPassword: testUser.password,
      newPassword: newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ 密码修改成功:', changePasswordResponse.data.message);
    console.log('');

    // 8. 测试新密码登录
    console.log('8️⃣ 测试新密码登录...');
    const newLoginResponse = await api.post('/auth/login', {
      username: testUser.username,
      password: newPassword
    });
    console.log('✅ 新密码登录成功:', newLoginResponse.data.message);
    console.log('');

    // 9. 测试登出
    console.log('9️⃣ 测试登出...');
    const logoutResponse = await api.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ 登出成功:', logoutResponse.data.message);
    console.log('');

    console.log('🎉 所有测试通过！认证系统工作正常。');

  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
  }
}

// 测试默认管理员账号
async function testAdminLogin() {
  console.log('\n🔐 测试默认管理员账号...\n');

  try {
    const adminLogin = {
      username: 'admin',
      password: 'admin123'
    };

    const loginResponse = await api.post('/auth/login', adminLogin);
    console.log('✅ 管理员登录成功:', loginResponse.data.message);
    console.log('管理员信息:', loginResponse.data.user);
    console.log('');

  } catch (error) {
    console.error('❌ 管理员登录失败:', error.response?.data || error.message);
  }
}

// 运行测试
async function runTests() {
  await testAuth();
  await testAdminLogin();
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testAuth, testAdminLogin }; 