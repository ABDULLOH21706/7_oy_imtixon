import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
}

const predefinedUsers: User[] = [
  { email: 'user1@example.com', password: 'password123' },
  { email: 'user2@example.com', password: 'secret456' },
];

const LoginCard: React.FC = () => {
  const navigate = useNavigate(); // useNavigate hookini ishga tushirish

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
.3
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    if (!email || !password) {
      setErrorMessage('Iltimos, email va parolni toʻliq kiriting.');
      return;
    }

    const foundUser = predefinedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Agar foydalanuvchi topilsa va parol mos kelsa
      setErrorMessage(''); // Xatoni tozalash
      setSuccessMessage('Siz tizimga kirdingiz'); // Muvaffaqiyat xabarini o'rnatish

      // Emailni localStorage ga saqlash (YANGI)
      localStorage.setItem('loggedInEmail', email);

      // Muvaffaqiyat xabarini ko'rsatish va 2 soniyadan keyin boshqa sahifaga o'tish
      setTimeout(() => {
        setSuccessMessage(''); // Xabarni yo'q qilish
        // Navigate orqali foydalanuvchini Dashboard sahifasiga yo'naltirish
        // Endi state orqali emailni jo'natish shart emas, chunki localStorage da bor
        navigate('/dashboard');
        // Input maydonlarini tozalash (agar foydalanuvchi orqaga qaytsa)
        setEmail('');
        setPassword('');
      }, 2000); // 2000 millisekund = 2 soniya+
    } else {
      // Agar foydalanuvchi topilmasa yoki parol noto'g'ri bo'lsa
      setErrorMessage('Notoʻgʻri email yoki parol. Iltimos, qayta urinib koʻring.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Muvaffaqiyat xabari (absolute positioning bilan yuqorida turadi) */}
      {successMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl text-lg flex items-center gap-2 z-50 animate-fade-in-down">
          {successMessage} <span className="text-xl">✅</span>
        </div>
      )}

      <div className="bg-neutral-900 rounded-xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-white text-3xl font-semibold mb-2 flex items-center gap-2">
          Xush kelibsiz <span className="text-2xl">👋</span>
        </h1>
        <p className="text-gray-400 text-base mb-8">
          Hisobingizga kirish uchun email va parolni kiriting
        </p>

        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
              Parol
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
