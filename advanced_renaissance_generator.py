#!/usr/bin/env python3
"""
Продвинутый генератор изображений в стиле анатомического исследования эпохи Возрождения
Advanced Renaissance Anatomy Study Image Generator
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import random
import math

class AdvancedRenaissanceGenerator:
    def __init__(self, width=1400, height=1800):
        self.width = width
        self.height = height
        self.image = Image.new('RGB', (width, height), color='#F5F5DC')
        self.draw = ImageDraw.Draw(self.image)
        
    def create_vintage_paper_texture(self):
        """Создает более реалистичную текстуру старой бумаги"""
        # Базовый цвет старой бумаги
        base_color = (245, 240, 220)
        
        for i in range(self.width):
            for j in range(self.height):
                # Создаем более сложную текстуру
                noise_x = math.sin(i * 0.01) * 10
                noise_y = math.cos(j * 0.01) * 10
                noise = random.randint(-15, 15) + noise_x + noise_y
                
                r = min(255, max(0, base_color[0] + noise))
                g = min(255, max(0, base_color[1] + noise))
                b = min(255, max(0, base_color[2] + noise))
                
                # Добавляем желтоватый оттенок
                r = min(255, r + random.randint(0, 10))
                g = min(255, g + random.randint(0, 5))
                
                self.image.putpixel((i, j), (int(r), int(g), int(b)))
    
    def draw_detailed_anatomical_figure(self):
        """Рисует детализированную анатомическую фигуру"""
        center_x = self.width // 2
        center_y = self.height // 2 - 100
        
        # Голова с деталями
        self.draw_detailed_head(center_x, center_y - 300)
        
        # Шея
        self.draw_neck(center_x, center_y - 240)
        
        # Туловище с мышцами
        self.draw_detailed_torso(center_x, center_y)
        
        # Конечности
        self.draw_detailed_limbs(center_x, center_y)
        
        # Внутренние органы
        self.draw_detailed_organs(center_x, center_y)
        
        # Кровеносная система
        self.draw_circulatory_system(center_x, center_y)
    
    def draw_detailed_head(self, x, y):
        """Рисует детализированную голову"""
        # Основная форма головы
        head_radius = 70
        self.draw.ellipse([x - head_radius, y, x + head_radius, y + 2*head_radius], 
                         outline='#2F2F2F', width=3)
        
        # Глаза
        eye_radius = 8
        self.draw.ellipse([x - 25 - eye_radius, y + 40, x - 25 + eye_radius, y + 40 + 2*eye_radius], 
                         outline='#2F2F2F', width=2)
        self.draw.ellipse([x + 25 - eye_radius, y + 40, x + 25 + eye_radius, y + 40 + 2*eye_radius], 
                         outline='#2F2F2F', width=2)
        
        # Нос
        nose_points = [(x, y + 60), (x - 5, y + 70), (x + 5, y + 70)]
        self.draw.polygon(nose_points, outline='#2F2F2F', width=2)
        
        # Рот
        self.draw.arc([x - 15, y + 80, x + 15, y + 90], 0, 180, fill='#2F2F2F', width=2)
        
        # Уши
        self.draw.ellipse([x - head_radius - 5, y + 30, x - head_radius + 5, y + 50], 
                         outline='#2F2F2F', width=2)
        self.draw.ellipse([x + head_radius - 5, y + 30, x + head_radius + 5, y + 50], 
                         outline='#2F2F2F', width=2)
    
    def draw_neck(self, x, y):
        """Рисует шею"""
        neck_width = 40
        neck_height = 60
        self.draw.rectangle([x - neck_width//2, y, x + neck_width//2, y + neck_height], 
                           outline='#2F2F2F', width=3)
        
        # Гортань
        self.draw.ellipse([x - 8, y + 20, x + 8, y + 40], outline='#4682B4', width=2)
        self.draw.text((x - 15, y + 25), "LARYNX", fill='#2F2F2F')
    
    def draw_detailed_torso(self, x, y):
        """Рисует детализированное туловище"""
        torso_width = 140
        torso_height = 220
        
        # Основная форма туловища
        self.draw.rectangle([x - torso_width//2, y - 200, x + torso_width//2, y], 
                           outline='#2F2F2F', width=3)
        
        # Грудная клетка
        rib_cage_width = 120
        rib_cage_height = 100
        self.draw.ellipse([x - rib_cage_width//2, y - 180, x + rib_cage_width//2, y - 180 + rib_cage_height], 
                         outline='#2F2F2F', width=2)
        
        # Ребра
        for i in range(5):
            rib_y = y - 180 + i * 20
            rib_width = 100 - i * 10
            self.draw.arc([x - rib_width//2, rib_y - 5, x + rib_width//2, rib_y + 5], 
                         0, 180, fill='#2F2F2F', width=1)
        
        # Мышцы живота
        for i in range(4):
            muscle_y = y - 80 + i * 20
            self.draw.rectangle([x - 50, muscle_y - 5, x + 50, muscle_y + 5], 
                              outline='#2F2F2F', width=1)
    
    def draw_detailed_limbs(self, x, y):
        """Рисует детализированные конечности"""
        # Руки
        # Плечи
        shoulder_width = 80
        self.draw.ellipse([x - shoulder_width//2, y - 150, x + shoulder_width//2, y - 150 + 30], 
                         outline='#2F2F2F', width=2)
        
        # Плечевые кости
        self.draw.line([x - 40, y - 150, x - 40, y - 50], fill='#2F2F2F', width=3)
        self.draw.line([x + 40, y - 150, x + 40, y - 50], fill='#2F2F2F', width=3)
        
        # Предплечья
        self.draw.line([x - 40, y - 50, x - 60, y + 20], fill='#2F2F2F', width=3)
        self.draw.line([x + 40, y - 50, x + 60, y + 20], fill='#2F2F2F', width=3)
        
        # Кисти
        self.draw.ellipse([x - 70, y + 10, x - 50, y + 30], outline='#2F2F2F', width=2)
        self.draw.ellipse([x + 50, y + 10, x + 70, y + 30], outline='#2F2F2F', width=2)
        
        # Ноги
        # Бедра
        self.draw.ellipse([x - 30, y, x + 30, y + 40], outline='#2F2F2F', width=2)
        
        # Бедренные кости
        self.draw.line([x - 20, y + 40, x - 20, y + 140], fill='#2F2F2F', width=3)
        self.draw.line([x + 20, y + 40, x + 20, y + 140], fill='#2F2F2F', width=3)
        
        # Голени
        self.draw.line([x - 20, y + 140, x - 15, y + 220], fill='#2F2F2F', width=3)
        self.draw.line([x + 20, y + 140, x + 15, y + 220], fill='#2F2F2F', width=3)
        
        # Стопы
        self.draw.ellipse([x - 25, y + 210, x - 5, y + 230], outline='#2F2F2F', width=2)
        self.draw.ellipse([x + 5, y + 210, x + 25, y + 230], outline='#2F2F2F', width=2)
    
    def draw_detailed_organs(self, x, y):
        """Рисует детализированные органы"""
        # Сердце с камерами
        self.draw_detailed_heart(x - 30, y - 150)
        
        # Легкие с бронхами
        self.draw_detailed_lungs(x - 60, x + 40, y - 180)
        
        # Печень с желчным пузырем
        self.draw_detailed_liver(x + 30, y - 80)
        
        # Желудок
        self.draw_stomach(x - 20, y - 60)
        
        # Поджелудочная железа
        self.draw_pancreas(x + 10, y - 40)
        
        # Кишечник
        self.draw_detailed_intestines(x, y)
    
    def draw_detailed_heart(self, x, y):
        """Рисует детализированное сердце"""
        # Основная форма сердца
        points = [
            (x, y - 25), (x - 20, y - 15), (x - 25, y + 5),
            (x - 20, y + 20), (x, y + 25), (x + 20, y + 20),
            (x + 25, y + 5), (x + 20, y - 15)
        ]
        self.draw.polygon(points, outline='#8B0000', width=3)
        
        # Камеры сердца
        self.draw.ellipse([x - 15, y - 10, x + 15, y + 10], outline='#DC143C', width=2)
        self.draw.ellipse([x - 10, y - 5, x + 10, y + 5], outline='#FF0000', width=1)
        
        # Клапаны
        self.draw.line([x - 5, y - 15, x + 5, y - 15], fill='#8B0000', width=2)
        self.draw.line([x - 5, y + 15, x + 5, y + 15], fill='#8B0000', width=2)
        
        self.draw.text((x - 30, y - 35), "COR", fill='#2F2F2F')
    
    def draw_detailed_lungs(self, left_x, right_x, y):
        """Рисует детализированные легкие"""
        # Левое легкое
        self.draw.ellipse([left_x - 25, y - 35, left_x + 25, y + 35], 
                         outline='#4682B4', width=2)
        
        # Правое легкое
        self.draw.ellipse([right_x - 25, y - 35, right_x + 25, y + 35], 
                         outline='#4682B4', width=2)
        
        # Бронхи
        self.draw.line([left_x, y - 10, left_x - 10, y - 20], fill='#4682B4', width=1)
        self.draw.line([left_x, y + 10, left_x - 10, y + 20], fill='#4682B4', width=1)
        self.draw.line([right_x, y - 10, right_x + 10, y - 20], fill='#4682B4', width=1)
        self.draw.line([right_x, y + 10, right_x + 10, y + 20], fill='#4682B4', width=1)
        
        # Трахея
        self.draw.rectangle([left_x - 5, y - 15, right_x + 5, y + 15], 
                           outline='#4682B4', width=2)
        
        self.draw.text((left_x - 35, y - 45), "PULMONES", fill='#2F2F2F')
    
    def draw_detailed_liver(self, x, y):
        """Рисует детализированную печень"""
        points = [
            (x, y - 20), (x - 25, y - 10), (x - 30, y + 5),
            (x - 25, y + 20), (x, y + 25), (x + 25, y + 20),
            (x + 30, y + 5), (x + 25, y - 10)
        ]
        self.draw.polygon(points, outline='#8B4513', width=3)
        
        # Желчный пузырь
        self.draw.ellipse([x + 15, y - 5, x + 25, y + 5], outline='#9ACD32', width=2)
        
        # Воротная вена
        self.draw.line([x - 20, y - 10, x - 30, y - 20], fill='#8B4513', width=2)
        
        self.draw.text((x - 30, y - 30), "HEPAR", fill='#2F2F2F')
    
    def draw_stomach(self, x, y):
        """Рисует желудок"""
        self.draw.ellipse([x - 20, y - 15, x + 20, y + 15], outline='#8B7355', width=2)
        self.draw.text((x - 25, y - 25), "VENTRICULUS", fill='#2F2F2F')
    
    def draw_pancreas(self, x, y):
        """Рисует поджелудочную железу"""
        points = [
            (x, y - 10), (x - 15, y - 5), (x - 20, y + 5),
            (x - 15, y + 15), (x, y + 20), (x + 15, y + 15),
            (x + 20, y + 5), (x + 15, y - 5)
        ]
        self.draw.polygon(points, outline='#FFD700', width=2)
        self.draw.text((x - 20, y - 20), "PANCREAS", fill='#2F2F2F')
    
    def draw_detailed_intestines(self, x, y):
        """Рисует детализированный кишечник"""
        # Тонкий кишечник
        for i in range(8):
            int_x = x - 50 + i * 15
            int_y = y - 30 + i * 8
            self.draw.ellipse([int_x - 8, int_y - 4, int_x + 8, int_y + 4], 
                             outline='#8B7355', width=1)
        
        # Толстый кишечник
        colon_points = [
            (x - 60, y + 30), (x - 40, y + 25), (x - 20, y + 30),
            (x, y + 25), (x + 20, y + 30), (x + 40, y + 25), (x + 60, y + 30)
        ]
        self.draw.line(colon_points, fill='#8B7355', width=3)
        
        # Аппендикс
        self.draw.line([x + 60, y + 30, x + 70, y + 40], fill='#8B7355', width=2)
        self.draw.ellipse([x + 65, y + 35, x + 75, y + 45], outline='#8B7355', width=1)
    
    def draw_circulatory_system(self, x, y):
        """Рисует кровеносную систему"""
        # Аорта
        self.draw.line([x - 30, y - 150, x - 30, y - 50], fill='#DC143C', width=4)
        
        # Вены
        self.draw.line([x + 30, y - 150, x + 30, y - 50], fill='#4169E1', width=3)
        
        # Капилляры
        for i in range(10):
            cap_x = x - 40 + i * 8
            cap_y = y - 100 + i * 10
            self.draw.line([cap_x, cap_y, cap_x + 5, cap_y + 5], fill='#DC143C', width=1)
    
    def add_renaissance_elements(self):
        """Добавляет элементы эпохи Возрождения"""
        # Латинские надписи
        latin_texts = [
            ("HOMO ANATOMICUS", 60, 60),
            ("STUDIUM CORPORIS HUMANUM", 60, 90),
            ("SECTIO PRIMA - ORGANIS INTERNIS", 60, 120),
            ("VENAE ET ARTERIAE", 60, 150),
            ("MUSCULI ET OSSA", 60, 180),
            ("ANNO DOMINI MDXX", 60, 210)
        ]
        
        for text, x, y in latin_texts:
            self.draw.text((x, y), text, fill='#2F2F2F')
        
        # Декоративные элементы
        self.draw_decorative_border()
        self.draw_measurement_lines()
        self.draw_scale_indicator()
    
    def draw_decorative_border(self):
        """Рисует декоративную рамку"""
        border_width = 25
        # Внешняя рамка
        self.draw.rectangle([border_width, border_width, 
                           self.width - border_width, self.height - border_width], 
                          outline='#2F2F2F', width=4)
        
        # Внутренняя декоративная рамка
        inner_border = 50
        self.draw.rectangle([inner_border, inner_border, 
                           self.width - inner_border, self.height - inner_border], 
                          outline='#2F2F2F', width=2)
        
        # Угловые украшения
        corner_size = 30
        for corner in [(inner_border, inner_border), 
                      (self.width - inner_border - corner_size, inner_border),
                      (inner_border, self.height - inner_border - corner_size),
                      (self.width - inner_border - corner_size, self.height - inner_border - corner_size)]:
            self.draw.rectangle([corner[0], corner[1], corner[0] + corner_size, corner[1] + corner_size], 
                              outline='#2F2F2F', width=2)
    
    def draw_measurement_lines(self):
        """Рисует измерительные линии и отметки"""
        # Вертикальные линии
        for x in [120, self.width - 120]:
            self.draw.line([x, 120, x, self.height - 120], 
                          fill='#2F2F2F', width=1)
            # Отметки
            for y in range(180, self.height - 180, 60):
                self.draw.line([x - 15, y, x + 15, y], 
                              fill='#2F2F2F', width=1)
                # Числовые отметки
                self.draw.text((x - 25, y - 10), str((y - 180) // 60), fill='#2F2F2F')
    
    def draw_scale_indicator(self):
        """Рисует индикатор масштаба"""
        scale_x = self.width - 200
        scale_y = self.height - 100
        
        # Линейка масштаба
        self.draw.line([scale_x, scale_y, scale_x + 100, scale_y], 
                      fill='#2F2F2F', width=2)
        
        # Деления
        for i in range(11):
            x = scale_x + i * 10
            self.draw.line([x, scale_y - 5, x, scale_y + 5], 
                          fill='#2F2F2F', width=1)
        
        self.draw.text((scale_x, scale_y + 20), "SCALA", fill='#2F2F2F')
        self.draw.text((scale_x + 40, scale_y + 20), "PEDES", fill='#2F2F2F')
    
    def add_aging_effects(self):
        """Добавляет эффекты старения"""
        # Случайные пятна
        for _ in range(80):
            x = random.randint(60, self.width - 60)
            y = random.randint(60, self.height - 60)
            radius = random.randint(3, 12)
            color = random.choice(['#8B7355', '#D2B48C', '#DEB887', '#F4A460'])
            self.draw.ellipse([x - radius, y - radius, x + radius, y + radius], 
                             fill=color)
        
        # Складки бумаги
        for _ in range(15):
            x1 = random.randint(100, self.width - 100)
            y1 = random.randint(100, self.height - 100)
            x2 = x1 + random.randint(-60, 60)
            y2 = y1 + random.randint(-60, 60)
            self.draw.line([x1, y1, x2, y2], fill='#D2B48C', width=1)
        
        # Пятна от чернил
        for _ in range(10):
            x = random.randint(100, self.width - 100)
            y = random.randint(100, self.height - 100)
            radius = random.randint(5, 15)
            self.draw.ellipse([x - radius, y - radius, x + radius, y + radius], 
                             fill='#2F2F2F')
    
    def generate(self):
        """Генерирует полное изображение"""
        print("Создание текстуры старой бумаги...")
        self.create_vintage_paper_texture()
        
        print("Рисование детализированной анатомической фигуры...")
        self.draw_detailed_anatomical_figure()
        
        print("Добавление элементов эпохи Возрождения...")
        self.add_renaissance_elements()
        
        print("Применение эффектов старения...")
        self.add_aging_effects()
        
        return self.image
    
    def save(self, filename="advanced_renaissance_anatomy.png"):
        """Сохраняет изображение"""
        self.image.save(filename, "PNG")
        print(f"Изображение сохранено как {filename}")

def main():
    """Основная функция"""
    print("Продвинутый генератор анатомического исследования эпохи Возрождения")
    print("=" * 60)
    
    # Создаем генератор
    generator = AdvancedRenaissanceGenerator(1400, 1800)
    
    # Генерируем изображение
    image = generator.generate()
    
    # Сохраняем результат
    generator.save()
    
    print("\nПродвинутое изображение успешно создано!")
    print("Стиль: Детализированное анатомическое исследование эпохи Возрождения")
    print("Особенности:")
    print("- Реалистичная текстура старой бумаги")
    print("- Детализированная анатомическая фигура")
    print("- Внутренние органы с научными обозначениями")
    print("- Кровеносная система")
    print("- Латинские надписи и декоративные элементы")
    print("- Эффекты старения и повреждений")

if __name__ == "__main__":
    main()