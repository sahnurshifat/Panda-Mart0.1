// Main JavaScript file for SimpleShop E-commerce website
// This file handles all functionality including authentication, cart management, and UI interactions

// ========================
// GLOBAL VARIABLES
// ========================
let currentUser = null; // Stores the currently logged-in user
let isAdmin = false; // Tracks if current user is admin
let cart = []; // Array to store cart items

// ========================
// INITIALIZATION
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application when the DOM is fully loaded
    initializeApp();
});

function initializeApp() {
    // Load user session and cart from localStorage
    loadUserSession();
    loadCart();
    
    // Update UI based on current page
    updateAuthUI();
    updateCartCount();
    
    // Set up event listeners based on current page
    setupEventListeners();
    
    // Load products on home page
    if (document.getElementById('products-container')) {
        displayProducts();
        displayFeaturedProducts();
    }
    
    // Load categories page
    if (document.getElementById('categories-full-container')) {
        displayCategoryProducts('all');
    }
    
    // Load featured page
    if (document.getElementById('all-featured-container')) {
        displayAllFeaturedProducts();
    }
    
    // Load cart items on cart page
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
    
    // Load admin panel on admin page
    if (document.getElementById('admin-products-list')) {
        checkAdminAccess();
        displayAdminStats();
        displayAdminProducts();
    }
    
    // Set up search functionality
    setupSearch();
}

// ========================
// AUTHENTICATION FUNCTIONS
// ========================

function loadUserSession() {
    // Check if user is logged in by looking for stored session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
}

function updateAuthUI() {
    // Update navigation links based on authentication status
    const authLink = document.getElementById('auth-link');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (currentUser) {
        // User is logged in
        if (authLink) {
            authLink.textContent = `Hello, ${currentUser.username}`;
            authLink.href = '#';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
    } else {
        // User is not logged in
        if (authLink) {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
}

function registerUser(username, email, password) {
    // Get existing users from localStorage or create empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showMessage('Email already registered!', 'error');
        return false;
    }
    
    // Create new user object
    const newUser = {
        id: Date.now(), // Simple ID generation
        username: username,
        email: email,
        password: password // In real app, this should be hashed
    };
    
    // Add to users array and save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage('Registration successful! Please login.', 'success');
    return true;
}

function loginUser(email, password) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching credentials
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('Login successful!', 'success');
        window.location.href = 'index.html';
        return true;
    } else {
        // Login failed
        showMessage('Invalid email or password!', 'error');
        return false;
    }
}

function logoutUser() {
    // Clear current user session
    currentUser = null;
    isAdmin = false;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showMessage('Logged out successfully!', 'success');
    window.location.href = 'index.html';
}

// ========================
// ADMIN FUNCTIONS
// ========================

function loginAdmin(email, password) {
    // Simple admin credentials (in real app, this would be more secure)
    const adminCredentials = {
        email: 'admin@pandamart.com',
        password: 'admin123'
    };
    
    if (email === adminCredentials.email && password === adminCredentials.password) {
        currentUser = { username: 'Admin', email: email, isAdmin: true };
        isAdmin = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMessage('Admin login successful!', 'success');
        window.location.href = 'admin.html';
        return true;
    } else {
        showMessage('Invalid admin credentials!', 'error');
        return false;
    }
}

function checkAdminAccess() {
    if (!currentUser || !currentUser.isAdmin) {
        showMessage('Access denied. Admin login required.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return false;
    }
    return true;
}

function displayAdminStats() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const featuredCount = products.filter(p => p.featured).length;
    
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('featured-products').textContent = featuredCount;
}

function displayAdminProducts() {
    const container = document.getElementById('admin-products-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productItem = createAdminProductItem(product);
        container.appendChild(productItem);
    });
}

function createAdminProductItem(product) {
    const item = document.createElement('div');
    item.className = 'admin-product-item';
    
    item.innerHTML = `
        <div class="admin-product-info">
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-details">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)} - ${product.category} ${product.featured ? '⭐' : ''}</p>
            </div>
        </div>
        <div class="admin-product-actions">
            <button class="btn btn-secondary" onclick="toggleFeatured(${product.id})">
                ${product.featured ? 'Unfeature' : 'Feature'}
            </button>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `;
    
    return item;
}

