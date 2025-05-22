document.addEventListener('DOMContentLoaded', function() {
   
    const minusBtn = document.querySelector('.quantity i:first-child');
    const plusBtn = document.querySelector('.quantity i:last-child');
    const quantityDisplay = document.querySelector('.quantity h3');
    const addToCartBtn = document.querySelector('.add-btn button');
    const cartIcon = document.querySelector('.icon-cart');
    
   
    let quantity = 0;
    let cartItems = [];
    let cartOpen = false;


    
   
    const cartDropdown = document.createElement('div');
    cartDropdown.className = 'cart-dropdown';
    cartDropdown.innerHTML = `
        <div class="cart-header">
            <h3>Cart</h3>
        </div>
        <div class="cart-content">
            <p class="empty-cart">Your cart is empty.</p>
        </div>
    `;
    document.querySelector('.cart').appendChild(cartDropdown);
    
  
    const cartBadge = document.createElement('span');
    cartBadge.className = 'cart-badge';
    cartBadge.style.display = 'none';
    document.querySelector('.cart').appendChild(cartBadge);

    const productInfo = {
        name: "Fall Limited Edition Sneakers",
        price: 125.00,
        originalPrice: 250.00,
        discount: 50,
        image: "./images/image-product-1-thumbnail.jpg"
    };
    
 

    minusBtn.addEventListener('click', decreaseQuantity);
    plusBtn.addEventListener('click', increaseQuantity);
    addToCartBtn.addEventListener('click', addToCart);
    cartIcon.addEventListener('click', toggleCart);
    
   
    function decreaseQuantity() {
        if (quantity > 0) {
            quantity--;
            updateQuantityDisplay();
        }
    }
    
    function increaseQuantity() {
        quantity++;
        updateQuantityDisplay();
    }
    
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
    }
    
    function addToCart() {
        if (quantity === 0) {
            showNotification('Please select at least 1 item');
            return;
        }
        
    
        const existingItemIndex = cartItems.findIndex(item => item.name === productInfo.name);
        
        if (existingItemIndex !== -1) {
            
            cartItems[existingItemIndex].quantity += quantity;
        } else {
       
            cartItems.push({
                name: productInfo.name,
                price: productInfo.price,
                quantity: quantity,
                image: productInfo.image,
                id: Date.now() 
            });
        }

        updateCartDisplay();
        

        quantity = 0;
        updateQuantityDisplay();
        
    
        showNotification('Product added to cart!');
    }
    
    function updateCartDisplay() {
     
        if (cartItems.length > 0) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'block';
        } else {
            cartBadge.style.display = 'none';
        }
        
     
        const cartContent = document.querySelector('.cart-content');
        
        if (cartItems.length === 0) {
            cartContent.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            return;
        }
        
        let cartHTML = '';
        
        cartItems.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity} <span class="cart-item-total">$${itemTotal}</span></p>
                    </div>
                    <button class="remove-item" onclick="removeItem(${item.id})">
                        <img src="./images/icon-delete.svg" alt="Remove">
                    </button>
                </div>
            `;
        });
        
        cartHTML += `
            <div class="cart-footer">
                <button class="checkout-btn">Checkout</button>
            </div>
        `;
        
        cartContent.innerHTML = cartHTML;

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                removeItem(itemId);
            });
        });
        
      
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
    }
    
    function removeItem(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCartDisplay();
    }
    
    function toggleCart() {
        cartOpen = !cartOpen;
        cartDropdown.classList.toggle('open', cartOpen);
    }
    
    function checkout() {
        alert('Thank you for your purchase!');
        cartItems = [];
        updateCartDisplay();
        cartDropdown.classList.remove('open');
        cartOpen = false;
    }
    
    function showNotification(message) {
        
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        

        notification.textContent = message;
        notification.classList.add('show');
        
      
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    window.removeItem = removeItem;
});