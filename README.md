# Alerts.in.ua Clone

Повноцінний клон alerts.in.ua з можливістю підключати власні Telegram-канали, фільтрацією та інтерактивною картою.

## 🚀 Швидкий деплой на Vercel

### 1. Створіть акаунт на [vercel.com](https://vercel.com)

### 2. Завантажте код на GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/alerts-clone.git
git push -u origin main
```

### 3. Підключіть до Vercel:
- Перейдіть на [vercel.com](https://vercel.com)
- Натисніть "New Project"
- Підключіть ваш GitHub репозиторій
- Vercel автоматично збудує і запустить проєкт

### 4. Отримайте URL:
```
https://your-project-name.vercel.app
```

---

## 📱 Використання на телефоні

1. Відкрийте URL на телефоні
2. Додайте Telegram-канали через вебінтерфейс
3. Переглядайте траєкторії на карті
4. Використовуйте фільтри для пошуку

---

## 🏗️ Локальна розробка

### Backend:
```bash
cd backend
npm install
node api.js
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 📋 Функціональність

- ✅ Парсинг Telegram-каналів
- ✅ Інтерактивна карта з траєкторіями
- ✅ Додавання/видалення каналів через вебінтерфейс
- ✅ Фільтрація за типом та регіоном
- ✅ Автоматичне оновлення даних
- ✅ API для керування каналами
- ✅ Деплой на Vercel

---

## 🔧 API Endpoints

- `GET /api/channels` - отримати список каналів
- `POST /api/channels` - додати канал
- `DELETE /api/channels/:channel` - видалити канал
- `POST /api/fetch` - запустити парсер
- `GET /api/trajectories` - отримати траєкторії

---

## 🌐 Доступ з телефону

Після деплою на Vercel, відкрийте URL на будь-якому пристрої!