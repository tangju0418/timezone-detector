/**
 * 时区信息接口
 */
export interface TimezoneInfo {
  /** 时区标识符 (如: Asia/Shanghai) */
  identifier: string;
  /** 时区缩写 (如: CST) */
  abbreviation: string;
  /** UTC偏移量（分钟） */
  offsetMinutes: number;
  /** UTC偏移量字符串 (如: +08:00) */
  offsetString: string;
  /** 是否为夏令时 */
  isDST: boolean;
  /** 当前时间 */
  currentTime: Date;
}

/**
 * 获取当前时区信息
 * @returns 包含完整时区信息的对象
 */
export function getCurrentTimezone(): TimezoneInfo {
  const now = new Date();
  const identifier = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offsetMinutes = -now.getTimezoneOffset();
  
  // 计算偏移量字符串
  const hours = Math.floor(Math.abs(offsetMinutes) / 60);
  const minutes = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const offsetString = `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  // 获取时区缩写
  const abbreviation = getTimezoneAbbreviation(now, identifier);
  
  // 检测是否为夏令时
  const isDST = isDaylightSavingTime(now);
  
  return {
    identifier,
    abbreviation,
    offsetMinutes,
    offsetString,
    isDST,
    currentTime: now
  };
}

/**
 * 格式化输出时区信息
 * @param format 输出格式: 'simple' | 'detailed' | 'json'
 * @returns 格式化的时区信息字符串
 */
export function formatTimezone(format: 'simple' | 'detailed' | 'json' = 'simple'): string {
  const timezone = getCurrentTimezone();
  
  switch (format) {
    case 'simple':
      return `${timezone.identifier} (${timezone.offsetString})`;
    
    case 'detailed':
      return `时区: ${timezone.identifier}
缩写: ${timezone.abbreviation}
偏移: ${timezone.offsetString}
夏令时: ${timezone.isDST ? '是' : '否'}
当前时间: ${timezone.currentTime.toLocaleString()}`;
    
    case 'json':
      return JSON.stringify(timezone, null, 2);
    
    default:
      return `${timezone.identifier} (${timezone.offsetString})`;
  }
}

/**
 * 直接打印当前时区信息到控制台
 * @param format 输出格式
 */
export function printTimezone(format: 'simple' | 'detailed' | 'json' = 'detailed'): void {
  console.log(formatTimezone(format));
}

/**
 * 获取时区缩写
 */
function getTimezoneAbbreviation(date: Date, timeZone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone,
      timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    return timeZonePart?.value || 'N/A';
  } catch {
    return 'N/A';
  }
}

/**
 * 检测是否为夏令时
 */
function isDaylightSavingTime(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return date.getTimezoneOffset() < stdTimezoneOffset;
}

// 默认导出主要功能
export default {
  getCurrentTimezone,
  formatTimezone,
  printTimezone
};
