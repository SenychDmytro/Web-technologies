const fetchCategories = async () => {
    try {
        const response = await fetch('data/categories.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Не вдалося завантажити categories.json:", error);
        throw error; 
    }
};

const fetchProducts = async (categoryShortname) => {
    const url = `data/${categoryShortname}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Не вдалося завантажити ${url}:`, error);
        throw error;
    }
};

const contentElement = document.getElementById('content');

const renderCatalog = (categories) => {
    let html = `
        <h2 class='mb-4'>Каталог товарів</h2>
        <p>Оберіть категорію, щоб переглянути товари.</p>
        <div class="list-group catalog-list">
    `;
    
    categories.forEach(cat => {
        html += `
            <a href="#" class="list-group-item list-group-item-action category-link" data-shortname="${cat.shortname}">
                <strong>${cat.name}</strong>
                ${cat.notes ? `<br><small class="text-muted">${cat.notes}</small>` : ''}
            </a>
        `;
    });

    html += `
        <a href="#" id="specials-link" class="list-group-item list-group-item-action list-group-item-info mt-3">
            <strong>Specials</strong>
            <br><small class="text-muted">Переглянути випадкову категорію</small>
        </a>
    `;

    html += `</div>`;
    contentElement.innerHTML = html;
};

const renderProducts = (categoryData) => {
    let html = `<h2 class="mb-4">${categoryData.category_name}</h2>`;
    html += `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">`;

    categoryData.items.forEach(item => {
        html += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="https://place-hold.it/200x200?text=${item.shortname}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="h5 text-end text-success">${item.price}</p>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    contentElement.innerHTML = html;
};

const loadCatalog = async () => {
    contentElement.innerHTML = '<h4>Завантаження каталогу...</h4>';
    try {
        const categories = await fetchCategories();
        renderCatalog(categories);
    } catch (error) {
        contentElement.innerHTML = '<p class="text-danger">Не вдалося завантажити каталог. Перевірте консоль (F12) та переконайтесь, що ви запустили локальний сервер.</p>';
    }
};

const loadProducts = async (shortname) => {
    contentElement.innerHTML = `<h4>Завантаження товарів для ${shortname}...</h4>`;
    try {
        const productData = await fetchProducts(shortname);
        renderProducts(productData);
    } catch (error) {
        contentElement.innerHTML = '<p class="text-danger">Не вдалося завантажити товари.</p>';
    }
};

const loadSpecials = async () => {
    contentElement.innerHTML = '<h4>Пошук спецпропозиції...</h4>';
    try {
        const categories = await fetchCategories();
        const shortnames = categories.map(cat => cat.shortname);
        
        const randomIndex = Math.floor(Math.random() * shortnames.length);
        const randomShortname = shortnames[randomIndex];

        loadProducts(randomShortname);
    } catch (error) {
        contentElement.innerHTML = '<p class="text-danger">Не вдалося завантажити спецпропозицію.</p>';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();

    document.getElementById('navCatalog').addEventListener('click', (event) => {
        event.preventDefault();
        loadCatalog();
    });

    contentElement.addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (!target) return;

        if (target.classList.contains('category-link')) {
            event.preventDefault();
            const shortname = target.dataset.shortname;
            loadProducts(shortname);
        }
        
        if (target.id === 'specials-link') {
            event.preventDefault();
            loadSpecials();
        }
    });
});