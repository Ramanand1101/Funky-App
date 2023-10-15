/* const cartList = document.getElementById("cartList");
const totalQuantity = document.getElementById("totalQuantity");
const totalAmount = document.getElementById("totalAmount");

// Sample cart data
const cartProducts = [
  { id: 1, name: "Product 1", price: 10.99, quantity: 2 },
  { id: 2, name: "Product 2", price: 19.99, quantity: 1 },
  // Add more products as needed
];

// Function to render cart products
function renderCartProducts() {
  cartList.innerHTML = "";
  let quantity = 0;
  let amount = 0;

  cartProducts.forEach(product => {
    const listItem = document.createElement("li");
    listItem.innerText = `${product.name} - Quantity: ${product.quantity} - Price: $${product.price.toFixed(2)}`;
    cartList.appendChild(listItem);

    quantity += product.quantity;
    amount += product.price * product.quantity;
  });

  totalQuantity.innerText = quantity;
  totalAmount.innerText = amount.toFixed(2);
}

// Initial render
renderCartProducts(); */
// Retrieve userId from localStorage (or wherever it's stored during login)
const url = "http://localhost:3000";
const userId = JSON.parse(localStorage.getItem("productId"));
const cartContainer = document.querySelector(".cart-data");

function fetchCartData() {
  if (!userId) {
    console.error("User ID not found.");
    // Handle the case when the user is not logged in or user ID is missing
    return;
  }

  fetch(`${url}/cart?productId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) => {
        console.log(res)
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    //   return res.json();
    return res.json()
      console.log(res.json())
    })
    .then((acctualdata) => {
      // Handle the cart data received from the server
      console.log(data)
      getCartData(acctualdata);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      // Handle errors, show error messages, update UI accordingly, etc.
    });
}

function getCartData(data) {
    cartContainer.innerHTML = "";
      data.forEach((elem) => {
        // Create cart item elements and append them to the cart container
        const div = document.createElement("div");
        div.classList.add("product");
  
        let image = document.createElement("img");
        image.setAttribute("src", elem.image);
        image.setAttribute("class", "product-image");
  
        let name = document.createElement("p");
        name.innerText = elem.name;
  
        let desc = document.createElement("p");
        desc.innerText = elem.description;
  
        let price = document.createElement("p");
        price.innerText = `Price: $${elem.price}`;
  
        div.append(image, name, desc, price);
        cartContainer.appendChild(div);
      });
    }
    fetchCartData()