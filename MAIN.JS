var swiper = new Swiper(".mySwiper", {
    loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });
    let carttab=document.querySelector(".cart-tab");
    let carticon=document.querySelector(".cart-icon");
    let cardlist=document.querySelector(".card-list");
    let cartlist=document.querySelector(".cart-list");
    let carttotal=document.querySelector(".cart-total");
    let cartvalue=document.querySelector(".cart-value");
    let hamburger=document.querySelector(".hamburger");
    let mobilemenue=document.querySelector(".mobile-menue");
    let bars=document.querySelector(".fa-bars");
    carticon.addEventListener("click",()=>{
      carttab.classList.add("cart-tab-active");
    });
    let closebtn=document.querySelector(".close-btn");
    closebtn.addEventListener("click",()=>{
      carttab.classList.remove("cart-tab-active");
    })
    hamburger.addEventListener("click",()=>{
      mobilemenue.classList.toggle("mobile-menue-active");
    })
    hamburger.addEventListener("click",()=>{
      bars.classList.toggle("fa-xmark");

    })
    // now taking data from json file 
    let data=[];
    let cartproduct=[];
    let updatetotal=()=>{
      let totalquantity=0;
      let totalprice=0;
    document.querySelectorAll(".item").forEach(item=>{
      const quantity=parseInt(item.querySelector(".quantity-value").textContent);
      const price=parseInt(item.querySelector(".item-total").textContent.replace("$",""));
      totalprice=totalprice+price;
      totalquantity=totalquantity+quantity;
    })
    carttotal.textContent=`${totalprice.toFixed(2)}`;
    cartvalue.textContent=totalquantity;
    }
    let showdata=()=>{
      data.forEach(elem=>{

      
      let order=document.createElement("div");
      order.classList.add("order-card");
      order.innerHTML=`
       <div class="card-image">
                        <img src="${elem.image}" />
                    </div>
                    <h4>${elem.name}</h4>
                    <h4 class="price">${elem.price}</h4>
                    <a href="#"class="btn card-btn">ADD TO CART </a>
      `;
              cardlist.append(order);
              const cardbtn=order.querySelector(".card-btn");
              cardbtn.addEventListener("click",(e)=>{
                e.preventDefault();
                addtocart(elem);
              });
      });
    

    }
    const addtocart=(product)=>{
      const existingproduct=cartproduct.find(item=>item.id===product.id);
      if(existingproduct){
        alert("ITEM IS ALERADY PRESENT IN CART ");
        return;
      }
      cartproduct.push(product);
      let quantity=1;
       let price=parseFloat(product.price.replace('$',''));
      let cartitem=document.createElement("div");
      cartitem.classList.add("item");
      cartitem.innerHTML=`
       <div class="item-image">
                            <img src="${product.image}"/>
                        </div>
                        <div>
                            <h4>${product.name}</h4>
                            <h4 class="item-total">${product.price}</h4>
                        </div>
                        <div class="flex">
                            <a href="#"class="quantity-btn minus">
                                <i class="fa-solid fa-minus"></i>
                            </a>
                            <h4 class="quantity-value">${quantity}</h4>
                               <a href="#"class="quantity-btn plus">
                                <i class="fa-solid fa-plus"></i>
                            </a>
                        </div>
      `;
      cartlist.appendChild(cartitem);
      updatetotal();
      let plusbtn=cartitem.querySelector(".plus");
      let minusbtn=cartitem.querySelector(".minus");
      let quantityvalue=cartitem.querySelector(".quantity-value");
      let itemtotal=cartitem.querySelector(".item-total");
      plusbtn.addEventListener("click",(e)=>{
        e.preventDefault();
        quantity++;
        quantityvalue.textContent=quantity;
        itemtotal.textContent=`${(price*quantity).toFixed(2)}`;
        updatetotal();


      })


       minusbtn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(quantity>1){
        quantity--;
        quantityvalue.textContent=quantity;
        itemtotal.textContent=`${(price*quantity).toFixed(2)}`;
        updatetotal();
        }
        else{
          cartitem.classList.add("slide-out");
          setTimeout(()=>{
            cartitem.remove();
            cartproduct=cartproduct.filter(item=>item.id!==product.id);
            updatetotal();
          },200)
        }


      })

    }
    let init=()=>{
      fetch("product.json").then
      (Response=>Response.json()).then
      (d=>{
        data=d;
        showdata();
      })

    }
    init();