const fs = require('fs');
const path = require('path');

// style 目录
const STYLE_ROOT = path.join(__dirname, '../src/assets/style/');

// 需要生成的文件
const TARGET_FILE = 'index.less';

// 需要排除的文件夹内的文件
const EXCLUDE_FILE = [ TARGET_FILE ];

// 获取文件列表
const getFileList = filePath => fs.readdirSync(filePath).map(filename => fs.statSync(path.join(filePath, filename)).isFile() && filename).filter(file => !!file && !EXCLUDE_FILE.includes(file));

// 写入 CSS import 的列表
fs.writeFileSync(path.join(STYLE_ROOT, TARGET_FILE), getFileList(STYLE_ROOT).map(file => `@import './${file}';`).join('\r\n'));
