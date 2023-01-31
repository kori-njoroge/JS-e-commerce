let categoryApi = "https://fakestoreapi.com/products/categories";
let categoryDataApi = "https://fakestoreapi.com/products/category/";
let allProducts = "https://fakestoreapi.com/products";
let singleProduct = "https://fakestoreapi.com/products/";

// GETTING DATA.
async function getCategory() {
    let data = await fetch(categoryApi);
    let categories = await data.json();
    // console.log(categories);
    categories.map(item => {
        addCategories(item);
    })
}


async function getCategoryData(category) {
    bodyContent.innerHTML = ``;
    if(category.indexOf("'") !== -1){
        console.log("meehn")
        category = category.replace("'","\\'");
        let data = await fetch(`${categoryDataApi}${category}`);
        let categoryData = await data.json();
        console.log(categoryData);
        categoryData.map(item => renderOnCategory(item));
        console.log(`clicled ${category}`);
    }else{
        console.log("ssup")
        let data = await fetch(`${categoryDataApi}${category}`);
        let categoryData = await data.json();
        console.log(categoryData);
        categoryData.map(item => renderOnCategory(item));
        console.log(`clicled ${category}`);
    }
}



async function getAllProducts() {
    const data = await fetch(allProducts);
    const products = await data.json();
    console.log(products);
    products.map(item => displayAllItems(item));
}

async function getSingleProduct(id) {
    bodyContent.innerHTML = ``;
    let data = await fetch(`${singleProduct}${id}`);
    let singleProductData = await data.json();
    singleItem(singleProductData);
    console.log(singleProductData);
}

// Calling the api functions.
getCategory();
// getCategoryData('men\'s clothing')
getAllProducts();
// getSingleProduct(10)



// Navbar code
let categoriesContainer = document.querySelector(".categories");

function addCategories(item) {
    categoriesContainer.innerHTML += `
        <div class = "navCategories">
            <ul>
                <li onclick = getCategoryData("${item}")>${item}</li>
            </ul>
        </div>
    `;
}


// BODY CODE
let bodyContent = document.getElementById("bodyContainer");
let heartIcon = document.querySelector(".fa-heart")
console.log(heartIcon)

function displayAllItems(item) {

    bodyContent.innerHTML += `
    <div class="itemContainer" onclick= getSingleProduct(${item.id}) >
        <img src="${item.image}" alt = "${item.id}"/>
        <div class="card-bottom">
            <div class="card-top">
                <h3>${item.title}</h3>
                <i id ="heartIcon" class="fa-regular fa-heart" onclick = "heart(event)"></i>
            </div>
            <button class="category">${item.category}</button><br/>
            <div class="icons">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <small>(${item.rating.rate})</small>
            </div>
            <p class="price">$${item.price}</p>
            <div class="buttons">
                <button class="card-btn" onclick= getSingleProduct(${item.id})>More Details</button>
                <button class="card-btn" onclick = addToCart(${item.id})>Add to Cart</button>
            </div>
        </div>
    </div>
`
}

// render items on category click
function renderOnCategory(item) {
    bodyContent.innerHTML += `
    <div class="itemContainer" onclick= getSingleProduct(${item.id}) >
        <img src="${item.image}" alt = "${item.id}"/>
        <div class="card-bottom">
            <div class="card-top">
                <h3>${item.title}</h3>
                <i class="fa-regular fa-heart"></i>
            </div>
            <button class="category">${item.category}</button><br/>
            <div class="icons">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <small>(${item.rating.rate})</small>
            </div>
            <p class="price">$${item.price}</p>
            <div class="buttons">
                <button class="card-btn" onclick= getSingleProduct(${item.id})>More Details</button>
                <button class="card-btn">Add to Cart</button>
            </div>
        </div>
    </div>
`
}

// Single page item code.

function singleItem(item) {
    bodyContent.innerHTML = `
        <div class="singleItemContainer" >
        <img src="${item.image}" alt = "${item.id}"/>
        <div class="card-bottom">
            <div class="card-top">
                <h3>${item.title}</h3>
                <i class="fa-regular fa-heart"></i>
            </div>
            <div>
                <h5>${item.description}</h5>
            </div>
            <button class="category">${item.category}</button><br/>
            <div class="icons">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <small>(${item.rating.rate})</small>
            </div>
            <p class="price">$${item.price}</p>
            <div class="buttons">
                <button class="card-btn" onclick = addToCart(${item.id})>Add to Cart</button>
            </div>
        </div>
    </div>
    `;
    console.log("sofia the first")

}

// ONLICK FUNCTIONS
function heart(event){
    let element = event.target;
    element.setAttribute("class","fa-regular fa-heart");
    element.style.color = red;
}

function addToCart(id){
    alert(`yooooh ${id}`);
}