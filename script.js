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
                <span id="price${i}" class="price-sign"><b>${article['price']} €</b></span>
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
        <div class="close-section d-none" id="close-section"><a href="#" class="close-cart" onclick="closeCart()">X</a></div>
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
                    <p></p>
                </div>
            </div>
        </div>
        <div id="getaddmenu" class="cart-menu-card"></div>
        <div id="total-section" class="total-section"></div>
        <div id="order-section"></div>
    `;
    showCart();
}

function showCart() {
    let getAddMenu = document.getElementById('getaddmenu');
    getAddMenu.innerHTML = '';

    if (cart.length === 0) {
        getAddMenu.innerHTML = '<div class="empty-cart"><img src=""><div><b>Wählen Sie ein Essen</br>aus unserem Menü aus</b></div></div>';
    } else {
        getAddMenu.innerHTML = '';
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            getAddMenu.innerHTML += /*html*/`
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
        showCartTotal();
    }
    
}

function addToCart(i) {
    let article = articles[i];
    let cartIndex = cart.findIndex(
        function(item) {
        return item.menus === article.menu;
    });
    if (cartIndex !== -1) {
        cart[cartIndex].quantities++;
        cart[cartIndex].prices = article.price * cart[cartIndex].quantities;
    } else {
        cart.push({
            'menus': article.menu,
            'prices': article.price,
            'quantities': article.quantity,
        });
    }
    saveCart();
    loadCart();
    showCart();
    showCartTotal();
    cartButtonMedia();
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
            <td><b class="free-delivery">Kostenfreie Lieferung ab 30.00 €</b></td>
        </table>
        <div id="order-section" class="order-section"></div>
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
        <td><b>Zwischensumme</b></td>
        <td>${subtotal.toFixed(2)} €</td>
    `;
}

function showDeliveryCost() {
    let content = document.getElementById('delivery');
    let delivery = deliveryCost;
    let subtotal = calcSubtotal();
    if (subtotal > 30) {
        content.innerHTML = /*html*/`
        <td><b>Lieferkosten</b></td>
        <td>Kostenlose Lieferung</td>
    `;
    } else {
        content.innerHTML = /*html*/`
        <td><b>Lieferkosten</b></td>
        <td>${delivery.toFixed(2)} €</td>
    `;
    }
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
        <button class="order-button">
            <p><b>Bezahlen</b></p>
            <p><b>(${total.toFixed(2)} €)</b></p>
        </button>
    `;
}

function mobileVersion() {
    let mediaQuery = window.matchMedia('(max-width : 800px)');
    let close = document.getElementById('close-section');
    let menucard = document.getElementById('content');
    if (mediaQuery.matches) {
        close.classList.remove('d-none');
        menucard.classList.add('d-none');
    } else {
        close.classList.add('d-none');
    }
    cartButtonMedia();
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

function closeCart() {
    let cart = document.getElementById('cart');
    let menucard = document.getElementById('content');
    let button = document.getElementById('open-cart');
    let cartButton = cartButtonMedia();
    cart.classList.add('d-none');
    menucard.classList.remove('d-none');
}

function openCartMedia() {
    let openCart = document.getElementById('cart');
    let menucard = document.getElementById('content');
    let buttonM = document.getElementById('open-cart-media');
    openCart.classList.remove('d-none');
    menucard.classList.add('d-none');
    buttonM.remove();
}

function cartButtonMedia() {
    let button = document.getElementById('open-cart');
    let total = calcTotal();
    button.innerHTML = /*html*/`
        <p><b>Warenkorb anzeigen</b></p>
        <p><b>(${total.toFixed(2)} €)</b></p>
    `;
}