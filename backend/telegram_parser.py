import json
import os
from telethon.sync import TelegramClient

# Тестові API credentials (замініть на свої)
api_id = 123456  # ← замініть на свій
api_hash = 'your_api_hash'  # ← замініть на свій


def extract_direction(text):
    if not text:
        return None, None
    
    # Різні формати повідомлень про траєкторії
    patterns = [
        # "з X у напрямку Y"
        ('з', 'у напрямку'),
        # "з X в напрямку Y" 
        ('з', 'в напрямку'),
        # "з X до Y"
        ('з', 'до'),
        # "X -> Y"
        ('', '->'),
        # "X - Y"
        ('', ' - '),
    ]
    
    for start_pattern, end_pattern in patterns:
        if start_pattern and end_pattern in text:
            parts = text.split(end_pattern)
            if len(parts) >= 2:
                source = parts[0].split(start_pattern)[-1].strip()
                target = parts[1].strip('. ')
                if source and target:
                    return source, target
        elif end_pattern in text:
            parts = text.split(end_pattern)
            if len(parts) >= 2:
                source = parts[0].strip()
                target = parts[1].strip('. ')
                if source and target:
                    return source, target
    
    return None, None


def fetch_trajectories(channels):
    client = TelegramClient('session', api_id, api_hash)
    results = []
    
    try:
        with client:
            for username in channels:
                try:
                    print(f"Парсинг каналу: {username}")
                    messages = client.iter_messages(username, limit=20)
                    for message in messages:
                        if message.text:
                            src, dst = extract_direction(message.text)
                            if src and dst:
                                results.append({
                                    'source': src,
                                    'target': dst,
                                    'time': str(message.date),
                                    'channel': username,
                                    'text': message.text[:100],  # перші 100 символів для дебагу
                                })
                except Exception as e:
                    print(f"Помилка парсингу каналу {username}: {e}")
                    continue
    except Exception as e:
        print(f"Помилка підключення до Telegram: {e}")
        return
    
    os.makedirs('data', exist_ok=True)
    with open('data/trajectories.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"Знайдено {len(results)} траєкторій")


if __name__ == "__main__":
    if os.path.exists('channels.json'):
        with open('channels.json', 'r', encoding='utf-8') as f:
            channels = json.load(f)
    else:
        channels = []
    
    if not channels:
        print("Канали не знайдено в channels.json")
        # Додаємо тестовий канал для демонстрації
        channels = ['test_channel']
    
    fetch_trajectories(channels)