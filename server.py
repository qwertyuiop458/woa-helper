#!/usr/bin/env python3
"""
Простой веб-сервер для демонстрации генератора анатомических изображений
Simple web server for Renaissance Anatomy Generator
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse
import threading
import time

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # Custom logging format
        print(f"[{self.log_date_time_string()}] {format % args}")

def start_server(port=8081):
    """Запускает веб-сервер на указанном порту"""
    
    # Проверяем, что все необходимые файлы существуют
    required_files = [
        'index.html',
        'styles.css', 
        'script.js',
        'renaissance_anatomy_study.png',
        'advanced_renaissance_anatomy.png'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Отсутствуют необходимые файлы:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nУбедитесь, что все файлы находятся в текущей директории.")
        return False
    
    # Создаем обработчик запросов
    handler = CustomHTTPRequestHandler
    
    try:
        # Создаем сервер
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 Веб-сервер запущен на порту {port}")
            print(f"📱 Откройте браузер и перейдите по адресу:")
            print(f"   http://localhost:{port}")
            print(f"   или")
            print(f"   http://127.0.0.1:{port}")
            print("\n" + "="*50)
            print("🎨 Renaissance Anatomy Generator")
            print("="*50)
            print("✨ Особенности веб-интерфейса:")
            print("   • Современный адаптивный дизайн")
            print("   • Интерактивные элементы")
            print("   • Анимации и эффекты")
            print("   • Галерея работ")
            print("   • Информация о проекте")
            print("\n💡 Для остановки сервера нажмите Ctrl+C")
            print("="*50)
            
            # Автоматически открываем браузер через 2 секунды
            def open_browser():
                time.sleep(2)
                try:
                    webbrowser.open(f'http://localhost:{port}')
                    print(f"🌐 Браузер автоматически открыт!")
                except Exception as e:
                    print(f"⚠️  Не удалось автоматически открыть браузер: {e}")
                    print("   Откройте браузер вручную по адресу выше")
            
            # Запускаем открытие браузера в отдельном потоке
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            # Запускаем сервер
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Порт {port} уже занят!")
            print(f"Попробуйте другой порт или остановите процесс на порту {port}")
            return False
        else:
            print(f"❌ Ошибка запуска сервера: {e}")
            return False
    except KeyboardInterrupt:
        print("\n🛑 Сервер остановлен пользователем")
        return True
    except Exception as e:
        print(f"❌ Неожиданная ошибка: {e}")
        return False

def check_dependencies():
    """Проверяет наличие необходимых зависимостей"""
    try:
        import http.server
        import socketserver
        import webbrowser
        return True
    except ImportError as e:
        print(f"❌ Отсутствуют необходимые модули: {e}")
        return False

def main():
    """Основная функция"""
    print("🎨 Renaissance Anatomy Generator - Web Server")
    print("="*50)
    
    # Проверяем зависимости
    if not check_dependencies():
        return
    
    # Проверяем наличие файлов
    if not os.path.exists('index.html'):
        print("❌ Файл index.html не найден!")
        print("Убедитесь, что вы находитесь в правильной директории.")
        return
    
    # Запускаем сервер
    port = 8081
    success = start_server(port)
    
    if success:
        print("✅ Сервер успешно завершен")
    else:
        print("❌ Ошибка при работе сервера")

if __name__ == "__main__":
    main()