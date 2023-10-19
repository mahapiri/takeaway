let articles =
    [
        {
            'menutitle': 'Pizza Prosciutto',
            'menuImg': 'img/meal/prosciutto.jpg',
            'description': 'leckere Pizza',
            'price': 5.99,
            'currency': '€'
        },
        {
            'menutitle': 'Pizza Tomato',
            'menuImg': 'img/meal/tomato.jpg',
            'description': 'leckere tomaten Pizza',
            'price': 6.99,
            'currency': '€'
        },
        {
            'menutitle': 'Pizza Chicken',
            'menuImg': 'img/meal/chicken.jpg',
            'description': 'leckere hühnchen Pizza',
            'price': 9.99,
            'currency': '€'
        },
        {
            'menutitle': 'Wedges',
            'menuImg': 'img/meal/wedges.jpg',
            'description': 'leckere Wedges',
            'price': 4.99,
            'currency': '€'
        },
        {
            'menutitle': 'Salat',
            'menuImg': 'img/meal/salad.jpg',
            'description': 'leckerer Salat',
            'price': 4.99,
            'currency': '€'
        },
        {
            'menutitle': 'Dip - Joghurt',
            'menuImg': 'img/meal/joghurt.png',
            'description': 'leckerer Dip',
            'price': 1.99,
            'currency': '€'
        },
        {
            'menutitle': 'Cola',
            'menuImg': 'img/meal/cola.png',
            'description': 'leckere Cola',
            'price': 2.99,
            'currency': '€'
        },
        {
            'menutitle': 'Fanta',
            'menuImg': 'img/meal/fanta.png',
            'description': 'leckere Fanta',
            'price': 2.99,
            'currency': '€'
        },
        {
            'menutitle': 'Vitamin Water',
            'menuImg': 'img/meal/vitamin-water.png',
            'description': 'leckeres Vitamin Wasser',
            'price': 2.99,
            'currency': '€'
        }
    ]

function renderContent() {
    renderCart();
    renderMenucard();
}

function renderCart() {
    let cart = document.getElementById('cart');
    cart.innerHTML = /*html*/`
        <h2>Warenkorb</h2>    
    `;
}

function renderMenucard() {
    let menucard = document.getElementById('menucard');
    menucard.innerHTML = '';

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        menucard.innerHTML += /*html*/`
        <div class="menubox">
            <div class="menu-section">
                <div class="menu-title">
                    <h4>${article['menutitle']}</h4>
                    <img src="img/button/info.png" alt="info button" class="info-button-menu">
                </div>
                <span>${article['description']}</span>
                <span>${article['price']} ${article['currency']}</span>
            </div>
            <div class="menu-img-section">
                <img src="${article['menuImg']}" alt="" class="menu-img">
                <img src="img/button/plus.png" alt="" class="plus-button">
            </div>
        </div>    
    `;
    }
}