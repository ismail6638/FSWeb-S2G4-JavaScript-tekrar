import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    let emailErr = '';
    let passwordErr = '';

    if (formData.email && !emailRegex.test(formData.email)) {
      emailErr = 'Geçerli bir email adresi giriniz.';
    }

    if (formData.password && !passwordRegex.test(formData.password)) {
      passwordErr = 'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.';
    }

    setErrors({ email: emailErr, password: passwordErr });

    const isValid = 
      emailRegex.test(formData.email) && 
      passwordRegex.test(formData.password) && 
      formData.terms;

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      history.push('/success');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            data-cy="email-input"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
            required
          />
          {errors.email && <p data-cy="error-msg" className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Şifre</label>
          <input
            type="password"
            name="password"
            data-cy="password-input"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
            required
          />
          {errors.password && <p data-cy="error-msg" className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            data-cy="terms-checkbox"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms" className="text-sm">Şartları kabul ediyorum</label>
        </div>

        <button
          type="submit"
          data-cy="submit-btn"
          disabled={!isFormValid}
          className={`p-2 rounded text-white font-bold transition-colors ${
            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}