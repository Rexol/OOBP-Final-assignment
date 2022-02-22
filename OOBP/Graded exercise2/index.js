
var cart = JSON.parse(window.localStorage.getItem('cart')) || {"count": 0, "total": 0};

window.onload = () => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".main-list").style.display = "grid";

    // trying to load data from .json file
    // won't work if html wasn't opened from server (ex. live server)
    fetch('products_clean.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            buildContent(jsonData);
        })
        .catch(function (err) {
            console.log('error: ' + err);
            console.log('loading data from local storage')
            buildContent(data);
        });
};

function buildContent(data) {
    let mainContainer = document.querySelector(".main-list .content");

    for (let i = 0; i < data.length; ++i) {
        let curr = data[i];
        let div = document.createElement("div");
        
        div.className = "product-tile";
        div.id = "product-tile-"+curr.productId;

        div.innerHTML = `
            <img src="${curr.tumb}" class="img"/>
            <h3 class="title">${curr.title}</h3>
            <p class="price">${curr.price} $</p>
            <input type="button" value="ADD TO CART"/>
        `;

        mainContainer.appendChild(div);
        
        document.querySelector(`#product-tile-${curr.productId} img`).addEventListener('click', () => {openPopup(curr);});
        document.querySelector(`#product-tile-${curr.productId} input`).addEventListener('click', () => {addToCart(curr);});
    }
}

function openPopup(data) {
    document.querySelector(".popup").style.display = "block";

    let cartItems = document.querySelector(".popup .header .cart .items");
    cartItems.innerText = cart.count;

    let image = document.querySelector(".popup .content .image img");
    image.src = data.img;

    let description = document.querySelector(".popup .content .descby .description");
    description.innerHTML = `${data.description} <a href="${data.source}">original</a>`;

    let btn = document.querySelector(".popup .content .button");
    btn.addEventListener("click", () => {addToCart(data)});
}

function collapsePopup() {
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
}

function addToCart(data) {
    cart.count += 1;
    cart.total += Number(data.price);

    if (cart.hasOwnProperty(data.productId)) {
        cart[data.productId].count += 1;
    } else {
        cart[data.productId] = {"count": 1, "data": data};
    }
    
    updateCart();
}

function updateCart() {
    document.querySelector("header .cart-icon p").innerText = cart.count;
    document.querySelector(".popup .header .cart p").innerText = cart.count;
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

function openCart() {
    window.location.href = "cart.html";
}