let currentSlide = 0; // Index of the current slide
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;

// Function to change slides automatically
function changeSlide() {
    // Remove 'active' class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Increment the slide index
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add 'active' class to the new current slide
    slides[currentSlide].classList.add('active');
}

// Set the slide to change every 6 seconds
setInterval(changeSlide, 6000);

let currentIndex1 = 0;
let currentIndex2 = 0;

function moveSlide(direction, sliderClass) {
    const slides = document.querySelectorAll(`.${sliderClass} .product-slide`);
    const totalSlides = slides.length;

    let currentIndex = (sliderClass === 'slider1') ? currentIndex1 : currentIndex2;
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Wrap back to the last slide
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Wrap to the first slide
    }

    const offset = -currentIndex * 100;
    document.querySelector(`.${sliderClass}`).style.transform = `translateX(${offset}%)`;

    // Update the appropriate currentIndex based on the slider
    if (sliderClass === 'slider1') {
        currentIndex1 = currentIndex;
    } else {
        currentIndex2 = currentIndex;
    }
}

// Select all the quantity buttons and add event listeners
document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Find the input field in the same parent container (div.quantity)
        const input = this.parentNode.querySelector('input');
        let currentValue = parseInt(input.value);

        // Check if it's the plus button or minus button
        if (this.textContent === '+') {
            currentValue++; // Increase value by 1
        } else if (this.textContent === '-' && currentValue > 1) {
            currentValue--; // Decrease value by 1, but not below 1
        }

        // Update the input value with the new value
        input.value = currentValue;
    });
});

// Open the login popup
function openLoginForm() {
    document.getElementById("loginModal").style.display = "flex";
}

// Close the login popup
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}

// Open the login popup
function opencustomercare() {
    document.getElementById("loginModal1").style.display = "flex";
}

// Close the login popup
function closecustomercare() {
    document.getElementById("loginModal1").style.display = "none";
}


// Initialize cart count
let cartCount = 0;

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
        showNotification();
    });
});

function showNotification() {
    cartNotification.classList.add('show');
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}
