// Weather Maps JavaScript
class WeatherMaps {
    constructor() {
        this.map = null;
        this.currentLayer = null;
        this.currentType = 'temperature';
        this.currentTime = 'current';
        this.weatherStations = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeMap();
        this.loadWeatherStations();
        this.updateMapLayer();
        this.generateLegend();
    }

    setupEventListeners() {
        // Map type buttons
        const mapTypeBtns = document.querySelectorAll('.map-type-btn');
        mapTypeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMapType(e.target);
            });
        });

        // Time selector
        const timeSelect = document.getElementById('timeSelect');
        timeSelect.addEventListener('change', (e) => {
            this.currentTime = e.target.value;
            this.updateMapLayer();
        });

        // Satellite buttons
        const satelliteBtns = document.querySelectorAll('.satellite-btn');
        satelliteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSatelliteType(e.target);
            });
        });

        // Radar buttons
        const radarBtns = document.querySelectorAll('.radar-btn');
        radarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchRadarTime(e.target);
            });
        });

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

    initializeMap() {
        // Initialize Leaflet map centered on Ukraine
        this.map = L.map('weatherMap').setView([48.3794, 31.1656], 6);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add click event to map
        this.map.on('click', (e) => {
            this.showMapInfo(e.latlng);
        });

        // Add weather data layer (placeholder)
        this.addWeatherDataLayer();
    }

    addWeatherDataLayer() {
        // Create mock weather data layer
        const weatherData = this.generateMockWeatherData();
        
        // Create a heatmap-like layer
        const weatherLayer = L.layerGroup();
        
        weatherData.forEach(point => {
            const marker = L.circleMarker([point.lat, point.lng], {
                radius: 8,
                fillColor: this.getColorForValue(point.value, this.currentType),
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });

            marker.bindPopup(`
                <div class="map-popup">
                    <h4>${point.city}</h4>
                    <p>${this.getWeatherDescription(point.value, this.currentType)}</p>
                </div>
            `);

            weatherLayer.addLayer(marker);
        });

        this.currentLayer = weatherLayer;
        this.map.addLayer(weatherLayer);
    }

    generateMockWeatherData() {
        const cities = [
            { name: 'Київ', lat: 50.4501, lng: 30.5234 },
            { name: 'Львів', lat: 49.8397, lng: 24.0297 },
            { name: 'Харків', lat: 49.9935, lng: 36.2304 },
            { name: 'Одеса', lat: 46.4825, lng: 30.7233 },
            { name: 'Дніпро', lat: 48.4647, lng: 35.0462 },
            { name: 'Донецьк', lat: 48.0159, lng: 37.8028 },
            { name: 'Запоріжжя', lat: 47.8388, lng: 35.1396 },
            { name: 'Полтава', lat: 49.5883, lng: 34.5514 },
            { name: 'Суми', lat: 50.9077, lng: 34.7981 },
            { name: 'Черкаси', lat: 49.4444, lng: 32.0598 }
        ];

        return cities.map(city => ({
            city: city.name,
            lat: city.lat,
            lng: city.lng,
            value: this.getRandomValue(this.currentType)
        }));
    }

    getRandomValue(type) {
        switch(type) {
            case 'temperature':
                return Math.floor(Math.random() * 40) - 10; // -10 to 30°C
            case 'precipitation':
                return Math.floor(Math.random() * 100); // 0-100%
            case 'wind':
                return Math.floor(Math.random() * 50); // 0-50 km/h
            case 'pressure':
                return 1000 + Math.floor(Math.random() * 50); // 1000-1050 hPa
            case 'humidity':
                return Math.floor(Math.random() * 100); // 0-100%
            case 'clouds':
                return Math.floor(Math.random() * 100); // 0-100%
            default:
                return 0;
        }
    }

    getColorForValue(value, type) {
        switch(type) {
            case 'temperature':
                if (value < -5) return '#0000ff';
                if (value < 0) return '#0066ff';
                if (value < 10) return '#00ccff';
                if (value < 20) return '#ffff00';
                if (value < 25) return '#ff9900';
                return '#ff0000';
            case 'precipitation':
                if (value < 10) return '#ffffff';
                if (value < 25) return '#00ff00';
                if (value < 50) return '#ffff00';
                if (value < 75) return '#ff9900';
                return '#ff0000';
            case 'wind':
                if (value < 5) return '#00ff00';
                if (value < 15) return '#ffff00';
                if (value < 25) return '#ff9900';
                return '#ff0000';
            case 'pressure':
                if (value < 1010) return '#ff0000';
                if (value < 1020) return '#ff9900';
                if (value < 1030) return '#ffff00';
                return '#00ff00';
            case 'humidity':
                if (value < 30) return '#ff0000';
                if (value < 50) return '#ff9900';
                if (value < 70) return '#ffff00';
                return '#00ff00';
            case 'clouds':
                if (value < 25) return '#00ff00';
                if (value < 50) return '#ffff00';
                if (value < 75) return '#ff9900';
                return '#ff0000';
            default:
                return '#cccccc';
        }
    }

    getWeatherDescription(value, type) {
        switch(type) {
            case 'temperature':
                return `${value}°C`;
            case 'precipitation':
                return `${value}% ймовірність опадів`;
            case 'wind':
                return `${value} км/год`;
            case 'pressure':
                return `${value} гПа`;
            case 'humidity':
                return `${value}% вологість`;
            case 'clouds':
                return `${value}% хмарність`;
            default:
                return `${value}`;
        }
    }

    switchMapType(clickedBtn) {
        const btns = document.querySelectorAll('.map-type-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        this.currentType = clickedBtn.dataset.type;
        this.updateMapLayer();
        this.generateLegend();
    }

    updateMapLayer() {
        if (this.currentLayer) {
            this.map.removeLayer(this.currentLayer);
        }
        this.addWeatherDataLayer();
    }

    generateLegend() {
        const legendContent = document.getElementById('legendContent');
        const legendData = this.getLegendData();
        
        legendContent.innerHTML = '';
        
        legendData.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${item.color}"></div>
                <span>${item.label}</span>
            `;
            legendContent.appendChild(legendItem);
        });
    }

    getLegendData() {
        switch(this.currentType) {
            case 'temperature':
                return [
                    { color: '#0000ff', label: '< -5°C' },
                    { color: '#0066ff', label: '-5°C - 0°C' },
                    { color: '#00ccff', label: '0°C - 10°C' },
                    { color: '#ffff00', label: '10°C - 20°C' },
                    { color: '#ff9900', label: '20°C - 25°C' },
                    { color: '#ff0000', label: '> 25°C' }
                ];
            case 'precipitation':
                return [
                    { color: '#ffffff', label: '< 10%' },
                    { color: '#00ff00', label: '10% - 25%' },
                    { color: '#ffff00', label: '25% - 50%' },
                    { color: '#ff9900', label: '50% - 75%' },
                    { color: '#ff0000', label: '> 75%' }
                ];
            case 'wind':
                return [
                    { color: '#00ff00', label: '< 5 км/год' },
                    { color: '#ffff00', label: '5-15 км/год' },
                    { color: '#ff9900', label: '15-25 км/год' },
                    { color: '#ff0000', label: '> 25 км/год' }
                ];
            default:
                return [
                    { color: '#00ff00', label: 'Низький' },
                    { color: '#ffff00', label: 'Середній' },
                    { color: '#ff9900', label: 'Високий' },
                    { color: '#ff0000', label: 'Дуже високий' }
                ];
        }
    }

    showMapInfo(latlng) {
        const infoContent = document.getElementById('mapInfoContent');
        const mockData = this.getMockPointData(latlng);
        
        infoContent.innerHTML = `
            <div class="point-info">
                <h5>Координати: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}</h5>
                <p><strong>Температура:</strong> ${mockData.temperature}°C</p>
                <p><strong>Вологість:</strong> ${mockData.humidity}%</p>
                <p><strong>Вітер:</strong> ${mockData.wind} км/год</p>
                <p><strong>Тиск:</strong> ${mockData.pressure} гПа</p>
            </div>
        `;
    }

    getMockPointData(latlng) {
        return {
            temperature: Math.floor(Math.random() * 40) - 10,
            humidity: Math.floor(Math.random() * 100),
            wind: Math.floor(Math.random() * 50),
            pressure: 1000 + Math.floor(Math.random() * 50)
        };
    }

    loadWeatherStations() {
        const stations = this.getMockStations();
        this.displayStations(stations);
    }

    getMockStations() {
        return [
            { name: 'Київ Бориспіль', temp: -2, humidity: 85, wind: 5, status: 'online' },
            { name: 'Львів', temp: 1, humidity: 78, wind: 8, status: 'online' },
            { name: 'Харків', temp: -5, humidity: 90, wind: 3, status: 'online' },
            { name: 'Одеса', temp: 3, humidity: 72, wind: 12, status: 'offline' },
            { name: 'Дніпро', temp: -1, humidity: 82, wind: 6, status: 'online' }
        ];
    }

    displayStations(stations) {
        const container = document.getElementById('stationsGrid');
        container.innerHTML = '';

        stations.forEach(station => {
            const stationCard = this.createStationCard(station);
            container.appendChild(stationCard);
        });
    }

    createStationCard(station) {
        const card = document.createElement('div');
        card.className = 'station-card';
        
        card.innerHTML = `
            <div class="station-header">
                <h4>${station.name}</h4>
                <span class="status ${station.status}">${station.status === 'online' ? 'Онлайн' : 'Офлайн'}</span>
            </div>
            <div class="station-data">
                <div class="data-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>${station.temp}°C</span>
                </div>
                <div class="data-item">
                    <i class="fas fa-tint"></i>
                    <span>${station.humidity}%</span>
                </div>
                <div class="data-item">
                    <i class="fas fa-wind"></i>
                    <span>${station.wind} км/год</span>
                </div>
            </div>
        `;

        return card;
    }

    switchSatelliteType(clickedBtn) {
        const btns = document.querySelectorAll('.satellite-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        const type = clickedBtn.dataset.type;
        this.updateSatelliteImage(type);
    }

    updateSatelliteImage(type) {
        const satelliteImage = document.getElementById('satelliteImage');
        satelliteImage.innerHTML = `
            <div class="satellite-placeholder">
                <i class="fas fa-satellite"></i>
                <p>Супутникове зображення - ${type}</p>
                <span>Оновлюється кожні 15 хвилин</span>
            </div>
        `;
    }

    switchRadarTime(clickedBtn) {
        const btns = document.querySelectorAll('.radar-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        const time = clickedBtn.dataset.time;
        this.updateRadarImage(time);
    }

    updateRadarImage(time) {
        const radarImage = document.getElementById('radarImage');
        radarImage.innerHTML = `
            <div class="radar-placeholder">
                <i class="fas fa-radar"></i>
                <p>Радар опадів - ${time}</p>
                <span>Оновлюється кожні 5 хвилин</span>
            </div>
        `;
    }

    searchCity() {
        const cityInput = document.getElementById('citySearch');
        const city = cityInput.value.trim();
        
        if (city) {
            // Simulate city search
            this.showSuccess(`Пошук міста: ${city}`);
            cityInput.value = '';
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
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

// Initialize the maps when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherMaps();
});

// Add additional styles for weather maps page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .map-controls {
            margin-bottom: 2rem;
        }

        .control-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .control-panel h2 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .map-type-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1.5rem;
            justify-content: center;
        }

        .map-type-btn {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.3);
            color: #667eea;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .map-type-btn:hover,
        .map-type-btn.active {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }

        .time-selector {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
        }

        .time-selector label {
            font-weight: 600;
            color: #333;
        }

        .time-selector select {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            font-size: 0.9rem;
        }

        .map-section {
            margin-bottom: 3rem;
        }

        .map-container {
            position: relative;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        #weatherMap {
            height: 500px;
            width: 100%;
        }

        .map-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 1000;
        }

        .map-legend {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            min-width: 150px;
        }

        .map-legend h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.75rem;
        }

        .legend-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }

        .map-info {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            min-width: 200px;
        }

        .info-card h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.75rem;
        }

        .point-info h5 {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.5rem;
        }

        .point-info p {
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }

        .weather-stations {
            margin-bottom: 3rem;
        }

        .weather-stations h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .stations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .station-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }

        .station-card:hover {
            transform: translateY(-5px);
        }

        .station-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .station-header h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
        }

        .status {
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .status.online {
            background: #4CAF50;
            color: white;
        }

        .status.offline {
            background: #f44336;
            color: white;
        }

        .station-data {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .data-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .data-item i {
            color: #667eea;
            width: 20px;
        }

        .satellite-images,
        .radar-section {
            margin-bottom: 3rem;
        }

        .satellite-images h2,
        .radar-section h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .satellite-controls,
        .radar-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .satellite-btn,
        .radar-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .satellite-btn:hover,
        .satellite-btn.active,
        .radar-btn:hover,
        .radar-btn.active {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .satellite-container,
        .radar-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .satellite-image,
        .radar-image {
            height: 300px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }

        .satellite-placeholder,
        .radar-placeholder {
            text-align: center;
        }

        .satellite-placeholder i,
        .radar-placeholder i {
            font-size: 4rem;
            color: #667eea;
            margin-bottom: 1rem;
        }

        .satellite-placeholder p,
        .radar-placeholder p {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .satellite-placeholder span,
        .radar-placeholder span {
            font-size: 0.9rem;
            color: #888;
        }

        @media (max-width: 768px) {
            .map-type-selector {
                flex-direction: column;
                align-items: center;
            }

            .map-type-btn {
                width: 100%;
                max-width: 200px;
            }

            .time-selector {
                flex-direction: column;
                gap: 0.5rem;
            }

            .map-overlay {
                position: static;
                margin-top: 1rem;
            }

            .stations-grid {
                grid-template-columns: 1fr;
            }

            .satellite-controls,
            .radar-controls {
                flex-direction: column;
                align-items: center;
            }

            .satellite-btn,
            .radar-btn {
                width: 100%;
                max-width: 200px;
            }
        }
    `;
    document.head.appendChild(style);
});