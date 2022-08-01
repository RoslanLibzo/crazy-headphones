// SELECT ELEMENTS
const productsEl = document.querySelector(".products-container");
const shoppingCartQuantity = document.getElementById("bagQuantity");
let cartLocal = JSON.parse(localStorage.getItem("CART")) || [];



// RENDER PRODUCTS
function renderProducts(){
    products.forEach( (product)=> {
        productsEl.innerHTML += 
         `
        <div class="col px-3  px-md-3 px-lg-4 pb-3 pb-md-4 pb-lg-5 "> 
                <div class="product-card">
                    <div class="inner-product-box">
                        <img src="${product.imgSrc}" alt="${product.name} photo">         
                            <div class="add-to-cart align-self-center py-5" onclick="">
                                <button class="btn btn-outline-dark px-4 py-2 cart-button" onclick="addToCart(${product.id})" type="submit">Add to Cart</button>
                            </div>
                            <div class="d-flex justify-content-between productAndPrice-div">
                                <div class="lower-left d-flex flex-column">    
                                    <h2 class="fs-4 m-0 p-0">${product.name}</h2>
                                    <p class="m-0 pb-1">${product.category}</p>
                                </div>
                                <div class="d-flex lower-right align-items-center pb-3">
                                    <p class="fs-1 m-0 pe-3 d-inline grey-theme-color dash">/</p>
                                    <p class="p-0 price text-black">£${product.price}</p>
                                </div>
                            </div> 
                    </div>
                </div>
        </div>
            `
        
    })
}

renderProducts();

// Cart Array




//Update Item Number on shopping cart
function updateItemCount(){
    shoppingCartQuantity.innerText = 0;
        let count = 0;
        cartLocal.forEach((item)=> {
            count += item.numberOfUnits;
            shoppingCartQuantity.innerText = count;
        })

}

// ADD TO CART
function addToCart(id){
    //Check if products already exist in cart array
    if (cartLocal.some((item) => item.id === id )){
        alert("Product already in cart")
    } else {
        const item = products.find((product) => product.id === id)
        cartLocal.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    saveCart();
    console.log(cartLocal);
    updateItemCount();
}

// saveCart To Local Storage
function saveCart() {
    localStorage.setItem("CART", JSON.stringify(cartLocal))
}

updateItemCount();