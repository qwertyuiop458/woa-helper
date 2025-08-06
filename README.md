# Alerts.in.ua Clone

Повноцінний клон alerts.in.ua з можливістю підключати власні Telegram-канали, фільтрацією та інтерактивною картою.

## Структура проєкту

```
/workspace/
├── backend/                # Python парсер + Node.js API
│   ├── telegram_parser.py  # Парсер Telegram-каналів
│   ├── api.js             # Node.js API сервер
│   ├── channels.json      # Список каналів
│   └── data/
│       └── trajectories.json
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.tsx
│   │   │   ├── Filters.tsx
│   │   │   └── ChannelsManager.tsx
│   │   └── App.tsx
│   └── public/
└── README.md
```

## Встановлення

### 1. Backend (Python + Node.js)

```bash
cd backend
npm install
pip install -r requirements.txt
```

### 2. Frontend (React)

```bash
cd frontend
npm install
```

## Налаштування Telegram API

1. Перейдіть на [my.telegram.org](https://my.telegram.org)
2. Увійдіть під своїм акаунтом
3. Виберіть "API development tools"
4. Отримайте `api_id` та `api_hash`
5. Відредагуйте `backend/telegram_parser.py`:
   ```python
   api_id = 123456  # ← замініть на свій
   api_hash = 'your_api_hash'  # ← замініть на свій
   ```

## Запуск

### 1. Backend API (порт 3001)

```bash
cd backend
npm start
```

### 2. Frontend (порт 5173)

```bash
cd frontend
npm run dev
```

Відкрийте [http://localhost:5173](http://localhost:5173)

## Функціональність

- ✅ Парсинг Telegram-каналів
- ✅ Інтерактивна карта з траєкторіями
- ✅ Додавання/видалення каналів через вебінтерфейс
- ✅ Фільтрація за типом та регіоном
- ✅ Автоматичне оновлення даних
- ✅ API для керування каналами

## API Endpoints

- `GET /api/channels` - отримати список каналів
- `POST /api/channels` - додати канал
- `DELETE /api/channels/:channel` - видалити канал
- `POST /api/fetch` - запустити парсер
- `GET /api/trajectories` - отримати траєкторії

## Використання

1. Додайте Telegram-канали через вебінтерфейс
2. Система автоматично запустить парсер
3. Переглядайте траєкторії на карті
4. Використовуйте фільтри для пошуку

## Розробка

### Додавання нових фільтрів

Редагуйте `frontend/src/components/Filters.tsx`

### Зміна логіки парсингу

Редагуйте `backend/telegram_parser.py`

### Додавання нових API endpoints

Редагуйте `backend/api.js`