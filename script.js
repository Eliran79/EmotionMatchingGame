// Array of emotions (update with your desired 7 emotions)
const emotions = ["happy", "sad", "angry", "surprise", "disgust", "fear", "neutral"];

const playAgainButton = document.getElementById("play-again");
const resetButton = document.getElementById("reset-button");

playAgainButton.addEventListener("click", () => {
  window.location.reload(); // Reload the page to start a new game
});

resetButton.addEventListener("click", () => {
  coinCount = 0;
  localStorage.setItem("coinCount", coinCount);
  coinDisplay.textContent = `Coins: ${coinCount}`;
});

// Function to generate the image path based on emotion and image number
function getImagePath(emotion, imageNumber) {
  return `images/${emotion}/${imageNumber}.jpg`;
}

// Function to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there are elements remaining
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// State variables for coin count and coin display element
let coinCount = 0;
const coinDisplay = document.getElementById("coin-display"); // Assuming you have an element with this ID

// Check for existing stored coin count in localStorage and update display
if (localStorage.getItem("coinCount")) {
  coinCount = parseInt(localStorage.getItem("coinCount"));
  coinDisplay.textContent = `Coins: ${coinCount}`;
}

// Function to display emotions and handle user selection
function displayEmotion() {
  const shuffledEmotions = shuffle(emotions.slice()); // Deep copy of emotions array

  const correctEmotion = shuffledEmotions[0];
  const imageNumber = Math.floor(Math.random() * 400) + 1; // Random image number between 1 and 400
  const imageSrc = getImagePath(correctEmotion, imageNumber) + "?" + Date.now(); // Prevent caching

  document.getElementById("emotion-image").src = imageSrc;

  // Shuffle the button order
  const shuffledButtons = shuffle([...document.getElementById("options").querySelectorAll("button")]);

  for (let i = 0; i < shuffledButtons.length; i++) {
    shuffledButtons[i].textContent = shuffledEmotions[i];

    // Update click handler to check against correct emotion, update coin count and display on success
    shuffledButtons[i].addEventListener("click", () => {
      const message = document.getElementById("message");
      if (shuffledButtons[i].textContent === correctEmotion) {
        coinCount++;
        localStorage.setItem("coinCount", coinCount); // Update stored value
        coinDisplay.textContent = `Coins: ${coinCount}`;
        message.textContent = "Correct! You earned a coin!";
      } else {
        message.textContent = `Oops! The correct emotion was ${correctEmotion}.`;
      }
    });
  }
}

// Display the initial emotion and options
displayEmotion();

// Register the Service Worker (if supported)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
