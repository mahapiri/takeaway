let articles =
    [
        {
            'menu': 'Pizza Prosciutto',
            'menuImg': 'img/meal/prosciutto.jpg',
            'description': 'Luftgetrockneter Schinken, Mozzarella, Tomatensauce – ein köstlicher Gaumenschmaus!',
            'price': 5.99,
            'quantity': 1
        },
        {
            'menu': 'Pizza Tomato',
            'menuImg': 'img/meal/tomato.jpg',
            'description': 'Frische Tomaten, Mozzarella, Basilikum, Olivenöl. Ein lebendiges, geschmackvolles Vergnügen!',
            'price': 6.99,
            'quantity': 1
        },
        {
            'menu': 'Pizza Chicken',
            'menuImg': 'img/meal/chicken.jpg',
            'description': 'Zarte Hähnchenbrust, Paprika, Zwiebeln, BBQ-Sauce, Mozzarella. Ein herzhaftes Geschmackserlebnis!',
            'price': 9.99,
            'quantity': 1
        },
        {
            'menu': 'Pommes Frites',
            'menuImg': 'img/meal/wedges.jpg',
            'description': 'Knusprig goldene Kartoffelstäbchen, perfekt gewürzt. Ein unwiderstehlicher Begleiter für jede Mahlzeit!',
            'price': 4.99,
            'quantity': 1
        },
        {
            'menu': 'Salat',
            'menuImg': 'img/meal/salad.jpg',
            'description': 'Frischer Römersalat, gegrillte Hähnchenbrust, Croutons, Parmesan, mit köstlichem Caesar-Dressing. Eine vollmundige Geschmacksexplosion!',
            'price': 4.99,
            'quantity': 1
        },
        {
            'menu': 'Dip - Joghurt',
            'menuImg': 'img/meal/joghurt.png',
            'description': 'Cremiger Joghurt mit Knoblauch, Zitrone und frischen Kräutern. Die perfekte, erfrischende Begleitung für Ihre Speisen.',
            'price': 1.99,
            'quantity': 1
        },
        {
            'menu': 'Cola',
            'menuImg': 'img/meal/cola.png',
            'description': 'Klassische Erfrischung mit spritziger Kohlensäure, perfekt gekühlt. Ein belebendes Getränk für jeden Genussmoment.',
            'price': 2.99,
            'quantity': 1
        },
        {
            'menu': 'Fanta',
            'menuImg': 'img/meal/fanta.png',
            'description': 'Fruchtig-spritziges Erlebnis mit der perfekten Balance aus Süße und Frische. Genießen Sie den fruchtigen Geschmack in jeder Schluck!',
            'price': 2.99,
            'quantity': 1
        },
        {
            'menu': 'Vitamin Water',
            'menuImg': 'img/meal/vitamin-water.png',
            'description': 'Erfrischendes Getränk angereichert mit Vitaminen und mineralisiertem Wasser für einen belebenden und gesunden Genuss.',
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
    init(); 
}


function renderMenucard() {
    let menucard = document.getElementById('menucard');
    menucard.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        menucard.innerHTML += showMenuCard(article, i);
    }
}


function showMenuCard(article, i) {
    return /*html*/`
    <div class="menubox" id="menubox${i}">
        <div class="menu-section">
            ${showMenuTitle(article, i)}
            <span id="price${i}" class="price-sign"><b>${article['price']} €</b></span>
        </div>
        <div class="menu-img-section"><img src="${article['menuImg']}" alt="" class="menu-img"></div>
        <a href="javascript: void(0);" onclick="addToCart(${i})"><img src="img/button/plus.png" alt="" class="plus-button" id="plus${i}"></a>
    </div>`;
}


function showMenuTitle(article, i) {
    return /*html*/`
        <div class="menu-title">
            <div class="menu-title-undersection">
                <h4 id="menu${i}">${article['menu']}</h4>
                <img src="img/button/info.png" alt="info button" class="info-button-menu">
            </div>
            <span>${article['description']}</span>
        </div>
    `;
}


function renderCart() {
    let cartItem = document.getElementById('cart');
    cartItem.innerHTML = /*html*/`
        <div class="close-section" id="close-section"></div>
        <h2>Warenkorb</h2>
        <div class="delivery-takeaway-img-section">
            ${showDeliveryBar()}
        </div>
        <div id="getaddmenu" class="cart-menu-card"></div>
        <div id="total-section" class="total-section"></div>
        <div id="order-section"></div>
    `;
    showCart();
}


