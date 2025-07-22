import { formatBytes } from "./formatters";

describe("formatBytes", () => {
  it('should return "0 Bytes" for 0 bytes', () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  it("should format bytes correctly", () => {
    expect(formatBytes(100)).toBe("100 Bytes");
    expect(formatBytes(1023)).toBe("1023 Bytes");
  });

  it("should format kilobytes correctly", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(102400)).toBe("100 KB");
  });

  it("should format megabytes correctly", () => {
    expect(formatBytes(1024 * 1024)).toBe("1 MB");
    expect(formatBytes(1.5 * 1024 * 1024)).toBe("1.5 MB");
  });

  it("should format gigabytes correctly", () => {
    expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");
    expect(formatBytes(2.75 * 1024 * 1024 * 1024)).toBe("2.75 GB");
  });

  it("should format terabytes correctly", () => {
    expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
  });

  it("should handle different decimal places", () => {
    expect(formatBytes(1536, 0)).toBe("2 KB"); // 1.5 rounded to 2
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
    expect(formatBytes(1536, 3)).toBe("1.500 KB");
  });

  it("should handle negative decimal places by defaulting to 0", () => {
    expect(formatBytes(1536, -1)).toBe("2 KB");
  });

  it("should handle large numbers", () => {
    expect(formatBytes(1024 * 1024 * 1024 * 1024 * 500)).toBe("500 TB");
  });
});
