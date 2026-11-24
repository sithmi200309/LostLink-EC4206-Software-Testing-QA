import { describe, it, expect, vi } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { register } = await import("../controllers/authController.js");

describe("register() - White Box Testing", () => {

  it("WB01 - should reject invalid required fields", async () => {
    const req = {
      body: {
        fullName: 123,
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Please provide your name, email, password, and password confirmation."
    );
  });


  it("WB02 - should reject a name shorter than 2 characters", async () => {
    const req = {
      body: {
        fullName: "A",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Full name must contain 2 to 100 characters."
    );
  });


  it("WB03 - should reject an invalid email address", async () => {
    const req = {
      body: {
        fullName: "Piyumra",
        email: "invalid-email",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Please enter a valid email address."
    );
  });


  it("WB04 - should reject a password shorter than 8 characters", async () => {
    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "1234567",
        confirmPassword: "1234567",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Password must contain at least 8 characters."
    );
  });


  it("WB05 - should reject a password longer than 72 characters", async () => {
    const password = "a".repeat(73);

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: password,
        confirmPassword: password,
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Password cannot exceed 72 characters."
    );
  });


  it("WB06 - should reject mismatched passwords", async () => {
    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password456",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Passwords do not match."
    );
  });


  it("WB07 - should reject registration when the email already exists", async () => {
    const findOneSpy = vi
      .spyOn(User, "findOne")
      .mockResolvedValue({
        _id: "existing-user-id",
        email: "test@example.com",
      });

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe(
      "An account with this email already exists."
    );

    expect(findOneSpy).toHaveBeenCalledWith({
      email: "test@example.com",
    });

    findOneSpy.mockRestore();
  });


  it("WB08 - should successfully register a new user", async () => {
    const findOneSpy = vi
      .spyOn(User, "findOne")
      .mockResolvedValue(null);

    const hashSpy = vi
      .spyOn(bcrypt, "hash")
      .mockResolvedValue("hashed-password");

    const createSpy = vi
      .spyOn(User, "create")
      .mockResolvedValue({
        _id: "new-user-id",
        fullName: "Piyumra",
        email: "test@example.com",
        password: "hashed-password",
      });

    const signSpy = vi
      .spyOn(jwt, "sign")
      .mockReturnValue("test-jwt-token");

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(201);

    expect(res.body.message).toBe(
      "Account created successfully."
    );

    expect(res.body.token).toBe("test-jwt-token");

    expect(res.body.user).toEqual({
      id: "new-user-id",
      fullName: "Piyumra",
      email: "test@example.com",
    });

    expect(findOneSpy).toHaveBeenCalledWith({
      email: "test@example.com",
    });

    expect(hashSpy).toHaveBeenCalledWith(
      "password123",
      12
    );

    expect(createSpy).toHaveBeenCalledWith({
      fullName: "Piyumra",
      email: "test@example.com",
      password: "hashed-password",
    });

    expect(signSpy).toHaveBeenCalled();

    findOneSpy.mockRestore();
    hashSpy.mockRestore();
    createSpy.mockRestore();
    signSpy.mockRestore();
  });
    
  it("WB09 - should handle a duplicate key error", async () => {
    const findOneSpy = vi
      .spyOn(User, "findOne")
      .mockRejectedValue({
        code: 11000,
      });

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe(
      "An account with this email already exists."
    );

    findOneSpy.mockRestore();
  });
    
  it("WB10 - should handle a Mongoose validation error", async () => {
    const validationError = new Error("Validation failed");
    validationError.name = "ValidationError";
    validationError.errors = {
      email: {
        message: "Email is invalid.",
      },
    };

    const findOneSpy = vi
      .spyOn(User, "findOne")
      .mockRejectedValue(validationError);

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email is invalid.");

    findOneSpy.mockRestore();
  });

  it("WB11 - should handle an unexpected error", async () => {
    const findOneSpy = vi
      .spyOn(User, "findOne")
      .mockRejectedValue(new Error("Database connection failed"));

    const req = {
      body: {
        fullName: "Piyumra",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    const res = {
      statusCode: null,
      body: null,

      status(code) {
        this.statusCode = code;
        return this;
      },

      json(data) {
        this.body = data;
        return this;
      },
    };

    await register(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe(
      "Unable to create your account right now."
    );

    findOneSpy.mockRestore();
  });
});