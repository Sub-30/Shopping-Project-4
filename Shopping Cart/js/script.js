const btncart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnclose=document.querySelector('#cart-close');

btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});
btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});
document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadcontent();
}
function loadcontent(){
    let btnremove=document.querySelectorAll('.trash-ionic');
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });
    
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeqty);
    });

    let  cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addcart);
    });

    updatetotal();
}

function removeItem(){
    if(confirm('Are you sure to remove?')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemlist=itemlist.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadcontent();
    }
}

 function changeqty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadcontent();
}    

let itemlist=[];



function addcart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgsrc=food.querySelector('.food-img').src;
    let newproduct={title,price,imgsrc}

    if(itemlist.find((el)=>el.title==newproduct.title))
{
    alert("This product already added in cart");
    return;
}
    else{
        itemlist.push(newproduct);
    }
   let  newProductElement=createcartproduct(title,price,imgsrc);
   let element=document.createElement('div');
   element.innerHTML=newProductElement;
   let cartbasket=document.querySelector('.cart-content');
   cartbasket.append(element);
   loadcontent();
}

function createcartproduct(title,price,imgsrc) {
  return ` 
  <div class="cart-box">
  <img src="${imgsrc}" class="cart-img">
  <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
      </div>
       <input type="number" value="1" class="cart-quantity">
  </div>
    <ion-icon name="trash-outline" class="trash-ionic"></ion-icon>
</div>
  `;
}

function updatetotal()
{
   const cartitems=document.querySelectorAll('.cart-box');
   const totalvalue=document.querySelector('.total-price');

   let total=0;

   cartitems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

   });
   totalvalue.innerHTML='Rs.'+total;

//add product
   const cartCount=document.querySelector('.cart-count');
   let count=itemlist.length;
   cartCount.innerHTML=count;

   if(count==0){
    cartCount.style.display='none';
   }
   else{
    cartCount.style.display='block';
   }
   
}