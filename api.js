function addProduct(product) {
  const productHTML = `
    <div class="product_storage" id="${product.name}">
      <img class="production-image" src="data:image/png;base64,${product.image}" alt="${product.name}">
      <p class="product_name">${product.name}</p>
      <h4 class="production-price">${product.unit_price} ${product.price}</h4>
      <p class="product_desc">${product.short_desc}</p>
      <span class="production-sale"><p>${product.discount ? `-${product.discount}%` : `${product.tag}`}</p></span>
      <div>
        <button class="add_to_cart">Add to cart</button>
        <a><span class="material-symbols-outlined">share</span>Share</a>
        <a><span class="material-symbols-outlined">compare_arrows</span>Compare</a>
        <span id="heart" class="material-symbols-outlined">favorite</span>
      </div>
    </div>
  `;

  return productHTML;
}


var start =0;
var limit1 =-1;
var count=0;
async function loadProducts(limit) {
  if (limit1 > 8) {
    start = 0;
    limit1 = limit;
  }
  if (limit1==-1){  
  limit1 = limit;}
  const res = await fetch("https://dummyapi-0uzr.onrender.com/products");
  const data = await res.json();
  const products = data.product_list.slice(start, limit1);
  start =limit1;
  limit1 += limit;
  const productContainer = document.getElementById("products");

  products.forEach(function (product) {
    const productHTML = addProduct(product);
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
  if (count === 40) {
    document.getElementById("showmorebutton").style.display = "none";
    return; 
  }
  localStorage.setItem("products", JSON.stringify(products));
}
loadProducts(8);

document.getElementById("showmorebutton").addEventListener("click",function() {
  loadProducts(4)
  count+=4

})
///////////
document.addEventListener("click", function(event) {
  if (event.target.id === "heart") {
    const heartElement = event.target;
    const heartId = heartElement.id;
    const isLiked = heartElement.classList.contains("liked");

    if (isLiked) {
      heartElement.classList.remove("liked");
      heartElement.classList.add("disliked");
      localStorage.removeItem(heartId);
    } else {
      heartElement.classList.remove("disliked");
      heartElement.classList.add("liked");
      localStorage.setItem(heartId, "id");
    }
  }
});