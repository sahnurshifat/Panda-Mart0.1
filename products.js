// Product data - This would typically come from a database or API
// Each product has an ID, name, price, description, and image URL
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: true
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        description: "Feature-rich smartwatch with fitness tracking",
        image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: true
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        description: "Durable laptop backpack with multiple compartments",
        image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        featured: false
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 39.99,
        description: "Portable Bluetooth speaker with excellent sound quality",
        image: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: true
    },
    {
        id: 5,
        name: "Smartphone",
        price: 599.99,
        description: "Latest smartphone with advanced camera and features",
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: false
    },
    {
        id: 6,
        name: "Coffee Mug",
        price: 14.99,
        description: "Premium ceramic coffee mug for your daily brew",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "home",
        featured: false
    },
    {
        id: 7,
        name: "Desk Lamp",
        price: 34.99,
        description: "Modern LED desk lamp with adjustable brightness",
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "home",
        featured: true
    },
    {
        id: 8,
        name: "Gaming Mouse",
        price: 59.99,
        description: "High-precision gaming mouse with RGB lighting",
        image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: false
    },
    {
        id: 9,
        name: "Yoga Mat",
        price: 29.99,
        description: "Non-slip yoga mat for comfortable workouts",
        image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "fitness",
        featured: true
    },
    {
        id: 10,
        name: "Water Bottle",
        price: 19.99,
        description: "Insulated stainless steel water bottle",
        image: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "fitness",
        featured: false
    },
    {
        id: 11,
        name: "Sunglasses",
        price: 89.99,
        description: "Stylish UV protection sunglasses",
        image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        featured: true
    },
    {
        id: 12,
        name: "Notebook Set",
        price: 24.99,
        description: "Premium leather-bound notebook set",
        image: "https://images.pexels.com/photos/159832/book-address-book-learning-learn-159832.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        featured: false
    },
    {
        id: 13,
        name: "Wireless Keyboard",
        price: 89.99,
        description: "Mechanical wireless keyboard with RGB backlighting",
        image: "https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: true
    },
    {
        id: 14,
        name: "USB-C Hub",
        price: 45.99,
        description: "Multi-port USB-C hub with HDMI and USB 3.0",
        image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: false
    },
    {
        id: 15,
        name: "Leather Wallet",
        price: 39.99,
        description: "Premium leather wallet with RFID protection",
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        featured: true
    },
    {
        id: 16,
        name: "Tablet Stand",
        price: 24.99,
        description: "Adjustable aluminum tablet and phone stand",
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: false
    },
    {
        id: 17,
        name: "Essential Oil Diffuser",
        price: 49.99,
        description: "Ultrasonic aromatherapy essential oil diffuser",
        image: "https://images.pexels.com/photos/6663573/pexels-photo-6663573.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "home",
        featured: true
    },
    {
        id: 18,
        name: "Throw Pillow Set",
        price: 34.99,
        description: "Set of 2 decorative throw pillows for sofa",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "home",
        featured: false
    },
    {
        id: 19,
        name: "Resistance Bands Set",
        price: 19.99,
        description: "Complete resistance bands set for home workouts",
        image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "fitness",
        featured: true
    },
    {
        id: 20,
        name: "Protein Shaker",
        price: 12.99,
        description: "BPA-free protein shaker bottle with mixing ball",
        image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "fitness",
        featured: false
    },
    {
        id: 21,
        name: "Wireless Earbuds",
        price: 129.99,
        description: "True wireless earbuds with active noise cancellation",
        image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "electronics",
        featured: true
    },
    {
        id: 22,
        name: "Travel Backpack",
        price: 79.99,
        description: "Large capacity travel backpack with multiple compartments",
        image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "accessories",
        featured: false
    },
    {
        id: 23,
        name: "Smart Light Bulbs",
        price: 29.99,
        description: "WiFi smart LED bulbs with color changing capability",
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "home",
        featured: true
    },
    {
        id: 24,
        name: "Foam Roller",
        price: 24.99,
        description: "High-density foam roller for muscle recovery",
        image: "https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "fitness",
        featured: false
    }
];

// Category definitions
const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        description: 'Latest gadgets and electronic devices',
        icon: '📱'
    },
    {
        id: 'accessories',
        name: 'Accessories',
        description: 'Stylish accessories for everyday use',
        icon: '👜'
    },
    {
        id: 'home',
        name: 'Home & Living',
        description: 'Items to make your home more comfortable',
        icon: '🏠'
    },
    {
        id: 'fitness',
        name: 'Fitness',
        description: 'Equipment for your fitness journey',
        icon: '💪'
    }
];