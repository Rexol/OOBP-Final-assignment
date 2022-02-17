const fs = require('fs');

let rawdata = fs.readFileSync('./products.json');
let data = JSON.parse(rawdata);

//const data = require('products.json');

const arr = data.ul.li;

let res = [];

for (let i = 0; i < arr.length; ++i) {
    let curr = arr[i];
    let n = new Object();
    
    //console.log(curr.a[0]);
    n.source = curr.a[0]["@href"];
    let subprice = curr.a[0].span;
    if (subprice instanceof Array) {
        n.price = subprice[1].ins.span.bdi["#text"];
    } else {
        n.price = subprice.span.bdi["#text"];
    }
    n.tumb = curr.a[0].img["@src"];
    n.img = "";
    n.title = curr.a[0].h2["#text"];
    n.productId = curr.a[1]["@data-product_id"];
    n.description = "";
    console.log(n);
    res.push(n);
}

const dataRes = JSON.stringify(res);

// write JSON string to a file
fs.writeFile('products_clean.json', dataRes, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});