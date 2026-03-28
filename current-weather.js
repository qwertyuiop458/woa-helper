// Current Weather Page JavaScript
class CurrentWeatherPage {
    constructor() {
        this.currentCity = 'Київ';
        this.weatherData = null;
        this.airQualityData = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentTime();
        this.loadWeatherData();
        this.loadAirQualityData();
        this.loadWeatherAlerts();
        
        // Update time every minute
        setInterval(() => {
            this.updateCurrentTime();
        }, 60000);
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
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    async loadWeatherData() {
        try {
            // Simulate API call with mock data
            this.weatherData = this.getMockWeatherData();
            this.updateWeatherDisplay();
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
            maxTemp: 1,
            minTemp: -8,
            description: 'Сніг',
            icon: 'snowflake',
            humidity: 85,
            dewPoint: -4,
            evaporation: 0.2,
            windSpeed: 5,
            windDirection: 'Північно-західний',
            windGusts: 12,
            pressure: 1013,
            pressureTrend: 'Стабільний',
            altitude: 179,
            visibility: 10,
            cloudiness: 85,
            uvIndex: 1,
            sunrise: '07:45',
            sunset: '16:15',
            dayLength: '8г 30хв'
        };
    }

    updateWeatherDisplay() {
        if (!this.weatherData) return;

        // Update main weather display
        document.getElementById('currentCity').textContent = this.weatherData.city;
        document.getElementById('currentTemp').textContent = `${this.weatherData.temperature}°C`;
        document.getElementById('currentIcon').className = `fas fa-${this.weatherData.icon}`;
        document.getElementById('currentDesc').textContent = this.weatherData.description;
        document.getElementById('currentFeels').textContent = `Відчувається як ${this.weatherData.feelsLike}°C`;

        // Update detailed temperature
        document.getElementById('currentTempDetail').textContent = `${this.weatherData.temperature}°C`;
        document.getElementById('feelsLikeDetail').textContent = `${this.weatherData.feelsLike}°C`;
        document.getElementById('maxTempDetail').textContent = `${this.weatherData.maxTemp}°C`;
        document.getElementById('minTempDetail').textContent = `${this.weatherData.minTemp}°C`;

        // Update wind details
        document.getElementById('windSpeedDetail').textContent = `${this.weatherData.windSpeed} км/год`;
        document.getElementById('windDirectionDetail').textContent = this.weatherData.windDirection;
        document.getElementById('windGustsDetail').textContent = `${this.weatherData.windGusts} км/год`;

        // Update humidity details
        document.getElementById('humidityDetail').textContent = `${this.weatherData.humidity}%`;
        document.getElementById('dewPointDetail').textContent = `${this.weatherData.dewPoint}°C`;
        document.getElementById('evaporationDetail').textContent = `${this.weatherData.evaporation} мм/год`;

        // Update pressure details
        document.getElementById('pressureDetail').textContent = `${this.weatherData.pressure} гПа`;
        document.getElementById('pressureTrendDetail').textContent = this.weatherData.pressureTrend;
        document.getElementById('altitudeDetail').textContent = `${this.weatherData.altitude} м`;

        // Update visibility details
        document.getElementById('visibilityDetail').textContent = `${this.weatherData.visibility} км`;
        document.getElementById('cloudinessDetail').textContent = `${this.weatherData.cloudiness}%`;
        document.getElementById('uvIndexDetail').textContent = `${this.weatherData.uvIndex} (Низький)`;

        // Update solar activity
        document.getElementById('sunriseDetail').textContent = this.weatherData.sunrise;
        document.getElementById('sunsetDetail').textContent = this.weatherData.sunset;
        document.getElementById('dayLengthDetail').textContent = this.weatherData.dayLength;
    }

    async loadAirQualityData() {
        try {
            this.airQualityData = this.getMockAirQualityData();
            this.updateAirQualityDisplay();
        } catch (error) {
            console.error('Error loading air quality data:', error);
        }
    }

    getMockAirQualityData() {
        return {
            aqi: 45,
            level: 'Добра',
            pm25: 12,
            pm10: 25,
            ozone: 35,
            no2: 15
        };
    }

    updateAirQualityDisplay() {
        if (!this.airQualityData) return;

        const aqiNumber = document.getElementById('aqiNumber');
        const aqiLabel = document.getElementById('aqiLabel');
        
        aqiNumber.textContent = this.airQualityData.aqi;
        aqiLabel.textContent = this.airQualityData.level;

        // Update AQI color based on level
        this.updateAQIColor(this.airQualityData.aqi);

        // Update pollutant details
        document.getElementById('pm25Detail').textContent = `${this.airQualityData.pm25} µg/m³`;
        document.getElementById('pm10Detail').textContent = `${this.airQualityData.pm10} µg/m³`;
        document.getElementById('ozoneDetail').textContent = `${this.airQualityData.ozone} µg/m³`;
        document.getElementById('no2Detail').textContent = `${this.airQualityData.no2} µg/m³`;
    }

    updateAQIColor(aqi) {
        const aqiNumber = document.getElementById('aqiNumber');
        const aqiLabel = document.getElementById('aqiLabel');
        
        let color, bgColor;
        
        if (aqi <= 50) {
            color = '#00e400';
            bgColor = '#00e40020';
        } else if (aqi <= 100) {
            color = '#ffff00';
            bgColor = '#ffff0020';
        } else if (aqi <= 150) {
            color = '#ff7e00';
            bgColor = '#ff7e0020';
        } else if (aqi <= 200) {
            color = '#ff0000';
            bgColor = '#ff000020';
        } else if (aqi <= 300) {
            color = '#8f3f97';
            bgColor = '#8f3f9720';
        } else {
            color = '#7e0023';
            bgColor = '#7e002320';
        }

        aqiNumber.style.color = color;
        aqiLabel.style.color = color;
        aqiNumber.parentElement.style.backgroundColor = bgColor;
    }

    loadWeatherAlerts() {
        const alerts = this.getMockAlerts();
        this.displayAlerts(alerts);
    }

    getMockAlerts() {
        return [
            {
                type: 'warning',
                title: 'Попередження про ожеледицю',
                description: 'Очікується ожеледиця вночі. Будьте обережні на дорогах.',
                validUntil: '16 грудня, 06:00',
                icon: 'exclamation-triangle'
            },
            {
                type: 'info',
                title: 'Сильний вітер',
                description: 'Очікуються пориви вітру до 15 м/с.',
                validUntil: '15 грудня, 23:00',
                icon: 'wind'
            }
        ];
    }

    displayAlerts(alerts) {
        const container = document.getElementById('alertsContainer');
        container.innerHTML = '';

        if (alerts.length === 0) {
            container.innerHTML = '<p class="no-alerts">Наразі немає активних попереджень про погоду.</p>';
            return;
        }

        alerts.forEach(alert => {
            const alertElement = this.createAlertElement(alert);
            container.appendChild(alertElement);
        });
    }

    createAlertElement(alert) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-item alert-${alert.type}`;
        
        alertDiv.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${alert.icon}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.description}</p>
                <span class="alert-time">Дійсне до: ${alert.validUntil}</span>
            </div>
        `;

        return alertDiv;
    }

