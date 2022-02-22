var cart = JSON.parse(window.localStorage.getItem('cart')) || {"count": 0, "total": 0};

window.onload = () => {
    buildTable();
};


function buildTable() {

    for(let key in cart) {
        if (key === 'count' || key === 'total') {
            continue;
        }
        updateCart(key);
    }
}

function updateCart(id) {
    document.querySelector(".main-cart .result .total").innerText = cart.total;

    let table = document.querySelector(".main-cart .cart-table");
    let element = document.getElementById("cart-entry-" + id);
    
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
        document.getElementById("tp-"+id).innerText = (cart[id].data.price * cart[id].count).toFixed(2) + '$';
    } else {
        let newTr = document.createElement('tr');
        newTr.id = "cart-entry-" + id;
        newTr.innerHTML = `
            <td>${cart[id].data.title}</td>
            <td>
                <input type="number" id="quantity-${id}" min="0" max="99" value="${cart[id].count}">
            </td>
            <td id="up-${id}">${cart[id].data.price}$</td>
            <td id="tp-${id}">${(cart[id].data.price * cart[id].count).toFixed(2)}$</td>
        `;
        table.appendChild(newTr);

        document.querySelector(`#cart-entry-${id} input`).addEventListener('change', handleOnchange);
    }

    window.localStorage.setItem('cart', JSON.stringify(cart));
}

function closeCart() {
    window.location.href = 'index.html';
}

function handleOnchange(event) {
    event = event.target;
    let target = cart[event.id.slice(9)];
    
    let diff = event.value - target.count;
    target.count += diff;
    cart.count += diff;
    cart.total += diff*target.data.price;
    updateCart(event.id.slice(9));
}