import json
import os
from telethon.sync import TelegramClient

api_id = 123456  # ← замініть на свій
api_hash = 'your_api_hash'  # ← замініть на свій


def extract_direction(text):
    if not text:
        return None, None
    if 'з' in text and 'у напрямку' in text:
        parts = text.split('у напрямку')
        source = parts[0].split('з')[-1].strip()
        target = parts[1].strip('. ')
        return source, target
    return None, None

def fetch_trajectories(channels):
    client = TelegramClient('session', api_id, api_hash)
    results = []
    with client:
        for username in channels:
            for message in client.iter_messages(username, limit=20):
                text = message.text
                src, dst = extract_direction(text)
                if src and dst:
                    results.append({
                        'source': src,
                        'target': dst,
                        'time': str(message.date),
                        'channel': username,
                    })
    os.makedirs('data', exist_ok=True)
    with open('data/trajectories.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    if os.path.exists('channels.json'):
        with open('channels.json', 'r', encoding='utf-8') as f:
            channels = json.load(f)
    else:
        channels = []
    fetch_trajectories(channels)