    searchCity() {
        const cityInput = document.getElementById('citySearch');
        const city = cityInput.value.trim();
        
        if (city) {
            this.currentCity = city;
            this.loadWeatherData();
            this.loadAirQualityData();
            cityInput.value = '';
            this.showSuccess(`Прогноз погоди для міста ${city}`);
        }
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
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
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

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CurrentWeatherPage();
});

// Add additional styles for current weather page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .weather-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .weather-detail-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }

        .weather-detail-card:hover {
            transform: translateY(-5px);
        }

        .weather-detail-card h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .weather-detail-card h3 i {
            color: #667eea;
        }

        .detail-content {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .detail-row span:first-child {
            color: #666;
            font-weight: 500;
        }

        .detail-row span:last-child {
            color: #333;
            font-weight: 600;
        }

        .air-quality {
            margin-bottom: 3rem;
        }

        .air-quality h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .air-quality-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .aqi-display {
            text-align: center;
            padding: 1rem;
            border-radius: 10px;
            min-width: 120px;
        }

        .aqi-number {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .aqi-label {
            font-size: 1.1rem;
            font-weight: 600;
        }

        .aqi-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            flex: 1;
        }

        .aqi-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 8px;
        }

        .aqi-item span:first-child {
            color: #666;
            font-weight: 500;
        }

        .aqi-item span:last-child {
            color: #333;
            font-weight: 600;
        }

        .weather-alerts {
            margin-bottom: 3rem;
        }

        .weather-alerts h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .alerts-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .alert-item {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }

        .alert-item.alert-warning {
            border-left: 4px solid #ff9800;
        }

        .alert-item.alert-info {
            border-left: 4px solid #2196F3;
        }

        .alert-icon {
            font-size: 1.5rem;
            color: #ff9800;
            margin-top: 0.25rem;
        }

        .alert-item.alert-info .alert-icon {
            color: #2196F3;
        }

        .alert-content h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
        }

        .alert-content p {
            color: #666;
            margin-bottom: 0.5rem;
            line-height: 1.5;
        }

        .alert-time {
            font-size: 0.9rem;
            color: #888;
            font-style: italic;
        }

        .no-alerts {
            text-align: center;
            color: white;
            font-size: 1.1rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
        }

        @media (max-width: 768px) {
            .weather-grid {
                grid-template-columns: 1fr;
            }

            .air-quality-card {
                flex-direction: column;
                text-align: center;
            }

            .aqi-details {
                grid-template-columns: 1fr;
            }

            .alert-item {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
});