// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.currentCity = 'Київ';
        this.apiKey = 'YOUR_API_KEY'; // Replace with actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.weatherData = null;
        this.forecastData = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentDate();
        this.loadWeatherData();
        this.generateForecastCards();
        this.generateHourlyForecast();
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const citySearch = document.getElementById('citySearch');

        searchBtn.addEventListener('click', () => {
            this.searchCity();
        });

        citySearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchCity();
            }
        });

        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target);
            });
        });

        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchNav(e.target);
            });
        });
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('uk-UA', options);
        document.getElementById('currentDate').textContent = dateString;
    }

    async loadWeatherData() {
        try {
            // Simulate API call with mock data
            this.weatherData = this.getMockWeatherData();
            this.forecastData = this.getMockForecastData();
            
            this.updateCurrentWeather();
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showError('Помилка завантаження даних погоди');
        }
    }

    getMockWeatherData() {
        return {
            city: this.currentCity,
            temperature: -2,
            feelsLike: -5,
            description: 'Сніг',
            icon: 'snowflake',
            humidity: 85,
            windSpeed: 5,
            visibility: 10,
            pressure: 1013,
            weather: {
                main: 'Snow',
                description: 'light snow'
            }
        };
    }

    getMockForecastData() {
        const forecast = [];
        const weatherConditions = [
            { desc: 'Сонячно', icon: 'sun', temp: 5 },
            { desc: 'Хмарно', icon: 'cloud', temp: 2 },
            { desc: 'Дощ', icon: 'cloud-rain', temp: 1 },
            { desc: 'Сніг', icon: 'snowflake', temp: -3 },
            { desc: 'Туман', icon: 'smog', temp: 0 }
        ];

        for (let i = 1; i <= 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            
            forecast.push({
                date: date,
                day: date.toLocaleDateString('uk-UA', { weekday: 'short' }),
                temperature: condition.temp + Math.floor(Math.random() * 10) - 5,
                description: condition.desc,
                icon: condition.icon,
                humidity: 60 + Math.floor(Math.random() * 30),
                windSpeed: 3 + Math.floor(Math.random() * 15)
            });
        }

        return forecast;
    }

    updateCurrentWeather() {
        if (!this.weatherData) return;

        document.getElementById('currentCity').textContent = this.weatherData.city;
        document.getElementById('currentTemp').textContent = `${this.weatherData.temperature}°C`;
        document.getElementById('currentIcon').className = `fas fa-${this.weatherData.icon}`;
        document.getElementById('currentDesc').textContent = this.weatherData.description;
        document.getElementById('currentFeels').textContent = `Відчувається як ${this.weatherData.feelsLike}°C`;
        document.getElementById('currentWind').textContent = `${this.weatherData.windSpeed} км/год`;
        document.getElementById('currentHumidity').textContent = `${this.weatherData.humidity}%`;
        document.getElementById('currentVisibility').textContent = `${this.weatherData.visibility} км`;
        document.getElementById('currentPressure').textContent = `${this.weatherData.pressure} гПа`;
    }

    generateForecastCards() {
        const container = document.getElementById('forecastContainer');
        container.innerHTML = '';

        if (!this.forecastData) return;

        this.forecastData.slice(0, 10).forEach(day => {
            const card = this.createForecastCard(day);
            container.appendChild(card);
        });
    }

    createForecastCard(day) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        card.innerHTML = `
            <div class="forecast-date">${day.day}</div>
            <div class="forecast-icon">
                <i class="fas fa-${day.icon}"></i>
            </div>
            <div class="forecast-temp">${day.temperature}°C</div>
            <div class="forecast-desc">${day.description}</div>
            <div class="forecast-details">
                <span>Вологість: ${day.humidity}%</span>
                <span>Вітер: ${day.windSpeed} км/год</span>
            </div>
        `;

        return card;
    }

    generateHourlyForecast() {
        const container = document.getElementById('hourlyContainer');
        container.innerHTML = '';

        const hours = [];
        const now = new Date();
        
        for (let i = 0; i < 24; i++) {
            const hour = new Date(now);
            hour.setHours(now.getHours() + i);
            
            const weatherConditions = [
                { desc: 'Сонячно', icon: 'sun', temp: 5 },
                { desc: 'Хмарно', icon: 'cloud', temp: 2 },
                { desc: 'Дощ', icon: 'cloud-rain', temp: 1 },
                { desc: 'Сніг', icon: 'snowflake', temp: -3 }
            ];
            
            const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            
            hours.push({
                time: hour.getHours() + ':00',
                temperature: condition.temp + Math.floor(Math.random() * 8) - 4,
                icon: condition.icon
            });
        }

        hours.forEach(hour => {
            const item = document.createElement('div');
            item.className = 'hourly-item';
            
            item.innerHTML = `
                <div class="hourly-time">${hour.time}</div>
                <div class="hourly-icon">
                    <i class="fas fa-${hour.icon}"></i>
                </div>
                <div class="hourly-temp">${hour.temperature}°C</div>
            `;
            
            container.appendChild(item);
        });
    }

    searchCity() {
        const cityInput = document.getElementById('citySearch');
        const city = cityInput.value.trim();
        
        if (city) {
            this.currentCity = city;
            this.loadWeatherData();
            cityInput.value = '';
            this.showSuccess(`Прогноз погоди для міста ${city}`);
        }
    }

    switchTab(clickedTab) {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');

        const period = parseInt(clickedTab.dataset.period);
        this.updateForecastPeriod(period);
    }

    updateForecastPeriod(period) {
        const container = document.getElementById('forecastContainer');
        container.innerHTML = '';

        if (!this.forecastData) return;

        this.forecastData.slice(0, period).forEach(day => {
            const card = this.createForecastCard(day);
            container.appendChild(card);
        });
    }

    switchNav(clickedLink) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');

        // Handle navigation (in a real app, this would load different pages)
        const section = clickedLink.textContent;
        this.showInfo(`Перехід до розділу: ${section}`);
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = '#4CAF50';
                break;
            case 'error':
                notification.style.background = '#f44336';
                break;
            case 'info':
                notification.style.background = '#2196F3';
                break;
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Real API integration methods (commented out for demo)
    async fetchWeatherData(city) {
        // Uncomment and configure for real API usage
        /*
        const response = await fetch(
            `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=uk`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        return await response.json();
        */
    }

    async fetchForecastData(city) {
        // Uncomment and configure for real API usage
        /*
        const response = await fetch(
            `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=uk`
        );
        
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        
        return await response.json();
        */
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const addLoadingAnimation = () => {
        const cards = document.querySelectorAll('.forecast-card, .hourly-item');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    };

    // Add fade-in animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.6s ease-in-out forwards;
            opacity: 0;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .weather-card {
            animation: slideIn 0.8s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Trigger animations after a short delay
    setTimeout(addLoadingAnimation, 500);

    // Add hover effects for map cards
    const mapCards = document.querySelectorAll('.map-card');
    mapCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Add smooth scrolling for hourly forecast
    const hourlyContainer = document.getElementById('hourlyContainer');
    if (hourlyContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        hourlyContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            hourlyContainer.style.cursor = 'grabbing';
            startX = e.pageX - hourlyContainer.offsetLeft;
            scrollLeft = hourlyContainer.scrollLeft;
        });

        hourlyContainer.addEventListener('mouseleave', () => {
            isDown = false;
            hourlyContainer.style.cursor = 'grab';
        });

        hourlyContainer.addEventListener('mouseup', () => {
            isDown = false;
            hourlyContainer.style.cursor = 'grab';
        });

        hourlyContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - hourlyContainer.offsetLeft;
            const walk = (x - startX) * 2;
            hourlyContainer.scrollLeft = scrollLeft - walk;
        });
    }
});