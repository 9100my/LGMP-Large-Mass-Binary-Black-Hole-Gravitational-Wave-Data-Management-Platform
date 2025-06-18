const fs = require('fs');
const path = require('path');

console.log('🔍 检查项目设置...\n');

// 检查必要的文件
const requiredFiles = [
  'package.json',
  'server/package.json',
  'client/package.json',
  'server/index.js',
  'client/src/index.js',
  'client/src/App.js',
  'server/database/init.js',
  'README.md'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 缺失`);
    allFilesExist = false;
  }
});

console.log('\n📁 检查目录结构...');

// 检查必要的目录
const requiredDirs = [
  'server/routes',
  'server/database',
  'client/src/components',
  'client/src/pages',
  'client/src/services',
  'client/src/contexts',
  'client/public'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - 缺失`);
    allFilesExist = false;
  }
});

console.log('\n📦 检查依赖配置...');

// 检查package.json中的脚本
try {
  const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = rootPackage.scripts || {};
  
  const requiredScripts = ['dev', 'server', 'client', 'install-all'];
  requiredScripts.forEach(script => {
    if (scripts[script]) {
      console.log(`✅ npm run ${script}`);
    } else {
      console.log(`❌ npm run ${script} - 缺失`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log(`❌ 无法读取package.json: ${error.message}`);
  allFilesExist = false;
}

console.log('\n🔧 检查环境配置...');

// 检查是否有.env文件或示例
if (fs.existsSync('.env')) {
  console.log('✅ .env 文件存在');
} else if (fs.existsSync('.env.example')) {
  console.log('⚠️  发现 .env.example，请复制为 .env 并配置环境变量');
} else {
  console.log('❌ 未找到环境配置文件');
  allFilesExist = false;
}

console.log('\n📊 检查结果...');

if (allFilesExist) {
  console.log('🎉 项目设置检查通过！');
  console.log('\n🚀 下一步：');
  console.log('1. 配置环境变量（创建 .env 文件）');
  console.log('2. 运行 npm run install-all 安装依赖');
  console.log('3. 运行 npm run dev 启动开发服务器');
  console.log('4. 访问 http://localhost:3000');
  console.log('5. 使用默认账户登录：admin / admin123');
} else {
  console.log('❌ 项目设置检查失败，请修复上述问题');
  process.exit(1);
} 