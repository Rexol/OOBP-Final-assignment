var cart = {"count": 0, "total": 0};


window.onload = () => {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".main-list").style.display = "grid";
    document.querySelector(".main-cart").style.display = "none";

    buildContent(data);
    // let thinG = document.querySelector("9601-quantity");
    // console.log(thinG);
    // thinG.addEventListener('change', handleOnchange);

    // fetch('products_clean.json')
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         buildContent(data);
    //     })
    //     .catch(function (err) {
    //         console.log('error: ' + err);
    //     });
};

function buildContent(data) {
    let mainContainer = document.querySelector(".main-list .content");

    for (let i = 0; i < data.length; ++i) {
        let curr = data[i];
        let div = document.createElement("div");
        
        div.className = "product-tile";
        div.id = curr.productId;
        

        let img = document.createElement("img");
        img.src = curr.tumb;
        img.className = "img";
        img.onclick = openPopup(JSON.stringify(curr));
        div.appendChild(img);
        
        let h3 = document.createElement("h3");
        h3.className = "title";
        h3.innerText = curr.title;
        div.appendChild(h3);

        let p = document.createElement('p');
        p.className = "price";
        p.innerText = curr.price + " $";
        div.appendChild(p);

        let btn = document.createElement('input');
        btn.type = "button";
        btn.value = "ADD TO CART";
        btn.onclick = addToCart(JSON.stringify(curr));
        div.appendChild(btn);

        mainContainer.appendChild(div);
    }
}

function openPopup(jsonS) {
    return () => {
        //console.log("open popup");
        document.querySelector(".popup").style.display = "block";
        let data = JSON.parse(jsonS);

        let cartItems = document.querySelector(".popup .header .cart .items");
        cartItems.innerText = cart.count;

        let image = document.querySelector(".popup .content .image img");
        image.src = data.img;

        let description = document.querySelector(".popup .content .descby .description");
        description.innerText = data.description;

        let btn = document.querySelector(".popup .content .button");
        btn.onclick = addToCart(jsonS);
    }
}

function collapsePopup() {
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
}

function addToCart(jsonS) {
    return () => {
        let data = JSON.parse(jsonS);

        cart.count += 1;
        cart.total += Number(data.price);
        // console.log(cart);
        if (cart.hasOwnProperty(data.productId)) {
            cart[data.productId].count += 1;
        } else {
            cart[data.productId] = {"count": 1, "data": data};
        }
        
        updateCart(data.productId);
    };
}

function updateCart(id) {
    document.querySelector("header .cart-icon p").innerText = cart.count;
    document.querySelector(".popup .header .cart p").innerText = cart.count;
    document.querySelector(".main-cart .result .total").innerText = cart.total;

    let table = document.querySelector(".main-cart .cart-table");
    let element = document.getElementById("cart-entry-" + id);
    //console.log(element);

    if (element) {
        if (cart[id].count == 0) {
            cart[id]
            element.remove();
            delete cart[id];
            return;
        }

        let cartCount = document.getElementById('quantity-' + id);
        if (cartCount.value != cart[id].count) {
            cartCount.value = cart[id].count;
        }
            //console.log("Changing total;");
            //console.log(document.getElementById("tp-"+id));
        document.getElementById("tp-"+id).innerText = (cart[id].data.price * cart[id].count).toFixed(2) + ' $';
    } else {
        let newTr = document.createElement('tr');
        newTr.id = "cart-entry-" + id;
        
        let titleTd = document.createElement('td');
        titleTd.innerText = cart[id].data.title;
        newTr.appendChild(titleTd);

        let countTd = document.createElement('td');
        let input = document.createElement('input');
        input.type = "number";
        input.id = "quantity-" + id;
        input.min = '0';
        input.max = '99';
        input.addEventListener('change', (event) => {handleOnchange(event)});
        input.value = cart[id].count;
        countTd.appendChild(input);
        newTr.appendChild(countTd);

        let priceTd = document.createElement('td');
        priceTd.id = "up-" + id;
        priceTd.innerText = cart[id].data.price + " $";
        newTr.appendChild(priceTd);

        let totalTd = document.createElement('td');
        totalTd.id = "tp-" + id;
        totalTd.innerText = (cart[id].data.price * cart[id].count).toFixed(2) + ' $';
        newTr.appendChild(totalTd);

        table.appendChild(newTr);
    }
}

function openCart() {
    collapsePopup();
    document.querySelector(".main-list").style.display = "none";
    document.querySelector(".main-cart").style.display = "grid";

    //updateCart("");
}

function closeCart() {
    document.querySelector(".main-list").style.display = "grid";
    document.querySelector(".main-cart").style.display = "none";
}

function handleOnchange(event) {
    //console.log(event);
    event = event.target;
    let target = cart[event.id.slice(9)];
    if (event.value < target.count) {
        let diff = target.count - event.value;
        target.count -= diff;
        cart.count -= diff;
        cart.total -= diff*target.data.price;
    } else {
        let diff = event.value - target.count;
        target.count += diff;
        cart.count += diff;
        cart.total += diff*target.data.price;
    }
    //console.log(target.count);

    updateCart(event.id.slice(9));
}