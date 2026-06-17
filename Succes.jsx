import React from 'react';

export default function Success() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-green-50 rounded shadow-md text-center">
      <h1 data-cy="success-title" className="text-3xl font-bold text-green-600 mb-2">Giriş Başarılı!</h1>
      <p className="text-gray-600">Uygulamaya başarıyla yönlendirildiniz.</p>
    </div>
  );
}