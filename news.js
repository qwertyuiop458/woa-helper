// News Page JavaScript
class NewsPage {
    constructor() {
        this.currentCategory = 'all';
        this.newsData = [];
        this.alertsData = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadNewsData();
        this.loadAlertsData();
        this.displayNews();
        this.displayAlerts();
    }

    setupEventListeners() {
        // Category buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchCategory(e.target);
            });
        });

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const newsSearch = document.getElementById('newsSearch');

        searchBtn.addEventListener('click', () => {
            this.searchNews();
        });

        newsSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchNews();
            }
        });

        // Read more buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                e.preventDefault();
                this.showArticleDetails(e.target.closest('.news-article'));
            }
        });
    }

    loadNewsData() {
        this.newsData = this.getMockNewsData();
    }

    getMockNewsData() {
        return [
            {
                id: 1,
                title: 'Сильні морози очікуються в Україні наступного тижня',
                excerpt: 'За прогнозами синоптиків, наступного тижня в Україні очікуються сильні морози. Температура може опуститися до -20°C в деяких регіонах.',
                content: 'Детальний зміст статті про сильні морози в Україні...',
                category: 'forecast',
                date: '2024-12-15',
                author: 'Метеоролог',
                views: 1234,
                image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=Морози',
                featured: true
            },
            {
                id: 2,
                title: 'Зміни клімату впливають на погоду в Україні',
                excerpt: 'Дослідження показують, що глобальні зміни клімату все більше впливають на погодні умови в Україні.',
                content: 'Детальний зміст статті про зміни клімату...',
                category: 'climate',
                date: '2024-12-14',
                author: 'Кліматолог',
                views: 856,
                image: 'https://via.placeholder.com/400x250/4CAF50/ffffff?text=Клімат'
            },
            {
                id: 3,
                title: 'Попередження про сильні вітри в західних областях',
                excerpt: 'Метеорологи попереджають про сильні вітри, які очікуються в західних областях України.',
                content: 'Детальний зміст статті про сильні вітри...',
                category: 'disasters',
                date: '2024-12-13',
                author: 'Синоптик',
                views: 567,
                image: 'https://via.placeholder.com/400x250/FF9800/ffffff?text=Вітер'
            },
            {
                id: 4,
                title: 'Нові методи прогнозування погоди',
                excerpt: 'Учені розробили нові методи прогнозування погоди з використанням штучного інтелекту.',
                content: 'Детальний зміст статті про нові методи...',
                category: 'science',
                date: '2024-12-12',
                author: 'Науковець',
                views: 432,
                image: 'https://via.placeholder.com/400x250/9C27B0/ffffff?text=Наука'
            },
            {
                id: 5,
                title: 'Прогноз погоди на зиму 2024-2025',
                excerpt: 'Метеорологи представили довгостроковий прогноз погоди на зиму 2024-2025 років.',
                content: 'Детальний зміст статті про зимовий прогноз...',
                category: 'forecast',
                date: '2024-12-11',
                author: 'Прогнозист',
                views: 2341,
                image: 'https://via.placeholder.com/400x250/2196F3/ffffff?text=Зима'
            },
            {
                id: 6,
                title: 'Вплив атмосферних фронтів на погоду',
                excerpt: 'Дослідження впливу атмосферних фронтів на формування погодних умов в Україні.',
                content: 'Детальний зміст статті про атмосферні фронти...',
                category: 'science',
                date: '2024-12-10',
                author: 'Фізик',
                views: 345,
                image: 'https://via.placeholder.com/400x250/607D8B/ffffff?text=Фронт'
            }
        ];
    }

    loadAlertsData() {
        this.alertsData = this.getMockAlertsData();
    }

    getMockAlertsData() {
        return [
            {
                id: 1,
                type: 'warning',
                title: 'Попередження про ожеледицю',
                description: 'Очікується ожеледиця вночі. Будьте обережні на дорогах.',
                validUntil: '2024-12-16T06:00:00',
                severity: 'high'
            },
            {
                id: 2,
                type: 'info',
                title: 'Сильний вітер',
                description: 'Очікуються пориви вітру до 15 м/с в західних областях.',
                validUntil: '2024-12-15T23:00:00',
                severity: 'medium'
            },
            {
                id: 3,
                type: 'warning',
                title: 'Снігопад',
                description: 'Очікується сильний снігопад в північних областях.',
                validUntil: '2024-12-17T12:00:00',
                severity: 'medium'
            }
        ];
    }

    switchCategory(clickedBtn) {
        const btns = document.querySelectorAll('.category-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        this.currentCategory = clickedBtn.dataset.category;
        this.displayNews();
    }

    displayNews() {
        const container = document.getElementById('newsContainer');
        container.innerHTML = '';

        const filteredNews = this.filterNews();
        
        if (filteredNews.length === 0) {
            container.innerHTML = '<p class="no-news">Новини не знайдено</p>';
            return;
        }

        filteredNews.forEach(article => {
            const articleElement = this.createNewsArticle(article);
            container.appendChild(articleElement);
        });
    }

    filterNews() {
        if (this.currentCategory === 'all') {
            return this.newsData.filter(article => !article.featured);
        }
        return this.newsData.filter(article => 
            article.category === this.currentCategory && !article.featured
        );
    }

    createNewsArticle(article) {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'news-article';
        articleDiv.dataset.id = article.id;
        
        articleDiv.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-category">${this.getCategoryName(article.category)}</div>
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <p class="article-meta">
                    <span class="date"><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                    <span class="author"><i class="fas fa-user"></i> ${article.author}</span>
                    <span class="views"><i class="fas fa-eye"></i> ${article.views}</span>
                </p>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more-btn">Читати далі</a>
            </div>
        `;

        return articleDiv;
    }

    getCategoryName(category) {
        const categories = {
            'forecast': 'Прогноз',
            'climate': 'Клімат',
            'disasters': 'Стихійні лиха',
            'science': 'Наука'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    displayAlerts() {
        const container = document.getElementById('alertsList');
        container.innerHTML = '';

        this.alertsData.forEach(alert => {
            const alertElement = this.createAlertElement(alert);
            container.appendChild(alertElement);
        });
    }

    createAlertElement(alert) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert-item alert-${alert.type} alert-${alert.severity}`;
        
        alertDiv.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${this.getAlertIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.description}</p>
                <span class="alert-time">Дійсне до: ${this.formatDateTime(alert.validUntil)}</span>
            </div>
        `;

        return alertDiv;
    }

    getAlertIcon(type) {
        const icons = {
            'warning': 'exclamation-triangle',
            'info': 'info-circle',
            'error': 'times-circle'
        };
        return icons[type] || 'info-circle';
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    searchNews() {
        const searchInput = document.getElementById('newsSearch');
        const query = searchInput.value.trim().toLowerCase();
        
        if (query) {
            const filteredNews = this.newsData.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.content.toLowerCase().includes(query)
            );
            
            this.displaySearchResults(filteredNews, query);
        } else {
            this.displayNews();
        }
    }

    displaySearchResults(results, query) {
        const container = document.getElementById('newsContainer');
        container.innerHTML = '';

        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-results">
                    <h3>Результати пошуку для "${query}"</h3>
                    <p>Новини не знайдено</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="search-results">
                <h3>Результати пошуку для "${query}" (${results.length})</h3>
            </div>
        `;

        results.forEach(article => {
            const articleElement = this.createNewsArticle(article);
            container.appendChild(articleElement);
        });
    }

    showArticleDetails(articleElement) {
        const articleId = parseInt(articleElement.dataset.id);
        const article = this.newsData.find(a => a.id === articleId);
        
        if (article) {
            this.showModal(article);
        }
    }

    showModal(article) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${article.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="article-meta">
                        <span class="date"><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                        <span class="author"><i class="fas fa-user"></i> ${article.author}</span>
                        <span class="views"><i class="fas fa-eye"></i> ${article.views}</span>
                        <span class="category"><i class="fas fa-tag"></i> ${this.getCategoryName(article.category)}</span>
                    </div>
                    <div class="article-full-content">
                        <p>${article.content}</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Add modal styles
        this.addModalStyles();
    }

    addModalStyles() {
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                }

                .modal-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #eee;
                }

                .modal-header h2 {
                    margin: 0;
                    color: #333;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                }

                .modal-close:hover {
                    color: #333;
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .modal-body img {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                }

                .article-full-content {
                    line-height: 1.6;
                    color: #333;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the news page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsPage();
});

// Add additional styles for news page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .featured-news {
            margin-bottom: 3rem;
        }

        .featured-article {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .article-image {
            position: relative;
            height: 400px;
            overflow: hidden;
        }

        .article-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .article-category {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: #667eea;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .article-content {
            padding: 2rem;
        }

        .article-content h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 1rem;
            line-height: 1.3;
        }

        .article-meta {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #666;
            flex-wrap: wrap;
        }

        .article-meta span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .article-excerpt {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .read-more-btn {
            background: #667eea;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .read-more-btn:hover {
            background: #5a6fd8;
            transform: translateY(-2px);
        }

        .news-categories {
            margin-bottom: 2rem;
        }

        .category-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .category-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .category-btn:hover,
        .category-btn.active {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .news-grid {
            margin-bottom: 3rem;
        }

        .news-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .news-article {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }

        .news-article:hover {
            transform: translateY(-5px);
        }

        .news-article .article-image {
            height: 200px;
        }

        .news-article .article-content {
            padding: 1.5rem;
        }

        .news-article h3 {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 1rem;
            line-height: 1.4;
        }

        .weather-alerts-news {
            margin-bottom: 3rem;
        }

        .weather-alerts-news h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .alerts-list {
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

        .alert-item.alert-high {
            border-left: 4px solid #f44336;
        }

        .alert-item.alert-medium {
            border-left: 4px solid #ff9800;
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

        .climate-data {
            margin-bottom: 3rem;
        }

        .climate-data h2 {
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .climate-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .climate-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }

        .climate-card:hover {
            transform: translateY(-5px);
        }

        .climate-card h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .climate-card h3 i {
            color: #667eea;
        }

        .climate-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.5rem;
        }

        .climate-card p {
            color: #666;
            font-size: 0.9rem;
        }

        .search-results {
            margin-bottom: 2rem;
        }

        .search-results h3 {
            color: white;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .no-news {
            text-align: center;
            color: white;
            font-size: 1.2rem;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
        }

        @media (max-width: 768px) {
            .article-content h1 {
                font-size: 1.5rem;
            }

            .article-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .category-tabs {
                flex-direction: column;
                align-items: center;
            }

            .category-btn {
                width: 100%;
                max-width: 200px;
            }

            .news-container {
                grid-template-columns: 1fr;
            }

            .climate-grid {
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