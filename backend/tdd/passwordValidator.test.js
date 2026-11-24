import { describe, it, expect } from "vitest";
import { validatePasswordLength } from "./passwordValidator.js";

describe("Password Length Validator", () => {
  it("should reject a 7-character password", () => {
    expect(validatePasswordLength("1234567")).toBe(false);
  });

  it("should accept an 8-character password", () => {
    expect(validatePasswordLength("12345678")).toBe(true);
  });

  it("should accept a 72-character password", () => {
    expect(validatePasswordLength("a".repeat(72))).toBe(true);
  });

  it("should reject a 73-character password", () => {
    expect(validatePasswordLength("a".repeat(73))).toBe(false);
  });
});