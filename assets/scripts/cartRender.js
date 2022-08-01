const cartItemsEl = document.querySelector(".products-in-cart");
let cart = JSON.parse(localStorage.getItem("CART")) || [];
const totalCostEl = document.querySelector(".total-cost");
const totalCost2El = document.querySelector(".total-cost-2");
const shoppingCartQuantity = document.getElementById("bagQuantity");
const itemCountCheckout = document.querySelector(".items-count");
const quantityInputs = document.getElementsByClassName('quantity-form-box');
const vatTotal = document.querySelector(".total-vat")


// Update Cart 
function updateCart() {
};

// Render Cart Items
function renderCartItems(){
    cartItemsEl.innerHTML = ""; // clear cart 
    cart.forEach((item) => {
        cartItemsEl.innerHTML += 
        `
        <div class="cart-product-row row d-md-row pb-2 mb-3">
                                <div class="mb-3 mb-md-0 col-4 col-md-2">
                                    <img class="thumbnail" src="../../${item.imgSrc}" alt="${item.name} photo">
                                </div>
                                <div class="mb-3 mb-md-0 col-8 col-md-4 d-flex flex-column justify-content-between">
                                    <div class="d-flex flex-column">
                                        <span  class="grey-theme-color basket-product-name">${item.name}</span>  
                                        <span  class="grey-theme-color basket-product-type">${item.category}</span>  
                                    </div>
                                    <div class="d-flex remove-product py-2">
                                        <div class="remove-from-cart"aria-label="remove from basket" onclick="removeItemFromCart(${item.id})">
                                            <span class="trash-can m-0 me-1"></span>
                                        <span class="grey-theme-color remove-span">Remove</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2 d-flex align-items-start justify-conent-start quantity-controls">
                                    <input class="form-control quantity-form-box ms-2 me-2" type="number" name="quantity" id="${item.id}" value="${item.numberOfUnits}">
                                </div>
                                <div class="col-3 col-md-2 d-flex">
                                    <span class="d-inline d-md-none grey-theme-color fs-7 pe-1">Price</span>
                                    <span class="grey-theme-color ps-1 fs-7 price-per-product">£${item.price}</span>
                                </div>
                                <div class="col-3 col-md-2 d-flex">
                                    <span class="d-inline d-md-none grey-theme-color fs-7 fw-bold pe-1">Total</span>
                                    <span id="total-product-cost-${item.id}" class="grey-theme-color ps-2 fw-bold fs-7 total-price-product">£${item.price * item.numberOfUnits}</span>
                                </div>       
        </div>  
        `
    });
};



// Input Listener to Update Quantity
function addListenerToInputs(){
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        var inputId = quantityInputs[i].id
        input.addEventListener('change', quantityChanged)
    }
}

// Update Quantity after changing input
function quantityChanged(event){
    var input = event.target;
    var inputId = event.target.id;
    var targetProduct = cart.find(({id}) => id === parseInt(inputId))
    if (isNaN(input.value) || input.value <= 0) {
        alert("We can't ship negative numbers of products, if you want to give us products please contact support we will happily take them, but we wont be happy to pay")
        input.value = 1
    } else if (input.value >= 250){
        alert("We can't ship more than 250 Items at once, Sorry!  Please choose a number below 250 or contact support")
        input.value = 1
    }
    targetProduct.numberOfUnits = parseInt(input.value);
    updateTotalProductCost(inputId, targetProduct);
    updateItemCount();
    updateTotal();
    saveCart();
}


// Updates the Individual Product Cost
function updateTotalProductCost(inputId, targetProduct, input){
    var targetProductTotalPrice = document.getElementById(`total-product-cost-${inputId}`)
    targetProductTotalPrice.innerText = "£" + (targetProduct.price * targetProduct.numberOfUnits);
};

// Update Total
function updateTotal(){
    totalCostEl.innerText = "£"+ 0;
        totalCost2El.innerText = "£"+ 0;
    let total = 0;
    cart.forEach((item)=> {
        total += (item.price * item.numberOfUnits)
        totalCostEl.innerText = "£"+total;
        totalCost2El.innerText = "£"+total;
    })
    let vat = 0;
    vatTotal.innerText = "£" + (total * 20 / 100);
};

// Update Item Count in Order Summary and Top of website
function updateItemCount(){
    shoppingCartQuantity.innerText = 0;
    itemCountCheckout.innerText = 0 + " Items";
    let count = 0;
    cart.forEach((item)=> {
        count += item.numberOfUnits;
        shoppingCartQuantity.innerText = count;
        itemCountCheckout.innerText = count + " Items";
    })
}

// Remove Item from the cart using Remove / trash icon
function removeItemFromCart(id){
    cart = cart.filter( (item) => item.id !== id );
    updateItemCount();
    updateTotal();
    renderCartItems();
    saveCart();
};

// saveCart To Local Storage
function saveCart() {
    localStorage.setItem("CART", JSON.stringify(cart))
}

// scripts to run
updateItemCount();
updateTotal();
renderCartItems();
addListenerToInputs();


