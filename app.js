//Select element and variable

const cartBtn = document.querySelector(".cart-btn")
const closeCartBtn = document.querySelector(".close-btn")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productDom = document.querySelector(".product-center")




//Cart Item
let cart = []

let buttonDOM = []

//getting the products 
class Products {
   async getProducts() {
      try {
         let result = await fetch("products.json")
         let data = await result.json()
         let products = data.items
         products = products.map(item => {
            const { title, price } = item.fields
            const { id } = item.sys
            const image = item.fields.image.fields.file.url
            return { title, price, id, image }
         })
         return products
      } catch (error) {
         console.log(error)
      }

   }

}
//display productttttttttttttttt
class UI {
   displayProduct(products) {
      let result = '';
      products.forEach(product => {
         result += `
      <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart">Add to Bag</i>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      
      
      `
      })
      productDom.innerHTML = result;
   }

   getBagButtons() {

      const buttons = [...document.querySelectorAll(".bag-btn")]
      buttonDOM = buttons
      //console.log(buttons)
      buttons.forEach(button => {
         let id = button.dataset.id
         let inCart = cart.find(item => item.id === id)
         if (inCart) {
            button.innerText = "In Cart"
            button.disabled = true;
         } else {
            button.addEventListener('click', (e) => {
               //console.log(e)
               e.target.innerText = "In Cart"
               button.disabled = true
               // get product from products
               let cartItem = { ...Storage.getProduct(id), amount: 1 }
               // console.log(cartItem)
               //adding the items to Cart 
               cart = [...cart, cartItem]
               //console.log(cart)
               //save cart into Local storage 
               Storage.saveCart(cart)
               //set Cart Values 
               this.setCartItems(cart)
               //display items  
               this.addCartItem(cartItem)
               //show chatttttttttttttttttttttttttttttttttttttttttttttttttttttt
               this.displayCart()

            })
         }
         //console.log(id)
      })

   }

   setCartItems(cart) {
      let siteTotal = 0
      let itemTotal = 0
      cart.map(item => {
         siteTotal += item.price * item.amount
         itemTotal += item.amount

      })
      cartTotal.innerText =parseFloat(siteTotal.toFixed(2))
      cartItems.innerText = itemTotal
      //console.log(cartTotal, cartItems)
   }
   addCartItem(item){
      const div = document.createElement('div')
      div.classList.add('cart-item')
      div.innerHTML = `<img src=${item.image} alt="product" id="img1" />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id= ${item.id}>Remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id= ${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id =${item.id}></i>
            </div>`
            cartContent.appendChild(div)
            console.log(cartContent)

   }
   displayCart(){
      cartOverlay.classList.add('transparentBcg')
      cartDOM.classList.add('show-cart')
   }
}

class Storage {

   static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products))
   }
   static getProduct(id) {
      let products = JSON.parse(localStorage.getItem("products"))
      return products.find(product => product.id === id)
   }
   static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart))
   }
}

document.addEventListener("DOMContentLoaded", () => {
   const ui = new UI()
   const product = new Products()


   //get all phones 
   product.getProducts().then(products => {
      ui.displayProduct(products)
      Storage.saveProducts(products)
   }).then(() => {

      ui.getBagButtons()
   })

})

