import React, { useState } from "react";
import "./FormStyling.css";

function Form() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format!";
        break;
      case "password":
        error =
          value.length >= 8
            ? ""
            : "Password must be at least 8 characters long!";
        break;
      case "username":
        error =
          value.length >= 8
            ? ""
            : "Username must be at least 8 characters long!";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const isValid = (field) => !errors[field] && form[field] !== "";

  const handleCheckboxToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheckboxToggle();
    }
  };

  return (
    <div className="form-container">
      <form
        className="registration-form"
        onSubmit={handleSubmit}
        aria-label="Registration Form"
      >
        <h2 className="form-title">Register here!</h2>
        <div
          className={`form-box ${
            isValid("username") ? "valid" : errors.username ? "invalid" : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="username-error"
            className="form-input"
            placeholder="Enter your username"
          />
          {errors.username && (
            <span id="username-error" className="error-message" role="alert">
              {errors.username}
            </span>
          )}
        </div>
        <div
          className={`form-box ${
            isValid("email") ? "valid" : errors.email ? "invalid" : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="email-error"
            className="form-input"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div
          className={`form-box ${
            isValid("password") ? "valid" : errors.password ? "invalid" : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            aria-required="true"
            aria-describedby="password-error"
            className="form-input"
            placeholder="Enter your password"
          />
          <div className="toggle-password-wrapper">
            <input
              type="checkbox"
              id="togglePassword"
              checked={showPassword}
              onChange={handleCheckboxToggle}
              onKeyDown={handleCheckboxKeyDown}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="toggle-password-checkbox"
            />
            <label htmlFor="togglePassword" className="toggle-password-label">
              Show password
            </label>
          </div>
          {errors.password && (
            <span id="password-error" className="error-message" role="alert">
              {errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="form-submit"
          disabled={Object.values(errors).some(Boolean)}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Form;
