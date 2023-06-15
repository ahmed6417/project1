// Local Storage
favo = localStorage.getItem("favcounter");
document.getElementById("fav-area").innerHTML = favo;
carto = localStorage.getItem("cartcounter");
document.getElementById("cart-counter").innerHTML = carto;
cartonow = localStorage.getItem("savecart");
document.getElementById("cart-areaa").innerHTML = cartonow
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// fetch menu categories
async function get(){
  let response = await fetch ("http://localhost:5000/api/categories/")
  let data = await response.json()
  for (d of data.data){
    let list = `<a data-id="${d._id}" onclick="getCities(${d._id})" href="products.php?cat_id=${d._id}" class="nav-item nav-link">${d.name}</a>`;
    document.getElementById("categories-menu").innerHTML += list;
  }
}
get()
// End fetch menu categories
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// fetch the first 4 categories
fetch ("http://localhost:5000/api/categories/")
.then (function (response) {
  return response.json();
})
.then(function (data){
  let sort = data.data.sort(function(a, b) {
    return parseFloat(b.productCount) - parseFloat(a.productCount);
})
  let filtro = sort.slice(0, 4);
  return filtro
})
.then(function (categ){
  document.getElementById("categories").innerHTML="";
  for (d of categ){
    let list = `
      <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="">
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${d.image}" alt="" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${d.name}</h6>
              <small class="text-body">${d.productCount}</small>
            </div>
          </div>
        </a>
      </div>
    `;
    document.getElementById("categories").innerHTML += list;
  }
})
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// fetch featured products with the first 8 products
fetch ("http://localhost:5000/api/products/getFeatured")
.then (function (response){
  return response.json()
})
.then (function (data){
  let fdata = data.data.slice(0,8);
  return fdata;
})
.then (function(featuredp){
  document.getElementById("products").innerHTML="";
  let index=0;
  for (product of featuredp){
    let fedata = `
        <div class="singleFProduct">
        <div id="singleProduct" class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
          <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${product.image}" alt="" />
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square"onclick="addSingleFProductToCart(${index})">
                <i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" onclick="favFunction()">
                <i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
                <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
            </div></div>
          <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${product.name}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
              <h5>$${(product.price)-((product.price)*(product.discount))}</h5>
              <h6 class="text-muted ml-2"><del>$${product.price}</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
              <span id=stars>${getStars(product.rating)}</span>
              <small>(${product.rating_count})</small>
            </div>
          </div>
        </div>
        </div></div>
  `
  document.getElementById("products").innerHTML += fedata;
  index++
}
})
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// fetch recent products with the first 8 products
fetch ("http://localhost:5000/api/products/getRecent")
.then (function (response){
  return response.json();
})
.then (function (data) {
  console.log (data);
  document.getElementById("recent-products").innerHTML ="";
  let Rindex=0;
  let removeindex=0;
  for (rproduct of data.data){
    let list = `
    <div class="singleRProduct"> 
    <div id="singleProduct" class="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${rproduct.image}" alt="" />
        <div class="product-action">
          <a class="btn btn-outline-dark btn-square"onclick="addSingleRProductToCart(${Rindex})">
          <i class="fa fa-shopping-cart"></i></a>
          <a class="btn btn-outline-dark btn-square" onclick="favFunction()">
          <i class="far fa-heart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
        </div></div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href="">${rproduct.name}</a>
        <divclass="d-flex align-items-center justify-content-center mt-2">
          <h5>$${(rproduct.price)-((rproduct.price)*(rproduct.discount))}</h5>
          <h6 class="text-muted ml-2"><del>$${rproduct.price}</del></h6>
        </divclass=>
        <div class="d-flex align-items-center justify-content-center mb-1">
          <span id=stars>${getStars(rproduct.rating)}</span>
          <small>(${rproduct.rating_count})</small>
      </div></div></div></div></div> 
    `
    document.getElementById("recent-products").innerHTML += list;
    Rindex++
    removeindex++
  }
})
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// render rating icons
function getStars(rating) {
  rating = Math.round(rating * 2) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  return output.join('');
}
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// Fav counter
let count = favo;
function favFunction(){
  count++;
  document.getElementById("fav-area").innerHTML = count;
  localStorage.setItem("favcounter", count);
}
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
// cart area

// let arrayr = [];

// function addSingleFProductToCart(index){
  
// }


