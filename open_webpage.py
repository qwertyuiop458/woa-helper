#!/usr/bin/env python3
"""
Простой скрипт для открытия веб-страницы в браузере
"""

import os
import webbrowser
import platform

def open_webpage():
    """Открывает веб-страницу в браузере"""
    
    # Проверяем наличие файлов
    required_files = [
        'test.html',
        'renaissance_anatomy_study.png',
        'advanced_renaissance_anatomy.png'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ Отсутствуют файлы:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    # Получаем абсолютный путь к HTML файлу
    current_dir = os.getcwd()
    html_path = os.path.join(current_dir, 'test.html')
    
    # Преобразуем в file:// URL
    if platform.system() == 'Windows':
        file_url = f"file:///{html_path.replace(os.sep, '/')}"
    else:
        file_url = f"file://{html_path}"
    
    print("🌐 Открываю веб-страницу в браузере...")
    print(f"📁 Файл: {html_path}")
    print(f"🔗 URL: {file_url}")
    
    try:
        # Открываем в браузере
        webbrowser.open(file_url)
        print("✅ Страница открыта в браузере!")
        print("\n📋 Инструкция:")
        print("1. Если страница не открылась автоматически, скопируйте URL выше")
        print("2. Вставьте его в адресную строку браузера")
        print("3. Или просто дважды кликните на файл test.html")
        return True
    except Exception as e:
        print(f"❌ Ошибка открытия браузера: {e}")
        print("\n📋 Альтернативные способы:")
        print("1. Дважды кликните на файл test.html")
        print("2. Перетащите test.html в окно браузера")
        print("3. Откройте браузер и введите в адресной строке:")
        print(f"   file://{html_path}")
        return False

def main():
    """Основная функция"""
    print("🎨 Renaissance Anatomy Generator - Web Page Opener")
    print("=" * 50)
    
    success = open_webpage()
    
    if success:
        print("\n🎉 Веб-страница должна открыться в браузере!")
        print("📖 Вы увидите созданные анатомические изображения")
        print("💾 Можете скачать изображения кнопками на странице")
    else:
        print("\n⚠️  Попробуйте открыть файл test.html вручную")

if __name__ == "__main__":
    main()