function showDeliveryBar() {
    return `
        ${showDeliverySection()}
        ${showTakeawaySection()}
    `;  
}


function showDeliverySection() {
    return /*html*/`
        <div class="delivery-img-section">
                <img src="img/button/bicycle.png" alt="delivery" class="bicycle-button">
                <div>
                    <p>Lieferung</p>
                    <p>30-45 min</p>
                </div>
        </div>
    `;
}


function showTakeawaySection() {
    return /*html*/`
        <div class="takeaway-img-section">
            <img src="img/button/bag.png" alt="cart" class="takeaway-button">
            <div>
                <p>Abholung</p>
                <p></p>
            </div>
        </div>
    `;
}


function showCart() {
    let getAddMenu = document.getElementById('getaddmenu');
    getAddMenu.innerHTML = '';

    if (cart.length === 0) {
        getAddMenu.innerHTML = showEmptyCart();
    } else {
        getAddMenu.innerHTML = '';
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            getAddMenu.innerHTML += showCartlist(item, i);
        }
        showCartTotal();
    }
    
}


function showEmptyCart() {
    return /*html*/`
        <div class="empty-cart">
            <div>
                <b>Wählen Sie ein Essen</br>aus unserem Menü aus</b>
            </div>
        </div>
    `;
}


function showCartlist(item, i) {
    return /*html*/`
        <div class="selectedMeal">     
            <div class="selectedMeal-section-title">
                <span><b>${item['quantities']}x </b>${item['menus']}</span>
                <p><b>${item['prices'].toFixed(2)} €</b></p>
            </div>
            <div class="quantity-cart-card">
                    <a href="javascript: void(0);" class="less-meal-section" onclick="deleteItem(${i})"><div class="less-meal">-</div></a>
                    <div>Menge</div>
                    <a href="javascript: void(0);" class="add-meal-section" onclick="addItem(${i})"><div class="add-meal" >+</div></a>
            </div>                
        </div>         
    `;
}


function addToCart(i) {
    let article = articles[i];
    let cartIndex = findIndexInCart(article);
    if (cartIndex !== -1) {
        addQuantitytoCart(cartIndex, article);
    } else {
        addNewToCart(article);
    }
    saveCart();
    loadCart();
    showCart();
    showCartTotal();
    updateCart();
    mobileVersion();
}


function findIndexInCart(article) {
    return cart.findIndex(item => item.menus === article.menu);
}


function addQuantitytoCart(cartIndex, article) {
    cart[cartIndex].quantities++;
    cart[cartIndex].prices = article.price * cart[cartIndex].quantities;
}


function addNewToCart(article) {
    cart.push({
        'menus': article.menu,
        'prices': article.price,
        'quantities': article.quantity,
    });
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
    closeButton();
}


function addItem(i) {
    let item = cart[i];
    item.quantities++;
    item.prices = articles[i].price * item.quantities;
    saveCart();
    loadCart();
    renderCart();
    closeButton();
}


function showCartTotal() {
    let total = document.getElementById('total-section');
    total.innerHTML = /*html*/`
        ${renderTotalSection()}
    `;
    showSubtotal();
    showDeliveryCost();
    showTotal();
    orderNow();
}


