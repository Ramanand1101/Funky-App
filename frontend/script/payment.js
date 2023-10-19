let logo=document.querySelector(".logo")
let cart=document.getElementById("cart-icon")
let totalAmount=document.getElementById("totalAmount")

logo.addEventListener("click",()=>{
    window.location.href="index.html"
})
cart.addEventListener("click",()=>{
    window.location.href="cart.html";
})
let amount=localStorage.getItem("cart-amount")
totalAmount.innerText=amount
console.log(amount)