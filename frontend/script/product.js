// Simulated Product Data (Replace this with actual API call)
/* const url="https://funky-dbkf.onrender.com" */
// const url="http://localhost:3000"
// console.log("Ssss")
// const productsContainer = document.querySelector(".product-card");
// const categoryFilter = document.getElementById("categoryFilter");
// const priceSort = document.getElementById("priceSort");
// let fetched=[]
// let cloth=[]

// // Function to render products based on filters and sorting
// // function renderProducts() {
// //     const category = categoryFilter.value;
// //     const sortDirection = priceSort.value === "asc" ? 1 : -1;

// //     const filteredProducts = products.filter(product => category === "all" || product.category === category);

// //     const sortedProducts = filteredProducts.sort((a, b) => sortDirection * (a.price - b.price));

// //     productsContainer.innerHTML = ""; // Clear previous products

// //     sortedProducts.forEach(product => {
// //         const productCard = document.createElement("div");
// //         productCard.className = "product-card";
// //         productCard.textContent = `${product.name} - $${product.price}`;
// //         productsContainer.appendChild(productCard);
// //     });
// // }

// // // Event listeners for filter and sort options
// // categoryFilter.addEventListener("change", renderProducts);
// // priceSort.addEventListener("change", renderProducts);

// // // Initial rendering of products
// // renderProducts();

// // Function to fetch data from the server
// // Function to fetch data from the server
// // Function to fetch data from the server
// getData();
// function getData() {
//     fetch(`${url}/product/`, {
//       headers: {
//         Authorization:JSON.parse(localStorage.getItem("token"))
//       }
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         fetched=data;
//         cloth=fetched.filter((ele)=>{
//         if(ele.category=="category"){
//             return true;
//         }
//     })
//         console.log(data);
//         displayProducts(data)
//       })
//       .catch((err) => console.log("Error fetching data:", err));
//   }
//   priceSort.addEventListener("change",(e)=>{
//     if(e.target.value=="lth"){
//         let newData=cloth.sort((a,b)=>a.price-b.price);
//         getCards(newData);
//     }else if(e.target.value=="htl"){
//         let newData=entrees.sort((a,b)=>b.price-a.price);
//         getCards(newData);
//     }else if(e.target.value=="sort"){
//         getCards(fetched);
//     }
// });


//   function displayProducts(acctualData){
//     productsContainer.innerHTML = "";
//     acctualData.forEach(elem => {
//         const div=document.createElement("div")
//         div.classList.add('products')

//         let image=document.createElement("img")
//         image.setAttribute("src", elem.image)
//         image.setAttribute("class", "p-image")

//         let name=document.createElement("p")
//         name.innerText=elem.name

//         let desc=document.createElement("p")
//         desc.innerText=elem.description

//         let cat=document.createElement("p")
//         cat.innerText=elem.category

//         let price=document.createElement("p")
//         price.innerText=elem.price

//         let rating=document.createElement("p")
//         rating.innerText=elem.rating

//         let size=document.createElement("p")
//         size.innerText=elem.size

//         div.append(image,name,price,desc,cat,size,rating)
//         productsContainer.append(div)

//     });
//   }


const url = "http://localhost:3000";
const productsContainer = document.querySelector(".product-card");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
let fetched = [];
let cloth = [];

// Function to fetch data from the server
function getData() {
  fetch(`${url}/product/`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      fetched = data;
      // Filter products based on category filter value
      cloth = fetched.filter((ele) => {
        return ele.category === categoryFilter.value || categoryFilter.value === "all";
      });
      // Display filtered products
      getCards(cloth);
    })
    .catch((err) => console.log("Error fetching data:", err));
}

// Event listener for price sort dropdown
priceSort.addEventListener("change", (e) => {
  if (e.target.value == "asc") {
    let newData = cloth.sort((a, b) => a.price - b.price);
    getCards(newData);
  } else if (e.target.value == "desc") {
    let newData = cloth.sort((a, b) => b.price - a.price);
    getCards(newData);
  } else if (e.target.value == "sort") {
    // Reset to the original fetched data
    getCards(fetched);
  }
});

// Function to render products in the UI
function getCards(data) {
  productsContainer.innerHTML = "";
  data.forEach((elem) => {
    const div = document.createElement("div");
    div.classList.add("products");

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
    price.innerText = elem.price;

    let rating = document.createElement("h4");
    rating.innerText = elem.rating;

    let size = document.createElement("p");
    size.innerText = elem.size;

    let btn = document.createElement("button");
    btn.innerText = "Add To Cart";
    btn.addEventListener("click", () => {
      console.log("dddd")
      addToCart(elem._id);
       // Assuming elem._id represents the product ID
    });

    div.append(image, name, price, desc, cat, size, rating, btn);
    productsContainer.append(div);
  });
}

// Function to add product to the cart
function addToCart(productId) {
  fetch(`${url}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify({ productId, quantity: 1 }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      // Show success message with SweetAlert
      
      Swal.fire({
        icon: "success",
        title: "Item added to cart!",
        text: data.message, // Message from the server
      });
      
      localStorage.setItem("productId",JSON.stringify(productId))
      // Optionally, update the cart UI or provide user feedback
    })
    .catch((error) => {
      // Show error message with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error adding item to cart!",
        text: error.message, // Error message from the catch block
      });
      console.error("Error adding item to cart:", error);
    });
}


// Event listener for category filter change
categoryFilter.addEventListener("change", () => {
  // Filter products based on category filter value
  cloth = fetched.filter((ele) => {
    return ele.category === categoryFilter.value || categoryFilter.value === "all";
  });
  // Display filtered products
  getCards(cloth);
});

// Initial fetch data function call
getData();

const cartIcon = document.getElementById('cart-icon');
const logo = document.querySelector('.logo');

// Add a click event listener to the user icon
cartIcon.addEventListener('click', function() {
    // Redirect the user to login.html when the user icon is clicked
    window.location.href = './cart.html';
});
logo.addEventListener('click', function() {
  // Redirect the user to login.html when the user icon is clicked
  window.location.href = './index.html';
});