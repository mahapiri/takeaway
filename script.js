let articles =
    [
        {
            'menu': 'Pizza Prosciutto',
            'menuImg': 'img/meal/prosciutto.jpg',
            'description': 'leckere Pizza',
            'price': 5.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Pizza Tomato',
            'menuImg': 'img/meal/tomato.jpg',
            'description': 'leckere tomaten Pizza',
            'price': 6.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Pizza Chicken',
            'menuImg': 'img/meal/chicken.jpg',
            'description': 'leckere hühnchen Pizza',
            'price': 9.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Wedges',
            'menuImg': 'img/meal/wedges.jpg',
            'description': 'leckere Wedges',
            'price': 4.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Salat',
            'menuImg': 'img/meal/salad.jpg',
            'description': 'leckerer Salat',
            'price': 4.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Dip - Joghurt',
            'menuImg': 'img/meal/joghurt.png',
            'description': 'leckerer Dip',
            'price': 1.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Cola',
            'menuImg': 'img/meal/cola.png',
            'description': 'leckere Cola',
            'price': 2.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Fanta',
            'menuImg': 'img/meal/fanta.png',
            'description': 'leckere Fanta',
            'price': 2.99,
            'currency': '€',
            'quantity': 1
        },
        {
            'menu': 'Vitamin Water',
            'menuImg': 'img/meal/vitamin-water.png',
            'description': 'leckeres Vitamin Wasser',
            'price': 2.99,
            'currency': '€',
            'quantity': 1
        }
];

let cart = [];

loadCart();

function renderContent() {
    renderCart();
    renderMenucard();
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
                    <h4 id="menu${i}">${article['menu']}</h4>
                    <img src="img/button/info.png" alt="info button" class="info-button-menu">
                </div>
                <span>${article['description']}</span>
                <span id="price${i}">${article['price']}</span>
                <span>${article['currency']}</span>
            </div>
            <div class="menu-img-section">
                <img src="${article['menuImg']}" alt="" class="menu-img">
                <a href="" onclick="addToCart(${i})"><img src="img/button/plus.png" alt="" class="plus-button" id="plus${i}"></a>
            </div>
        </div>    
    `;
    }
}

function renderCart() {
    let cart = document.getElementById('cart');
    cart.innerHTML = /*html*/`
        <h2>Warenkorb</h2>
        <div class="delivery-takeaway-img-section">
            <div class="delivery-img-section">
                <img src="img/button/bicycle.png" alt="delivery" class="bicycle-button">
                <div>
                    <p>Lieferung</p>
                    <p>ab 11:00</p>
                </div>
            </div>
            <div class="takeaway-img-section">
                <img src="img/button/bag.png" alt="cart" class="takeaway-button">
                <div>
                    <p>Lieferung</p>
                    <p>ab 11:00</p>
                </div>
            </div>
        </div>
        <div id="getaddmenu"></div>
    `;
    showCart();
}

function showCart() {
    let getAddMenu = document.getElementById('getaddmenu');
    let articles = cart.findIndex(function(cartItem) {
        return cartItem.menus === cart.menus;
    });
    if (articles === -1) {
        getAddMenu.innerHTML = '<div>Warenkorb leer</div>';
    } else {
        for (let i = 0; i < cart.length; i++) {
            let article = cart[i];
            getAddMenu.innerHTML += /*html*/`
            <div class="selectedMeal">     
                <div class="selectedMeal-section-title">
                    <span><b>${article['quantities']} </b>${article['menu']}</span>
                    <p>${article['price']}</p>
                </div>
                <div class="selectedMeal-section-quantity">
                    <a href="" class="selectedMeal-notice">Anmerkung hinzufügen</a>
                    <a href="" class="less-meal-section"><div class="less-meal">-</div></a>
                    <div>Menge</div>
                    <a href="" class="add-meal-section"><div class="add-meal">+</div></a>
                </div>
            </div>  
        `;       
        }
    }
    saveCart();
}

// function getValueFromInput (id) {
//     let inputValue = document.getElementById(id).value;
//     return inputValue;
// }

// function getMenuFromInput(i) {
//     let menu = getValueFromInput(`menu${i}`).trim();
//     return menu;
// }

// function getPriceFromInput(i) {
//     let price = getValueFromInput(`price${i}`);
//     return +price;
// }

function addToCart(i) {
    let article = articles[i];
    let cartIndex = cart.findIndex(function(cartItem) {
        return cartItem.menus === article.menu;
    });
    if (cartIndex === -1) {
        cart.push({
            'menus': article.menu,
            'prices': article.price,
            'quantities': article.quantity,
        });
    } else {
        cart[i].quantities++;
        cart[i].prices = articles[i].price * cart[i].quantities;
    }
    showCart();
    saveCart();
}

function saveCart() {
    let cartAsText = JSON.stringify(cart);
    localStorage.setItem('cart', cartAsText);
}

function loadCart() {
    if (localStorage.getItem('cart') === null) {
        renderCart();
    } else {
        let cartAsText = localStorage.getItem('cart');
        cart = JSON.parse(cartAsText);
    }
}