function addProduct(name, price, description, category, image, featured) {
    const newProduct = {
        id: Date.now(),
        name: name,
        price: parseFloat(price),
        description: description,
        category: category,
        image: image,
        featured: featured
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    showMessage('Product added successfully!', 'success');
    displayAdminProducts();
    displayAdminStats();
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            showMessage('Product deleted successfully!', 'success');
            displayAdminProducts();
            displayAdminStats();
        }
    }
}

function toggleFeatured(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.featured = !product.featured;
        localStorage.setItem('products', JSON.stringify(products));
        showMessage(`Product ${product.featured ? 'featured' : 'unfeatured'} successfully!`, 'success');
        displayAdminProducts();
        displayAdminStats();
    }
}

// ========================
// SEARCH FUNCTIONALITY
// ========================

function setupSearch() {
    // Only set up search on homepage
    const searchInput = document.querySelector('.search-input-hero');
    const searchBtn = document.querySelector('.search-btn-hero');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input-hero');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        showMessage('Please enter a search term', 'error');
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length === 0) {
        showMessage('No products found matching your search', 'error');
        return;
    }
    
    // Display search results
    displaySearchResults(filteredProducts, searchTerm);
}

function displaySearchResults(filteredProducts, searchTerm) {
    // Find the main products container on current page
    let container = document.getElementById('products-container') || 
                   document.getElementById('category-products-container') ||
                   document.getElementById('all-featured-container');
    
    if (!container) return;
    
    // Update page title if exists
    const titleElement = document.querySelector('.section-title, .filter-title');
    if (titleElement) {
        titleElement.textContent = `Search Results for "${searchTerm}" (${filteredProducts.length} found)`;
    }
    
    // Clear and display filtered products
    container.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    // Scroll to results
    container.scrollIntoView({ behavior: 'smooth' });
    
    showMessage(`Found ${filteredProducts.length} products`, 'success');
}

// ========================
// MESSAGE SYSTEM
// ========================

function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.admin-message, .toast-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `admin-message ${type === 'error' ? 'error' : ''}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-message">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Show message
    messageDiv.style.display = 'flex';
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 4000);
    
    // Close button functionality
    const closeBtn = messageDiv.querySelector('.close-message');
    closeBtn.addEventListener('click', () => {
        messageDiv.remove();
    });
}

// ========================
// CART MANAGEMENT FUNCTIONS
// ========================

function loadCart() {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function saveCart() {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    // Check if user is logged in
    if (!currentUser) {
        showMessage('Please login to add items to cart!', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    // Find the product
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increment quantity if item already exists
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showMessage('Item added to cart!', 'success');
}

function removeFromCart(productId) {
    // Remove item from cart
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems(); // Refresh cart display
}

function updateQuantity(productId, newQuantity) {
    // Update item quantity in cart
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            displayCartItems(); // Refresh cart display
        }
    }
}

function clearCart() {
    // Clear all items from cart
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        displayCartItems();
    }
}

function updateCartCount() {
    // Update cart count in navigation
    const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        if (totalItems > 0) {
            element.textContent = totalItems;
            element.style.display = 'flex';
        } else {
            element.textContent = '';
            element.style.display = 'none';
        }
    });
    
    // Show/hide floating cart based on items
    const floatingCart = document.getElementById('floating-cart');
    if (floatingCart) {
        if (totalItems > 0) {
            floatingCart.style.display = 'block';
        } else {
            floatingCart.style.display = 'none';
        }
    }
}

// ========================
// DISPLAY FUNCTIONS
// ========================

function displayFeaturedProducts() {
    // Display featured products preview on home page (limit to 4)
    const container = document.getElementById('featured-container');
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    container.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function displayAllFeaturedProducts() {
    // Display all featured products on featured page
    const container = document.getElementById('all-featured-container');
    if (!container) return;
    
    const featuredProducts = products.filter(product => product.featured);
    container.innerHTML = '';
    
    // Update featured count
    const countElement = document.getElementById('featured-count');
    if (countElement) {
        countElement.textContent = featuredProducts.length;
    }
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function displayCategoryProducts(categoryId) {
    // Display products filtered by category
    const container = document.getElementById('category-products-container');
    if (!container) return;
    
    let filteredProducts;
    let titleText;
    
    if (categoryId === 'all') {
        filteredProducts = products;
        titleText = 'All Products';
    } else {
        filteredProducts = products.filter(product => product.category === categoryId);
        const category = categories.find(cat => cat.id === categoryId);
        titleText = category ? category.name : 'Products';
    }
    
    // Update title
    const titleElement = document.querySelector('.filter-title');
    if (titleElement) {
        titleElement.textContent = titleText;
    }
    
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}
function displayProducts() {
    // Display all products on the home page
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function createProductCard(product) {
    // Create a product card element
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function displayCartItems() {
    // Display cart items on the cart page
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        // Show empty cart message
        emptyCart.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    // Hide empty cart message and show cart content
    emptyCart.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';
    
    // Create cart items
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update cart summary
    updateCartSummary();
}

function createCartItem(item) {
    // Create a cart item element
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn btn-danger remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `;
    
    return cartItem;
}

