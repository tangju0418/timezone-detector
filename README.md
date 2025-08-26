# timezone-detector

一个简单易用的 TypeScript 时区检测工具，用于获取和格式化当前系统时区信息。

## 安装

```bash
npm install timezone-detector
```

## 功能特性

- 🌍 检测当前系统时区
- 📍 获取时区标识符 (如: Asia/Shanghai)
- ⏰ 计算 UTC 偏移量
- 🏷️ 获取时区缩写
- 🌞 检测夏令时状态
- 📊 支持多种输出格式
- 🔧 完整的 TypeScript 支持

## 快速开始

### 基础用法

```typescript
import { getCurrentTimezone, formatTimezone, printTimezone } from 'timezone-detector';

// 获取完整时区信息
const timezone = getCurrentTimezone();
console.log(timezone);
/*
{
  identifier: "Asia/Shanghai",
  abbreviation: "CST",
  offsetMinutes: 480,
  offsetString: "+08:00",
  isDST: false,
  currentTime: 2024-01-01T12:00:00.000Z
}
*/

// 格式化输出
console.log(formatTimezone('simple'));    // Asia/Shanghai (+08:00)
console.log(formatTimezone('detailed'));  // 详细信息
console.log(formatTimezone('json'));      // JSON 格式

// 直接打印到控制台
printTimezone('detailed');
```

### 在 Node.js 中使用

```javascript
const { getCurrentTimezone } = require('timezone-detector');

const timezone = getCurrentTimezone();
console.log(`当前时区: ${timezone.identifier}`);
console.log(`UTC偏移: ${timezone.offsetString}`);
```

### 在浏览器中使用

```html
<script src="node_modules/timezone-detector/dist/index.js"></script>
<script>
  const timezone = TimezoneDetector.getCurrentTimezone();
  console.log('时区信息:', timezone);
</script>
```

## API 文档

### `getCurrentTimezone(): TimezoneInfo`

获取当前时区的完整信息。

**返回值:**
```typescript
interface TimezoneInfo {
  identifier: string;      // 时区标识符 (如: Asia/Shanghai)
  abbreviation: string;    // 时区缩写 (如: CST)
  offsetMinutes: number;   // UTC偏移量（分钟）
  offsetString: string;    // UTC偏移量字符串 (如: +08:00)
  isDST: boolean;         // 是否为夏令时
  currentTime: Date;      // 当前时间
}
```

### `formatTimezone(format?: 'simple' | 'detailed' | 'json'): string`

格式化时区信息为字符串。

**参数:**
- `format` (可选): 输出格式，默认为 'simple'
  - `'simple'`: 简单格式 - "Asia/Shanghai (+08:00)"
  - `'detailed'`: 详细格式 - 包含所有信息的多行文本
  - `'json'`: JSON 格式 - 完整的 JSON 字符串

### `printTimezone(format?: 'simple' | 'detailed' | 'json'): void`

直接将时区信息打印到控制台。

## 示例场景

### 1. 服务器日志记录

```typescript
import { getCurrentTimezone } from 'timezone-detector';

function logWithTimezone(message: string) {
  const tz = getCurrentTimezone();
  console.log(`[${tz.currentTime.toISOString()}] [${tz.identifier}] ${message}`);
}

logWithTimezone('应用启动');
// [2024-01-01T04:00:00.000Z] [Asia/Shanghai] 应用启动
```

### 2. API 响应中包含时区信息

```typescript
import express from 'express';
import { getCurrentTimezone } from 'timezone-detector';

const app = express();

app.get('/api/server-info', (req, res) => {
  res.json({
    serverTime: new Date(),
    timezone: getCurrentTimezone(),
    status: 'ok'
  });
});
```

### 3. 时区转换工具

```typescript
import { getCurrentTimezone } from 'timezone-detector';

function getLocalTime() {
  const tz = getCurrentTimezone();
  return {
    localTime: tz.currentTime.toLocaleString(),
    timezone: tz.identifier,
    utcOffset: tz.offsetString
  };
}
```

## 开发

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 开发模式
npm run dev
```

## 兼容性

- Node.js >= 14.0.0
- 现代浏览器 (支持 Intl.DateTimeFormat)
- TypeScript >= 4.0.0

## 许可证

MIT

## 贡献

欢迎提交 Issues 和 Pull Requests！

---

> 如果这个包对你有帮助，请给个 ⭐️ 支持一下！
