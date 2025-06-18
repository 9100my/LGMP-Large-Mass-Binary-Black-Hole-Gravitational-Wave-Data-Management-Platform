const http = require('http');

console.log('🔍 诊断登录问题...\n');

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
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('✅ 服务器连接正常');
        console.log('   状态码:', res.statusCode);
        console.log('   响应:', data);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log('❌ 服务器连接失败:', error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('   建议：确保后端服务器已启动 (npm run server)');
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

// 2. 测试登录API
function testLoginAPI() {
  return new Promise((resolve, reject) => {
    console.log('\n📝 2. 测试登录API...');
    
    const postData = JSON.stringify({
      username: 'admin',
      password: 'admin123'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
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
        console.log('✅ 登录API响应正常');
        console.log('   状态码:', res.statusCode);
        console.log('   响应:', data);
        
        try {
          const response = JSON.parse(data);
          if (response.token) {
            console.log('✅ 登录成功，获得token');
            resolve(response.token);
          } else {
            console.log('❌ 登录失败，未获得token');
            reject(new Error('登录失败'));
          }
        } catch (error) {
          console.log('❌ 响应格式错误');
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ 登录API请求失败:', error.message);
      reject(error);
    });

    req.on('timeout', () => {
      console.log('❌ 登录API请求超时');
      req.destroy();
      reject(new Error('请求超时'));
    });

    req.write(postData);
    req.end();
  });
}

// 3. 测试token验证
function testTokenVerification(token) {
  return new Promise((resolve, reject) => {
    console.log('\n📝 3. 测试token验证...');
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/verify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': 2
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('✅ Token验证API响应正常');
        console.log('   状态码:', res.statusCode);
        console.log('   响应:', data);
        
        try {
          const response = JSON.parse(data);
          if (response.valid) {
            console.log('✅ Token验证成功');
            resolve();
          } else {
            console.log('❌ Token验证失败');
            reject(new Error('Token无效'));
          }
        } catch (error) {
          console.log('❌ 响应格式错误');
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Token验证请求失败:', error.message);
      reject(error);
    });

    req.on('timeout', () => {
      console.log('❌ Token验证请求超时');
      req.destroy();
      reject(new Error('请求超时'));
    });

    req.write('{}');
    req.end();
  });
}

// 4. 检查数据库
function checkDatabase() {
  console.log('\n📝 4. 检查数据库...');
  console.log('   数据库文件: server/database/gravitational_wave.db');
  console.log('   默认用户: admin / admin123');
  console.log('   建议：如果数据库不存在，请运行 npm run test-setup');
}

// 主诊断函数
async function diagnose() {
  try {
    await testServerConnection();
    const token = await testLoginAPI();
    await testTokenVerification(token);
    checkDatabase();
    
    console.log('\n🎉 诊断完成！所有测试通过');
    console.log('\n💡 如果前端仍然无法登录，请检查：');
    console.log('   1. 浏览器控制台是否有错误信息');
    console.log('   2. 网络请求是否正常');
    console.log('   3. 前端代理配置是否正确');
    
  } catch (error) {
    console.log('\n❌ 诊断发现问题：', error.message);
    console.log('\n💡 建议解决方案：');
    console.log('   1. 确保后端服务器正在运行');
    console.log('   2. 检查端口5000是否被占用');
    console.log('   3. 重新启动服务器');
    console.log('   4. 检查数据库是否正确初始化');
  }
}

diagnose(); 