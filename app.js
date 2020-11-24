//Select element and variable

const cartBtn = document.querySelector(".cart-btn")
const closeCartBtn = document.querySelector(".close-btn")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDom = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overly")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productDom = document.querySelector(".product-center")




//Cart Item
let cart = []

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
     // console.log(buttons)
     buttons.forEach(button =>{
        let id = button.dataset.id
        //console.log(id)
     })

   }
}





class Storage {

   static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products))
   }
}

document.addEventListener("DOMContentLoaded", () => {
   const ui = new UI()
   const product = new Products()


   //get all phones 
   product.getProducts().then(products => {
      ui.displayProduct(products)
      Storage.saveProducts(products)
   }).then(()=>{

      ui.getBagButtons()
   })
 
})

