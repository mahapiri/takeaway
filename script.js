let articles =
    [
        {
            'menu': 'Pizza Prosciutto',
            'menuImg': 'img/meal/prosciutto.jpg',
            'description': 'mit extra viel saftigem Kochhinterschinken (zerkleinert)',
            'price': 5.99,
            'quantity': 1
        },
        {
            'menu': 'Pizza Tomato',
            'menuImg': 'img/meal/tomato.jpg',
            'description': 'leckere tomaten Pizza',
            'price': 6.99,
            'quantity': 1
        },
        {
            'menu': 'Pizza Chicken',
            'menuImg': 'img/meal/chicken.jpg',
            'description': 'leckere hühnchen Pizza',
            'price': 9.99,
            'quantity': 1
        },
        {
            'menu': 'Wedges',
            'menuImg': 'img/meal/wedges.jpg',
            'description': 'leckere Wedges',
            'price': 4.99,
            'quantity': 1
        },
        {
            'menu': 'Salat',
            'menuImg': 'img/meal/salad.jpg',
            'description': 'leckerer Salat',
            'price': 4.99,
            'quantity': 1
        },
        {
            'menu': 'Dip - Joghurt',
            'menuImg': 'img/meal/joghurt.png',
            'description': 'leckerer Dip',
            'price': 1.99,
            'quantity': 1
        },
        {
            'menu': 'Cola',
            'menuImg': 'img/meal/cola.png',
            'description': 'leckere Cola',
            'price': 2.99,
            'quantity': 1
        },
        {
            'menu': 'Fanta',
            'menuImg': 'img/meal/fanta.png',
            'description': 'leckere Fanta',
            'price': 2.99,
            'quantity': 1
        },
        {
            'menu': 'Vitamin Water',
            'menuImg': 'img/meal/vitamin-water.png',
            'description': 'leckeres Vitamin Wasser',
            'price': 2.99,
            'quantity': 1
        }
];

let cart = [];
let deliveryCost = 4.95;
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
        <div class="menubox" id="menubox${i}">
            <div class="menu-section">
                <div class="menu-title">
                    <div class="menu-title-undersection">
                        <h4 id="menu${i}">${article['menu']}</h4>
                        <img src="img/button/info.png" alt="info button" class="info-button-menu">
                    </div>
                    <span>${article['description']}</span>
                </div>

                <span id="price${i}"><b>${article['price']} €</b></span>
            </div>
            <div class="menu-img-section">
                <img src="${article['menuImg']}" alt="" class="menu-img">
            </div>
            <a href="javascript: void(0);" onclick="addToCart(${i})"><img src="img/button/plus.png" alt="" class="plus-button" id="plus${i}"></a>
        </div>    
    `;
    }
}

function renderCart() {
    let cartItem = document.getElementById('cart');
    cartItem.innerHTML = /*html*/`
        <h2>Warenkorb</h2>
        <div class="delivery-takeaway-img-section">
            <div class="delivery-img-section">
                <img src="img/button/bicycle.png" alt="delivery" class="bicycle-button">
                <div>
                    <p>Lieferung</p>
                    <p>30-45 min</p>
                </div>
            </div>
            <div class="takeaway-img-section">
                <img src="img/button/bag.png" alt="cart" class="takeaway-button">
                <div>
                    <p>Abholung</p>
                    <p>15 min</p>
                </div>
            </div>
        </div>
        <div id="getaddmenu"></div>
        <div id="total-section"></div>
        <div id="order-section"></div>
    `;
    showCart();
}

function showCart() {
    let getAddMenu = document.getElementById('getaddmenu');
    getAddMenu.innerHTML = '';

    if (cart.length === 0) {
        getAddMenu.innerHTML = '<div>Warenkorb leer</div>';
    } else {
        getAddMenu.innerHTML = '';
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            getAddMenu.innerHTML += /*html*/`
            <div class="selectedMeal">     
                <div class="selectedMeal-section-title">
                    <span><b>${item['quantities']}x </b>${item['menus']}</span>
                    <p>${item['prices'].toFixed(2)} €</p>
                </div>
                <div class="selectedMeal-section-quantity">
                    <a href="" class="selectedMeal-notice">Anmerkung hinzufügen</a>
                    <a href="javascript: void(0);" class="less-meal-section" onclick="deleteItem(${i})"><div class="less-meal">-</div></a>
                    <div>Menge</div>
                    <a href="javascript: void(0);" class="add-meal-section" onclick="addItem(${i})"><div class="add-meal" >+</div></a>
                </div>
            </div>  
        `;       
        }
        showCartTotal();
    }
    
}

function addToCart(i) {
    let article = articles[i];
    let cartIndex = cart.findIndex(
        function(item) {
        return item.menus === article.menu;
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
    showCart();
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
    loadCart();
    renderCart();
}

function addItem(i) {
    let item = cart[i];
    item.quantities++;
    item.prices = articles[i].price * item.quantities;
    saveCart();
    loadCart();
    renderCart();
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
        <div id="order-section"></div>
    `;
    showSubtotal();
    showDeliveryCost();
    showTotal();
    orderNow();
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
}

function showDeliveryCost() {
    let content = document.getElementById('delivery');
    let delivery = deliveryCost;
    content.innerHTML = /*html*/`
        <td>Lieferkosten</td>
        <td>${delivery.toFixed(2)}</td>
    `;
}

function showTotal() {
    let content = document.getElementById('total');
    let totalCost = calcTotal();
    content.innerHTML = /*html*/`
        <td>Gesamtkosten</td>
        <td>${totalCost.toFixed(2)}</td>
    `;
}

function calcTotal() {
    let totalCost = deliveryCost + calcSubtotal();
    return totalCost;
}

function orderNow() {
    let content = document.getElementById('order-section');
    let total = calcTotal();
    content.innerHTML = /*html*/`
        <button>
            <p>Bezahlen</p>
            <p>(${total.toFixed(2)})</p>
        </button>
    `;
}

