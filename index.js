let categoryApi = "https://fakestoreapi.com/products/categories";
let categoryDataApi = "https://fakestoreapi.com/products/category/";
// let allProducts = "https://dummyjson.com/products";
let allProducts = "https://fakestoreapi.com/products";
let singleProduct = "https://fakestoreapi.com/products/";



let bodyContent = document.getElementById("bodyContainer");
let noOfItems = document.getElementById("count");
let cartCount = ([]);
let isnum = 0;


let moreinfo = window.localStorage.getItem("count");
console.log(moreinfo)
noOfItems.innerText = isnum;


// GETTING DATA.
async function getCategory() {
    let data = await fetch(categoryApi);
    let categories = await data.json();
    console.log(categories);
    categories.map(item => {
        addCategories(item);
    })
}


async function getCategoryData(category) {
    console.log("iam category", category);
    bodyContent.innerHTML = ``;
    if (category.includes(" ")) {
        console.log("meehn")
        let category1 = category.replace(/\s/g, "\\s");
        let data = await fetch(`${categoryDataApi}${category1}`);
        let categoryData = await data.json();
        // console.log(categoryData);
        categoryData.map(item => renderOnCategory(item));
        console.log(`clicked ${category}`);
    } else {
        console.log("ssup")
        let data = await fetch(`${categoryDataApi}${category}`);
        let categoryData = await data.json();
        // console.log(categoryData);
        categoryData.map(item => renderOnCategory(item));
        console.log(`clicked ${category}`);
    }
}



async function getAllProducts() {
    bodyContent.innerHTML = ``;
    const data = await fetch(allProducts);
    const products = await data.json();
    console.log(products);
    // let me = products.products
    products.map(item => displayAllItems(item));
}

async function getSingleProduct(id) {
    bodyContent.innerHTML = ``;
    let data = await fetch(`${singleProduct}${id}`);
    let singleProductData = await data.json();
    singleItem(singleProductData);
    console.log(singleProductData);
}


// get single item for cat.
// async function getSingleForCart(...arr) {
//     let displaArr = [];
//     console.log(arr);
//     bodyContent.innerHTML = ``;
//     arr.map(async prod => {
//         prod.map(async singlep => {
//             console.log(singlep)
//             console.log(typeof (prod))
//             let data = await fetch(`${singleProduct}${singlep.id}`);
//             let singleProductData = await data.json();
//             console.log(singleProductData)
//             displaArr.push(await singleProductData);
//             // console.log(displaArr)
//             // await displaArr.map(item => displayCartItems(item));
//             oneItem(singleProductData)
//         })
//     })
//     displayCartItems();
// }


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
                <li onclick = getCategoryData('${item}')>${item}</li>
            </ul>
        </div>
                `;
}

// <li onclick = getCategoryData('${item.includes(" ")? item.replace(/ /g,"\\ "): item}')>${item}</li>
// <li onclick = getCategoryData("${item.indexOf("\n") !== -1? item.replace(/\n/g,"\\n"): item}")>${item}</li>

// BODY CODE
// let bodyContent = document.getElementById("bodyContainer");
let heartIcon = document.querySelector(".fa-heart")
console.log(heartIcon)

function displayAllItems(item) {

    bodyContent.innerHTML += `
    <div class="itemContainer" >
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

}

// ONLICK FUNCTIONS
function heart(event) {
    let element = event.target;
    element.setAttribute("class", "fa-regular fa-heart");
    element.style.color = red;
}


function addToCart(id) {
    cartCount.push({ id: id });
    window.localStorage.setItem("count", JSON.stringify(cartCount));
    isnum += 1;
    noOfItems.innerText = isnum;

}








// cart page
let cartIcon = document.getElementById("cart-el");
console.log(cartIcon);
let cartArray = JSON.parse(window.localStorage.getItem("count"));
cartIcon.addEventListener("click", () => displayCartItems());
console.log("cartArray", cartArray);

function displayCartItems() {
    console.log("here")
    bodyContent.innerHTML = ``;
    let cartPaage = document.createElement("div");
    bodyContent.appendChild(cartPaage);
    bodyContent.setAttribute("class","bigger");
    let cartTop = document.createElement("div");
    cartTop.setAttribute("class", "cartContents")
    cartTop.innerHTML = `

    <h4>Your cart items</h4>
    <div class="cartTable">
        <h5 class="itemDesc">Item</h5>
        <h5 class="itemPrice">Price</h5>
        <h5 class="itemQuantity">Quantity</h5>
        <h5 class="itemTotal">Total</h5>
    `
    cartPaage.appendChild(cartTop);
    let cardMiddleParent = document.createElement("div");
    cardMiddleParent.setAttribute("class","middleParent")
    let cardMiddle = document.createElement("div");
    cartPaage.appendChild(cardMiddleParent);
    cardMiddleParent.appendChild(cardMiddle)
    // cardMiddle.setAttribute("class","cartTableBody");
    cardMiddle.setAttribute("id","cartTableBody");



    async function getSingleForCart(...arr) {
        let no = 1;
        let displaArr = [];
        console.log("arr here", arr);
        arr.length >= 1?arr.map(async prod => {
            prod.map(async singlep => {
                console.log(singlep)
                console.log(typeof (prod))
                let data = await fetch(`${singleProduct}${singlep.id}`);
                let singleProductData = await data.json();
                console.log(singleProductData)
                displaArr.push(await singleProductData);

                // function addtocounter(){
                //     no+=1;
                //     num.innerText = no;
                // }

                cardMiddle.innerHTML += `  
                <div class="cartTableBody">
                <div class="itemContent">
                <img class="img-cart" src=${singleProductData.image} alt="item">
                <div class="decription">
                    <h5>${singleProductData.title}</h5>
                    <small>${singleProductData.description}</small>
                </div>
                </div>
            <div class="itemPrice"><h5>$${singleProductData.price}</h5></div>
            <div class="quantity itemQuantity">
                <button class="minus"> - </button> 
                <span> <small id = "number">${no}</small></span>   
                <button class="add" onclick = addtocounter()> + </button>    
            </div>
            <div><h5>${singleProductData.price * no }</div></h5>
            </div>
            </br>
            `
            let num = document.getElementById("number");
            num.innerText = no;
                
            })
        }) : cardMiddle.innerHTML=`<h2>No data</h2>`;
    }

    

getSingleForCart(cartArray)

    let cartBottom = document.createElement("div")
    cartPaage.appendChild(cartBottom);
    cartBottom.setAttribute("class", "grandTotal");
    cartBottom.innerHTML += `

    <div class="grandItem"></div>
    <div class="checkCheck grandItem">
    <h3>Grand Total</h3><h3 id="totalMoney">$199.99</h3><br>
    <button class="checkOut">Check Out</button>
    </div>
    </div>
    
    `;

}


// sub cart MOdule

// let oneItem =(...items)=> {
//     items.map(singleProd => {
        
//     })
// }



