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
let deliveryCost = 4.95;

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
                <a href="javascript: void(0);" onclick="addToCart(${i})"><img src="img/button/plus.png" alt="" class="plus-button" id="plus${i}"></a>
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
        <div id="total-section"></div>
        <div id="order-section"></div>
    `;
    showCart();
    showTotal();
}

function showCart() {
    let getAddMenu = document.getElementById('getaddmenu');
    let articles = cart.findIndex(function(cartItem) {
        return cartItem.menu === cart.menus;
    });
    if (articles === -1) {
        getAddMenu.innerHTML = '<div>Warenkorb leer</div>';
    } else {
        for (let i = 0; i < cart.length; i++) {
            let article = cart[i];
            getAddMenu.innerHTML += /*html*/`
            <div class="selectedMeal">     
                <div class="selectedMeal-section-title">
                    <span><b>${article['quantities']} </b>${article['menus']}</span>
                    <p>${article['prices'].toFixed(2)}</p>
                </div>
                <div class="selectedMeal-section-quantity">
                    <a href="" class="selectedMeal-notice">Anmerkung hinzufügen</a>
                    <a href="" class="less-meal-section" onclick="deleteItem(${i})"><div class="less-meal">-</div></a>
                    <div>Menge</div>
                    <a href="" class="add-meal-section"><div class="add-meal" onclick="addItem(${i})">+</div></a>
                </div>
            </div>  
        `;       
        }
    }
    showTotal();
}

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
        cart[cartIndex].quantities++;
        cart[cartIndex].prices = articles[i].price * cart[i].quantities;
    }
    saveCart();
    loadCart();
    renderCart();
    showCartTotal();
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
    showTotal();
}

function deleteItem(i) {
    let item = cart[i];
    let article = articles[i];
    if (item.quantities > 1) {
        item.quantities--;
        item.prices -= article.price;
    } else {
        cart.splice(i, 1);
    }
    saveCart();
}

function addItem(i) {
    let item = cart[i];
    item.quantities++;
    item.prices = articles[i].price * item.quantities;
    saveCart();
    loadCart();
    showCartTotal();
}

function showCartTotal() {
    let total = document.getElementById('total-section');
    total.innerHTML = /*html*/`
        <table>
            <tr id="subtotal"></tr>
            <tr id="delivery"></tr>
            <tr id="total"></tr>
            <td>Kostenfreie Lieferung ab 30,00 €</td>
        </table>
    `;
    showSubtotal();
    showDeliveryCost();
    showTotal();
}

function calcSubtotal() {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let items = cart[i];
    
        sum = sum + items.prices;
        
    };
    return sum;
}

function showSubtotal() {
    let content = document.getElementById('subtotal');
    let subtotal = calcSubtotal();
    content.innerHTML = /*html*/`
        <td>Zwischensumme</td>
        <td>${subtotal.toFixed(2)}</td>
    `;
    return subtotal;
}

function showDeliveryCost() {
    let content = document.getElementById('delivery');
    let delivery = deliveryCost;
    content.innerHTML = /*html*/`
        <td>Lieferkosten</td>
        <td>${delivery.toFixed(2)}</td>
    `;
    return delivery;
}

function showTotal() {
    let content = document.getElementById('total');
    let total = showSubtotal() + showDeliveryCost();
    content.innerHTML = /*html*/`
        <td>Gesamtkosten</td>
        <td>${total.toFixed(2)}</td>
    `;
    return total;
}

function orderNow() {
    let content = document.getElementById('order-section');
    let total = showTotal();
    content.innerHTML = /*html*/`
        <button>
            <p>Bezahlen</p>
            <p>(${total.toFixed(2)})</p>
        </button>
    `;
}

