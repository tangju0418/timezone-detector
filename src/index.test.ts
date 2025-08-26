import { getCurrentTimezone, formatTimezone, TimezoneInfo } from './index';

describe('timezone-detector', () => {
  describe('getCurrentTimezone', () => {
    it('应该返回正确的时区信息结构', () => {
      const timezone = getCurrentTimezone();
      
      expect(timezone).toHaveProperty('identifier');
      expect(timezone).toHaveProperty('abbreviation');
      expect(timezone).toHaveProperty('offsetMinutes');
      expect(timezone).toHaveProperty('offsetString');
      expect(timezone).toHaveProperty('isDST');
      expect(timezone).toHaveProperty('currentTime');
      
      expect(typeof timezone.identifier).toBe('string');
      expect(typeof timezone.abbreviation).toBe('string');
      expect(typeof timezone.offsetMinutes).toBe('number');
      expect(typeof timezone.offsetString).toBe('string');
      expect(typeof timezone.isDST).toBe('boolean');
      expect(timezone.currentTime).toBeInstanceOf(Date);
    });

    it('时区标识符应该是有效格式', () => {
      const timezone = getCurrentTimezone();
      
      // 时区标识符应该包含/字符 (如: Asia/Shanghai)
      expect(timezone.identifier).toMatch(/^[A-Za-z_]+\/[A-Za-z_]+/);
    });

    it('偏移量字符串应该是正确格式', () => {
      const timezone = getCurrentTimezone();
      
      // 格式应该是 +HH:MM 或 -HH:MM
      expect(timezone.offsetString).toMatch(/^[+-]\d{2}:\d{2}$/);
    });

    it('偏移量分钟数应该与偏移量字符串一致', () => {
      const timezone = getCurrentTimezone();
      
      const sign = timezone.offsetString.startsWith('+') ? 1 : -1;
      const [hours, minutes] = timezone.offsetString.slice(1).split(':').map(Number);
      const calculatedMinutes = sign * (hours * 60 + minutes);
      
      expect(timezone.offsetMinutes).toBe(calculatedMinutes);
    });
  });

  describe('formatTimezone', () => {
    it('simple格式应该返回基本时区信息', () => {
      const result = formatTimezone('simple');
      
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[A-Za-z_]+\/[A-Za-z_]+ \([+-]\d{2}:\d{2}\)$/);
    });

    it('detailed格式应该包含所有信息', () => {
      const result = formatTimezone('detailed');
      
      expect(result).toContain('时区:');
      expect(result).toContain('缩写:');
      expect(result).toContain('偏移:');
      expect(result).toContain('夏令时:');
      expect(result).toContain('当前时间:');
    });

    it('json格式应该返回有效的JSON字符串', () => {
      const result = formatTimezone('json');
      
      expect(() => JSON.parse(result)).not.toThrow();
      
      const parsed: TimezoneInfo = JSON.parse(result);
      expect(parsed).toHaveProperty('identifier');
      expect(parsed).toHaveProperty('abbreviation');
      expect(parsed).toHaveProperty('offsetMinutes');
      expect(parsed).toHaveProperty('offsetString');
      expect(parsed).toHaveProperty('isDST');
      expect(parsed).toHaveProperty('currentTime');
    });

    it('默认格式应该是simple', () => {
      const defaultResult = formatTimezone();
      const simpleResult = formatTimezone('simple');
      
      expect(defaultResult).toBe(simpleResult);
    });
  });
});
