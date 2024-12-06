const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('.spinBtn');
const timerDisplay = document.querySelector('.timer'); // Timer display element
const coinsDisplay = document.querySelector('.coins'); // Coins display element
let value = 0; // Keeps track of total rotation
let coins = 0; // Start with 0 coins
const maxCoins = 1000; // Maximum coins a user can collect
const resetTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Prize segments (clockwise order from top)
const results = [10, 20, 60, 40, 100, 80, 50, 0];

// Function to format the remaining time
function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Load saved data from localStorage
const savedData = localStorage.getItem('spinData');
if (savedData) {
    const { lastSpinTime, savedCoins } = JSON.parse(savedData);
    const timeElapsed = Date.now() - lastSpinTime;

    // Load coins
    coins = savedCoins || 0;
    coinsDisplay.textContent = `Coins: ${coins}🪙`;

    // If 24 hours have passed, reset the spin button
    if (timeElapsed > resetTime) {
        spinBtn.textContent = "Spin";
        spinBtn.style.cursor = "pointer";
        spinBtn.disabled = false;
        timerDisplay.textContent = ""; // Hide the timer
    } else {
        const timeRemaining = resetTime - timeElapsed;
        timerDisplay.textContent = `Next spin in: ${formatTime(timeRemaining)}`;
        spinBtn.textContent = "❌";
        spinBtn.style.cursor = "not-allowed";
        spinBtn.disabled = true;

        // Start a countdown for the timer
        setInterval(() => {
            const timeRemaining = resetTime - (Date.now() - lastSpinTime);
            if (timeRemaining <= 0) {
                spinBtn.textContent = "Spin";
                spinBtn.style.cursor = "pointer";
                spinBtn.disabled = false;
                timerDisplay.textContent = "";
            } else {
                timerDisplay.textContent = `Next spin in: ${formatTime(timeRemaining)}`;
            }
        }, 1000);
    }
} else {
    // No saved data, initialize
    coinsDisplay.textContent = `Coins: ${coins}🪙`;
    spinBtn.textContent = "Spin";
    spinBtn.style.cursor = "pointer";
    spinBtn.disabled = false;
    timerDisplay.textContent = "";
}

// Spin button functionality
spinBtn.onclick = function () {
    if (spinBtn.disabled) return;

    const spinValue = Math.ceil(Math.random() * 3600) + 360; // Random spin
    value += spinValue;
    wheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    wheel.style.transform = `rotate(${value}deg)`;

    // Save spin time and disable the button
    localStorage.setItem(
        'spinData',
        JSON.stringify({ lastSpinTime: Date.now(), savedCoins: coins })
    );

    spinBtn.textContent = "❌";
    spinBtn.style.cursor = "not-allowed";
    spinBtn.disabled = true;
    timerDisplay.textContent = "Next spin in: 24 hours";

    // Determine the result after the spin animation
    setTimeout(() => {
        const normalizedValue = value % 360; // Get angle within 0-360
        const segment = Math.floor((normalizedValue + 22.5) / 45) % 8; // Align correctly
        const prize = results[segment]; // Get prize

        if (coins < maxCoins) {
            coins += prize;
            if (coins > maxCoins) coins = maxCoins; // Cap coins at max limit
            coinsDisplay.textContent = `Coins: ${coins}🪙`;
        } else {
            alert("You've reached the maximum coins limit! 🎉");
        }

        alert(`You won: ${prize}🪙`);

        // Save updated coin count
        localStorage.setItem(
            'spinData',
            JSON.stringify({ lastSpinTime: Date.now(), savedCoins: coins })
        );
    }, 4000); // Wait for the animation to finish
};
