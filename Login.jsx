import React, { useState, useEffect } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// En az 8 karakter, en az bir harf ve bir sayı
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  useEffect(() => {
    const newErrors = {};

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Şifre en az 8 karakter olmalı, harf ve rakam içermelidir.';
    }

    setErrors(newErrors);

    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);
    const isTermsAccepted = formData.terms;

    setIsValid(isEmailValid && isPasswordValid && isTermsAccepted);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLoginSuccess();
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-posta:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-cy="email-input"
          />
          {errors.email && (
            <p className="error" data-cy="error-message">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-cy="password-input"
          />
          {errors.password && (
            <p className="error" data-cy="error-message">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              data-cy="terms-checkbox"
            />
            Şartları kabul ediyorum
          </label>
        </div>

        <button type="submit" disabled={!isValid} data-cy="submit-button">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}