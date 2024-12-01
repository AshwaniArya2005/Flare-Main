//---------------------FIREBASE-------------------------
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDp7xTU84S2OarxDOIaHsjAFyVULOBLaKE",
    authDomain: "food-store-8d1f2.firebaseapp.com",
    databaseURL: "https://food-store-8d1f2-default-rtdb.firebaseio.com",
    projectId: "food-store-8d1f2",
    storageBucket: "food-store-8d1f2.firebasestorage.app",
    messagingSenderId: "49920328384",
    appId: "1:49920328384:web:23fdea1bb9d83a37bc2325",
    measurementId: "G-TZ72GRPWJ3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
//-----------------------FIREBASE------------------------

// Initialize cart count from localStorage or set to 0 if not present
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
const cartNotification = document.getElementById('cart-notification');

// Display the initial cart count on page load
cartCountElement.textContent = cartCount;

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the closest product container (assuming the button is inside the product container)
        const productBox = this.closest('.product-box');
        
        // Get product image, title, and quantity
        const productImage = productBox.querySelector('img').src; // assuming product image is in an <img> tag
        const productTitle = productBox.querySelector('h3').textContent; // assuming product title is in an <h3> tag
        const productQuantity = productBox.querySelector('.quantity input').value; // assuming quantity input is inside an element with class 'quantity'
        const productPrice= productBox.querySelector('.price').textContent.split(' ')[1];
        console.log(productBox.querySelector('.price').textContent.split(' '))

        // Add the product details to the cart (you can store it in an array or object)
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // retrieve existing cart items or initialize an empty array
        
        // Check if the item already exists in the cart, if not, add it
        const existingProductIndex = cartItems.findIndex(item => item.title === productTitle && item.image === productImage && item.price == productPrice);
        
        if (existingProductIndex !== -1) {
            // If product is already in cart, update the quantity
            cartItems[existingProductIndex].quantity += parseInt(productQuantity-cartItems[existingProductIndex].quantity);
        } else {
            // If product is not in cart, add a new entry
            cartItems.push({
                image: productImage,
                title: productTitle,
                price: productPrice,
                quantity: parseInt(productQuantity),
            });
        }
        
        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Increment cart count
        cartCount = parseInt(cartItems.length);
        cartCountElement.textContent = cartCount;

        // Store the updated cart count in localStorage
        localStorage.setItem('cartCount', cartCount);

        showNotification();
    });
});

function showNotification() {
    cartNotification.classList.add('show');
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

// Function to change slides automatically
let currentSlide = 0; // Index of the current slide
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;




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

//-------------------------------CUSTOMER SUPP---------------------
// Open customer care popup
document.getElementById('opencustomer').addEventListener('click', opencustomercare);
function opencustomercare() {
    document.getElementById("loginModal1").style.display = "flex";
}
document.getElementById('closecustomer').addEventListener('click', closecustomercare);
// Close customer care popup
function closecustomercare() {
    document.getElementById("loginModal1").style.display = "none";
}


// Retrieve and display the cart count when the page loads
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
});
//-------------------------------CUSTOMER SUPP---------------------

//-----------------------------LOGIN---------------------------------
document.getElementById('login-image').addEventListener('click', openLoginForm);
// Open the login popup
function openLoginForm() {
    console.log("openLoginForm called");
    document.getElementById("loginModal").style.display = "flex";
}

document.getElementById('closelogin').addEventListener('click', closeLoginForm);
// Close the login popup
function closeLoginForm() {
    document.getElementById("loginModal").style.display = "none";
}
// Event listeners for tab switching
document.getElementById('tab2').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('login'); // Switch to the registration tab
});

document.getElementById('tab1').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    openTab('register'); // Switch back to the login tab
});
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';

    // Optionally, update the title or perform other actions
    const title = tabName === 'login' ? 'Login' : 'Register'; // Adjust as necessary
    document.getElementById('login-register-title').textContent = title;
}

// Login form submission handler
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        document.getElementById('login-success').style.display = 'block';
        document.getElementById('login-success').textContent = 'Login Successful!';
        document.getElementById('error-message').style.display = 'none'; // Hide error message
        setTimeout(() => {
          document.getElementById('login-success').style.display = 'none';
        }, 3000);
      })
      .catch((error) => {
        // Error occurred during login
        console.error('Login Error:', error.message);
        const errorMessage = "Invalid credentials, please try again.";
        document.getElementById('error-message').textContent = errorMessage;
        document.getElementById('error-message').style.display = 'block'; // Show error message
      });
});

// Registration form submission handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        alert('Account created successfully! Please log in.');
        document.getElementById('registerErrorMessage').style.display = 'none'; // Hide error message
        location.reload();  // Refresh the current page
      })
      .catch((error) => {
        // Error occurred during registration
        console.error('Registration Error:', error.message);
        const errorMessage = "An error occurred. Please try again.";
        document.getElementById('registerErrorMessage').textContent = errorMessage;
        document.getElementById('registerErrorMessage').style.display = 'block'; // Show error message
      });
});
// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('User is logged in:', user);
    } else {
        console.log('No user is logged in.');
    }
});
//-------------------------------LOGIN----------------------------

// Open the FAQ modal
document.getElementById('openfaq').addEventListener('click', openFAQModal);
function openFAQModal() {
    const modal = document.getElementById("faqModal");
    modal.style.display = "flex";  // Change 'block' to 'flex' to center the content
}

// Toggle the FAQ answer visibility
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            toggleAnswer(index);
        });
    });
});

function toggleAnswer(index) {
    const answer = document.getElementById(`answer-${index}`);
    if (answer.style.display === 'none') {
        answer.style.display = 'block'; // Show the answer
    } else {
        answer.style.display = 'none'; // Hide the answer
    }
}
// Close the FAQ modal
document.getElementById('closefaq').addEventListener('click', closeFAQModal);
function closeFAQModal() {
    const modal = document.getElementById("faqModal");
    modal.style.display = "none";
}
//-------------------------------LOGIN----------------------------


//------------------------------FEEDBACK--------------------------
emailjs.init("l0JwCTGcUa5TseeYh"); // Replace with your public key

// Handle the form submission
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("service_bxkp9rk", "template_yxls3ko", {
        from_name: name,
        from_email: email,
        message: message,
    }).then(
        function (response) {
            alert("Feedback sent successfully!");
            document.getElementById('feedbackForm').reset(); // Reset the form
        },
        function (error) {
            alert("Failed to send feedback. Please try again later.");
            console.error("Error sending email:", error);
        }
    );
});
//------------------------------FEEDBACK--------------------------