function updateCartSummary() {
    // Update the cart summary section
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// ========================
// EVENT LISTENERS SETUP
// ========================

function filterByCategory(categoryId) {
    // Filter products by category and update active filter button
    displayCategoryProducts(categoryId);
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === categoryId) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to products section
    const productsSection = document.getElementById('filtered-products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupEventListeners() {
    // Set up event listeners based on current page elements
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
    
    // Authentication form switching
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const showAdmin = document.getElementById('show-admin');
    const showLoginFromAdmin = document.getElementById('show-login-from-admin');
    
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
            const adminForm = document.getElementById('admin-form');
            if (adminForm) adminForm.style.display = 'none';
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            const adminForm = document.getElementById('admin-form');
            if (adminForm) adminForm.style.display = 'none';
        });
    }
    
    if (showAdmin) {
        showAdmin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('admin-form').style.display = 'block';
        });
    }
    
    if (showLoginFromAdmin) {
        showLoginFromAdmin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('admin-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            loginUser(email, password);
        });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validate password confirmation
            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', 'error');
                return;
            }
            
            // Register the user
            if (registerUser(username, email, password)) {
                // Switch back to login form on successful registration
                document.getElementById('register-form').style.display = 'none';
                document.getElementById('login-form').style.display = 'block';
            }
        });
    }
    
    // Admin form submission
    const adminForm = document.getElementById('admin-form-element');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            loginAdmin(email, password);
        });
    }
    
    // Admin logout
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', logoutUser);
    }
    
    // Add product form
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            const description = document.getElementById('product-description').value;
            const category = document.getElementById('product-category').value;
            const image = document.getElementById('product-image').value;
            const featured = document.getElementById('product-featured').checked;
            
            addProduct(name, price, description, category, image, featured);
            
            // Reset form
            addProductForm.reset();
        });
    }
    
    // Cart page specific listeners
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    // Checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
    }
    
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
    
    // Contact modal close
    const contactModal = document.getElementById('contact-success-modal');
    const contactCloseModal = contactModal ? contactModal.querySelector('.close-modal') : null;
    
    if (contactCloseModal) {
        contactCloseModal.addEventListener('click', function() {
            contactModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (checkoutModal && event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
        if (contactModal && event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });
    
    // Dropdown functionality for categories
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }
            });
        }
    });
}

// ========================
// CHECKOUT FUNCTIONALITY
// ========================

function proceedToCheckout() {
    // Simulate checkout process
    if (!currentUser) {
        showMessage('Please login to checkout!', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    if (cart.length === 0) {
        showMessage('Your cart is empty!', 'error');
        return;
    }
    
    // Calculate total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show checkout modal
    document.getElementById('order-total').textContent = totalPrice.toFixed(2);
    document.getElementById('checkout-modal').style.display = 'block';
    
    // Clear cart after "successful" checkout
    cart = [];
    saveCart();
    updateCartCount();
    
    // Hide cart content and show empty message after a delay
    setTimeout(() => {
        displayCartItems();
    }, 2000);
}

// ========================
// CONTACT FORM FUNCTIONALITY
// ========================

function handleContactForm() {
    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission (in real app, this would send to server)
    console.log('Contact form submitted:', { name, email, subject, message });
    
    // Show success modal
    document.getElementById('contact-success-modal').style.display = 'block';
    
    // Reset form
    document.getElementById('contact-form').reset();
}