function renderTotalSection() {
    return /*html*/`
        <table>
            <tr id="subtotal"></tr>
            <tr id="delivery"></tr>
            <tr id="total"></tr>
            <td><b class="free-delivery">Kostenfreie Lieferung ab 30.00 €</b></td>
        </table>
        <div id="order-section" class="order-section"></div>
    `;
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
        <td><b>Zwischensumme</b></td>
        <td>${subtotal.toFixed(2)} €</td>
    `;
}


function showDeliveryCost() {
    let content = document.getElementById('delivery');
    let delivery = deliveryCost;
    let subtotal = calcSubtotal();
    if (subtotal > 30) {
        content.innerHTML = showFreeDelivery();
    } else {
        content.innerHTML = showDeliveryCostHtml(delivery);
    }
}

function showFreeDelivery() {
    return /*html*/`
        <td><b>Lieferkosten</b></td>
        <td>Kostenlose Lieferung</td>
    `;
}

function showDeliveryCostHtml(delivery) {
    return /*html*/`
        <td><b>Lieferkosten</b></td>
        <td>${delivery.toFixed(2)} €</td>
    `;
}
    

function showTotal() {
    let content = document.getElementById('total');
    let totalCost = calcTotal();
    content.innerHTML = /*html*/`
        <td><b>Gesamtkosten</b></td>
        <td>${totalCost.toFixed(2)} €</td>
    `;
}


function calcTotal() {
    let subtotal = calcSubtotal();
    
    if (subtotal > 30) {
        return subtotal;
    } else {
        let totalCost = deliveryCost + calcSubtotal();
        return totalCost;
    }
}


function orderNow() {
    let content = document.getElementById('order-section');
    let total = calcTotal();
    content.innerHTML = /*html*/`
        <button class="order-button" onclick="finishOrder()">
            <p><b>Bezahlen</b></p>
            <p><b>(${total.toFixed(2)} €)</b></p>
        </button>
    `;
}


function init() {
    mobileVersion();
    window.addEventListener('resize', function() {
        mobileVersion();
    });
    
    window.addEventListener('load', function() {
        mobileVersion();
    });
}


function mobileVersion() {
    let mediaQuery = window.matchMedia('(max-width : 800px)');
    let cart = document.getElementById('cart');
    let content = document.getElementById('content');
    let close = document.getElementById('close-section');
    if (mediaQuery.matches) {
        mediaQueryMatched(cart, content, close);
    } else {
        mediaQueryNotMatched(cart, content, close);
    }
}


function mediaQueryMatched(cart, content, close) {
    cart.classList.add('d-none');
    content.classList.remove('d-none');
    showCartButton();
    close.classList.remove('d-none');
    closeButton();
}


function mediaQueryNotMatched(cart, content, close) {
    cart.classList.remove('d-none');
    content.classList.remove('d-none');
    removeButton();
    close.classList.add('d-none');
}


function showCartButton() {
    let total = calcTotal();
    let button = document.getElementById('show-cart-button-section');
    button.classList.remove('d-none');

    if (total > 4.95) {
        button.innerHTML = showMediaCartButton(total);
    } else {
        button.innerHTML = showMediaCartButtonIfZero();
    }
}


function showMediaCartButton(total) {
    return /*html*/`
        <div class="cart-button" onclick="openShowCart()" id="show-cart-button">
            <p><b>Warenkorb anzeigen</b></p>
            <p><b>(${total.toFixed(2)} €)</b></p>
        </div>   
    `;
}


function showMediaCartButtonIfZero() {
    return /*html*/`
        <div class="cart-button" onclick="openShowCart()" id="show-cart-button">
            <p><b>Warenkorb anzeigen</b></p>
        </div>   
    `;
}


function openShowCart() {
    let cart = document.getElementById('cart');
    let content = document.getElementById('content');
    let button = document.getElementById('show-cart-button');
    let closeButton = document.getElementById('close-section');
    cart.classList.remove('d-none');
    content.classList.add('d-none');
    closeButton.classList.remove('d-none');
    button.remove();
}


function closeCart() {
    let content = document.getElementById('content');
    let cart = document.getElementById('cart');
    let button = document.getElementById('show-cart-button-section');
    content.classList.remove('d-none');
    cart.classList.add('d-none');
    button.innerHTML ='';
    button.innerHTML = showUpdatedCartIfClose();
    updateCart();
}


function showUpdatedCartIfClose() {
    return /*html*/`
        <div class="cart-button" onclick="openShowCart()" id="show-cart-button">
            <p><b>Warenkorb anzeigen</b></p>
            <p id="total-cart-button"><b></b></p>
        </div>  
    `;
}


function updateCart() {
    let button = document.getElementById('total-cart-button');
    if (button) {
        let total = calcTotal();
        button.innerHTML = /*html*/`
            <p id="total-cart-button"><b>(${total.toFixed(2)} €)</b></p>
        `;
    } else {
        closeCart();
    }
}


function closeButton() {
    let close = document.getElementById('close-section');
    if (window.matchMedia('(max-width : 800px)').matches) {
        close.innerHTML = /*html*/`
        <a href="#" class="close-cart" onclick="closeCart()">X</a></div>
    `;
    }
}


function removeButton() {
    let button = document.getElementById('show-cart-button');
    if (button && button.parentNode) {
        button.parentNode.removeChild(button);
    }
}


function finishOrder() {
    let content = document.getElementById('main-section');
    content.innerHTML = /*html*/`
        <div class="end"><div>Vielen Dank für die Bestellung!</div></div>
    `;
}