function addSingleFProductToCart(index){
  ccount++;
  document.getElementById("cart-counter").innerHTML = ccount;
  localStorage.setItem("cartcounter", ccount);


  let singleFProduct = document.querySelectorAll(".singleFProduct")[index];
  console.log([singleFProduct]);
  document.getElementById("cart-areaa").innerHTML+=singleFProduct

  var result = [], matches = document.querySelectorAll("#cart-areaa");
  for (var i = 0, l = matches.length; i < l; i++) 
      result.push(matches[i]);

  
  let svecart = document.getElementById("cart-areaa").innerHTML;
  localStorage.setItem("savecart", svecart);
}


function addSingleRProductToCart(Rindex){
  ccount++;
  document.getElementById("cart-counter").innerHTML = ccount;
  localStorage.setItem("cartcounter", ccount);
  let singleProduct = document.querySelectorAll(".singleRProduct")[Rindex].innerHTML;
  document.getElementById("cart-areaa").innerHTML+=singleProduct
  let svecart = document.getElementById("cart-areaa").innerHTML;
  localStorage.setItem("savecart", svecart);
}








let ccount = carto;
// open and close cart
function openCart(){
  document.getElementById("cart-areaa").style.display = "block";
}
function closeCart(){
  document.getElementById("cart-areaa").style.display = "none";
}
// empty cart
// let result = [], matches = document.querySelectorAll("#cart-areaa");
// carto = localStorage.getItem("cartcounter");
// function productRemove(removeindex){
//   let cartcounter = 0
//   localStorage.setItem("cartcounter", cartcounter);
//   document.getElementById("cart-counter").innerHTML = 0;
//   for (let i = 0, l = matches.length; i < l; i++) 
//       result.push(matches[i]);

//   let singleFProduct = document.querySelectorAll(".singleFProduct")[removeindex].innerHTML;
//   document.getElementById("cart-areaa").innerHTML-=singleFProduct
//   let svecart = document.getElementById("cart-areaa").innerHTML;
//   localStorage.removeItem("savecart", svecart);
// }
















































































const products = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    discount: 0.1,
    image: "",
    rating: 3.5,
    rating_count: 100,
  },
  {
    _id: "2",
    name: "Product 2",
    price: 150,
    discount: 0.1,
    image: "",
    rating: 3.5,
    rating_count: 100,
  },
  {
    _id: "3",
    name: "Product 3",
    price: 80,
    discount: 0.1,
    image: "",
    rating: 3.5,
    rating_count: 100,
  },
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    discount: 0.1,
    image: "",
    rating: 3.5,
    rating_count: 100,
  },
];

class Product {
  id;
  name;
  price;
  discount;
  image;
  rating;
  rating_count;
  constructor(obj) {
    this.id = obj._id;
    this.name = obj.name;
    this.price = obj.price;
    this.discount = obj.discount;
    this.rating = obj.rating;
    this.rating_count = obj.rating_count;
  }

  getPriceAfterDiscount() {
    return this.price - this.price * this.discount;
  }

  getRatingHTML() {
    return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small>(99)</small>
  </div>`;
  }

  getHomeHTML() {
    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${this.image}" alt="">
        <div class="product-action">
          <a class="btn btn-outline-dark btn-square" href="#" onclick=""><i class="fa fa-shopping-cart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="far fa-heart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
        </div>
      </div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
        <div class="d-flex align-items-center justify-content-center mt-2">
          <h5>$${this.getPriceAfterDiscount()}</h5>
          <h6 class="text-muted ml-2"><del>$${this.price}</del></h6>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-1">
          ${this.getRatingHTML()}
        </div>
      </div>
    </div>
  </div>`;
  }

  getHTML() {
    return ``;
  }
}

class CartLine {
  product;
  quantity;
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.getPriceAfterDiscount() * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }
}

class Cart {
  cartlines;
  constructor(productsArray) {
    this.cartlines = [];
    //loop to add products into cartlines array
  }

  remove(productId) {}

  getTotal() {}

  getSubTotal() {}
}
//Cart
//CartLine
//Product
//Category





// fix nav after scroll
$(document).scroll(function() {
  if($(window).scrollTop() > 50){

    $("#fixedOnScroll").css("position","fixed");
    $("#fixedOnScroll").css("z-index","9");
    $("#fixedOnScroll").css("top","0");
    $("#fixedOnScroll").css("transition","0.7s");

  }else if($(window).scrollTop() < 50){

    $("#fixedOnScroll").css("position","relative");
    $("#fixedOnScroll").css("z-index","9");
    $("#fixedOnScroll").css("top","0");
    $("#fixedOnScroll").css("transition","0.7s");

  }
});