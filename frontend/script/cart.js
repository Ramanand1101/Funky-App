//Retrieve cart data from localStorage or set defaults
let cartProducts = document.querySelector(".cart-data");
let totalQuantityElement = document.getElementById("totalQuantity");
let totalAmountElement = document.getElementById("totalAmount");
let cartShow = document.querySelector(".cartCount");
let cartCount = parseInt(localStorage.getItem("cart-count")) || 0;

// let tAmount=localStorage.getItem("cart-amount")||0
// parseInt(tAmount)


let cart = JSON.parse(localStorage.getItem("cart-products")) || [];

let payment=document.getElementById("payment")
document.addEventListener("DOMContentLoaded", function() {
    payment.addEventListener("click", (e) => {
        if (totalQuantityElement.innerText == 0) {
            swal.fire("Oops!", "Your cart is empty", "error");
        } else {
            swal.fire("Success!", "Redirecting to payment page...", "success");
            setTimeout(() => {
                window.location.href = "./payment.html";
            }, 3000); // Redirect after 3 seconds
        }
    });
});



function displayData(data) {
    cartProducts.innerHTML = "";

    let totalQuant = 0;
    let totalCost = 0;

    data.forEach((elem, ind) => {
        const div = document.createElement("div");
        div.classList.add("cartProducts");

        let image = document.createElement("img");
        image.setAttribute("src", elem.image);
        image.setAttribute("class", "p-image");

        let name = document.createElement("h2");
        name.innerText = elem.name;

        let desc = document.createElement("p");
        desc.innerText = elem.description;

        let cat = document.createElement("p");
        cat.innerText = elem.category;

        let price = document.createElement("h4");
        price.innerText = price.innerText=`Price: ₹ ${elem.price}`;

        let rating = document.createElement("h4");
        rating.innerText = elem.rating;

        let size = document.createElement("p");
        size.innerText = elem.size;

        let quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity-div");

        let addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.className="qnty"
        addButton.addEventListener("click", (e) => {
            e.preventDefault()
            // Increase the quantity when the + button is clicked
            elem.quantity = (elem.quantity || 0) + 1;
            quantityDisplay.innerText = elem.quantity;
            updateCart();
        });

        let quantityDisplay = document.createElement("span");
        quantityDisplay.innerText = elem.quantity || 1;

        let minusButton = document.createElement("button");
        minusButton.innerText = "-";
        minusButton.className="qnty"
        minusButton.addEventListener("click", (e) => {
            e.preventDefault()
            
            // Decrease the quantity, but not below 1
            elem.quantity = Math.max((elem.quantity || 1) - 1, 1);
            quantityDisplay.innerText = elem.quantity;
            updateCart();
        });

        let btn=document.createElement("button");
        btn.innerText="Delete";
        btn.setAttribute("class","dlt");
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const deletedQuantity = elem.quantity || 1;
            cart.splice(ind, 1);
            localStorage.setItem("cart-products", JSON.stringify(cart));
            displayData(cart);
            updateCart(deletedQuantity); // Pass the deleted quantity to updateCart function
        });
        quantityDiv.append(minusButton, quantityDisplay, addButton);

        div.append(image, name, desc, price, rating, size, quantityDiv, btn);
        cartProducts.appendChild(div);

        totalQuant += elem.quantity || 1; // Add the quantity of the current product to totalQuant
        totalCost += (elem.quantity || 1) * elem.price; 
        // Add the cost of the current product to totalCost
    });
    localStorage.setItem("cart-amount", totalCost);

    totalQuantityElement.innerText = totalQuant;
    totalAmountElement.innerText = totalCost.toFixed(2);

    cartCount = totalQuant;
    cartShow.innerText = cartCount;
}

function updateCart() {
    let totalQuant = 0;
    let totalCost = 0;

    cart.forEach(product => {
        totalQuant += product.quantity || 1;
        totalCost += (product.quantity || 1) * product.price;
       
    });

    totalQuantityElement.innerText = totalQuant;
    totalAmountElement.innerText = totalCost.toFixed(2);
   
    cartCount = totalQuant;
    cartShow.innerText = cartCount;
    localStorage.setItem("cart-count", totalQuant);
    localStorage.setItem("cart-products", JSON.stringify(cart));
    // quantityDisplays.forEach((quantityDisplay, index) => {
    //     quantityDisplay.innerText = cart[index].quantity || 1;
    // });
}

displayData(cart);
let logo=document.querySelector(".logo")


logo.addEventListener("click",()=>{
    window.location.href="index.html"
})