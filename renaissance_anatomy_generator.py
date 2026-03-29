#!/usr/bin/env python3
"""
Генератор изображений в стиле анатомического исследования эпохи Возрождения
Renaissance Anatomy Study Image Generator
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import random
import math

class RenaissanceAnatomyGenerator:
    def __init__(self, width=1200, height=1600):
        self.width = width
        self.height = height
        self.image = Image.new('RGB', (width, height), color='#F5F5DC')  # Бежевый фон
        self.draw = ImageDraw.Draw(self.image)
        
    def create_paper_texture(self):
        """Создает текстуру старой бумаги"""
        for i in range(self.width):
            for j in range(self.height):
                # Добавляем случайные вариации цвета для имитации старой бумаги
                noise = random.randint(-20, 20)
                r = min(255, max(0, 245 + noise))
                g = min(255, max(0, 245 + noise))
                b = min(255, max(0, 220 + noise))
                self.image.putpixel((i, j), (r, g, b))
    
    def draw_anatomical_figure(self):
        """Рисует анатомическую фигуру в стиле Леонардо да Винчи"""
        # Центр фигуры
        center_x = self.width // 2
        center_y = self.height // 2 - 100
        
        # Голова
        head_radius = 60
        self.draw.ellipse([center_x - head_radius, center_y - 300, 
                          center_x + head_radius, center_y - 300 + 2*head_radius], 
                         outline='#2F2F2F', width=3)
        
        # Туловище
        torso_width = 120
        torso_height = 200
        self.draw.rectangle([center_x - torso_width//2, center_y - 200,
                           center_x + torso_width//2, center_y], 
                          outline='#2F2F2F', width=3)
        
        # Руки
        # Левая рука
        self.draw.line([center_x - torso_width//2, center_y - 150,
                       center_x - torso_width//2 - 80, center_y - 50], 
                      fill='#2F2F2F', width=3)
        # Правая рука
        self.draw.line([center_x + torso_width//2, center_y - 150,
                       center_x + torso_width//2 + 80, center_y - 50], 
                      fill='#2F2F2F', width=3)
        
        # Ноги
        # Левая нога
        self.draw.line([center_x - 30, center_y,
                       center_x - 30, center_y + 200], 
                      fill='#2F2F2F', width=3)
        # Правая нога
        self.draw.line([center_x + 30, center_y,
                       center_x + 30, center_y + 200], 
                      fill='#2F2F2F', width=3)
        
        # Анатомические детали
        self.draw_anatomical_details(center_x, center_y)
    
    def draw_anatomical_details(self, center_x, center_y):
        """Рисует анатомические детали и органы"""
        # Сердце
        heart_x = center_x - 20
        heart_y = center_y - 150
        self.draw_heart(heart_x, heart_y)
        
        # Легкие
        lung_left_x = center_x - 50
        lung_right_x = center_x + 30
        lung_y = center_y - 180
        self.draw_lungs(lung_left_x, lung_right_x, lung_y)
        
        # Печень
        liver_x = center_x + 20
        liver_y = center_y - 80
        self.draw_liver(liver_x, liver_y)
        
        # Кишечник
        self.draw_intestines(center_x, center_y)
    
    def draw_heart(self, x, y):
        """Рисует сердце"""
        # Основная форма сердца
        points = [
            (x, y - 20), (x - 15, y - 10), (x - 15, y + 10),
            (x, y + 20), (x + 15, y + 10), (x + 15, y - 10)
        ]
        self.draw.polygon(points, outline='#8B0000', width=2)
        self.draw.text((x - 25, y - 30), "COR", fill='#2F2F2F')
    
    def draw_lungs(self, left_x, right_x, y):
        """Рисует легкие"""
        # Левое легкое
        self.draw.ellipse([left_x - 20, y - 30, left_x + 20, y + 30], 
                         outline='#4682B4', width=2)
        # Правое легкое
        self.draw.ellipse([right_x - 20, y - 30, right_x + 20, y + 30], 
                         outline='#4682B4', width=2)
        self.draw.text((left_x - 30, y - 40), "PULM", fill='#2F2F2F')
    
    def draw_liver(self, x, y):
        """Рисует печень"""
        points = [
            (x, y - 15), (x - 20, y - 5), (x - 25, y + 10),
            (x - 20, y + 20), (x, y + 25), (x + 20, y + 20),
            (x + 25, y + 10), (x + 20, y - 5)
        ]
        self.draw.polygon(points, outline='#8B4513', width=2)
        self.draw.text((x - 25, y - 25), "HEPAR", fill='#2F2F2F')
    
    def draw_intestines(self, center_x, center_y):
        """Рисует кишечник"""
        # Тонкий кишечник
        for i in range(5):
            x = center_x - 40 + i * 20
            y = center_y - 50 + i * 10
            self.draw.ellipse([x - 10, y - 5, x + 10, y + 5], 
                             outline='#8B7355', width=1)
        
        # Толстый кишечник
        self.draw.rectangle([center_x - 60, center_y + 20,
                           center_x + 60, center_y + 40], 
                          outline='#8B7355', width=2)
    
    def add_renaissance_elements(self):
        """Добавляет элементы эпохи Возрождения"""
        # Латинские надписи
        latin_texts = [
            ("HOMO ANATOMICUS", 50, 50),
            ("STUDIUM CORPORIS", 50, 80),
            ("SECTIO PRIMA", 50, 110),
            ("VENAE ET ARTERIAE", 50, 140)
        ]
        
        for text, x, y in latin_texts:
            self.draw.text((x, y), text, fill='#2F2F2F')
        
        # Декоративные элементы
        self.draw_decorative_border()
        
        # Измерительные линии
        self.draw_measurement_lines()
    
    def draw_decorative_border(self):
        """Рисует декоративную рамку"""
        border_width = 20
        # Внешняя рамка
        self.draw.rectangle([border_width, border_width, 
                           self.width - border_width, self.height - border_width], 
                          outline='#2F2F2F', width=3)
        
        # Внутренняя декоративная рамка
        inner_border = 40
        self.draw.rectangle([inner_border, inner_border, 
                           self.width - inner_border, self.height - inner_border], 
                          outline='#2F2F2F', width=1)
    
    def draw_measurement_lines(self):
        """Рисует измерительные линии и отметки"""
        # Вертикальные линии
        for x in [100, self.width - 100]:
            self.draw.line([x, 100, x, self.height - 100], 
                          fill='#2F2F2F', width=1)
            # Отметки
            for y in range(150, self.height - 150, 50):
                self.draw.line([x - 10, y, x + 10, y], 
                              fill='#2F2F2F', width=1)
    
    def add_aging_effects(self):
        """Добавляет эффекты старения"""
        # Случайные пятна
        for _ in range(50):
            x = random.randint(50, self.width - 50)
            y = random.randint(50, self.height - 50)
            radius = random.randint(2, 8)
            color = random.choice(['#8B7355', '#D2B48C', '#DEB887'])
            self.draw.ellipse([x - radius, y - radius, x + radius, y + radius], 
                             fill=color)
        
        # Складки бумаги
        for _ in range(10):
            x1 = random.randint(100, self.width - 100)
            y1 = random.randint(100, self.height - 100)
            x2 = x1 + random.randint(-50, 50)
            y2 = y1 + random.randint(-50, 50)
            self.draw.line([x1, y1, x2, y2], fill='#D2B48C', width=1)
    
    def generate(self):
        """Генерирует полное изображение"""
        print("Создание текстуры бумаги...")
        self.create_paper_texture()
        
        print("Рисование анатомической фигуры...")
        self.draw_anatomical_figure()
        
        print("Добавление элементов эпохи Возрождения...")
        self.add_renaissance_elements()
        
        print("Применение эффектов старения...")
        self.add_aging_effects()
        
        return self.image
    
    def save(self, filename="renaissance_anatomy_study.png"):
        """Сохраняет изображение"""
        self.image.save(filename, "PNG")
        print(f"Изображение сохранено как {filename}")

def main():
    """Основная функция"""
    print("Генератор анатомического исследования эпохи Возрождения")
    print("=" * 50)
    
    # Создаем генератор
    generator = RenaissanceAnatomyGenerator(1200, 1600)
    
    # Генерируем изображение
    image = generator.generate()
    
    # Сохраняем результат
    generator.save()
    
    print("\nИзображение успешно создано!")
    print("Стиль: Академическое анатомическое исследование эпохи Возрождения")
    print("Особенности:")
    print("- Текстура старой бумаги")
    print("- Анатомическая фигура с органами")
    print("- Латинские надписи")
    print("- Декоративная рамка")
    print("- Эффекты старения")

if __name__ == "__main__":
    main()