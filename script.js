const challenges = [
  {
    title: "Build a semantic page",
    category: "html",
    description:
      "Create a simple article page using semantic HTML elements instead of generic containers wherever appropriate.",
    hint:
      "Look into elements such as header, main, article, section, and footer."
  },
  {
    title: "Create an accessible form",
    category: "html",
    description:
      "Build a contact form with a text field, an email field, and a submit button.",
    hint:
      "Connect each label to its input using matching for and id attributes."
  },
  {
    title: "Design a profile card",
    category: "css",
    description:
      "Create a profile card with a heading, short description, and button. Make it responsive.",
    hint:
      "Try padding, border-radius, max-width, and a flexible layout."
  },
  {
    title: "Master the box model",
    category: "css",
    description:
      "Create three boxes with different padding and borders. Make their sizing predictable.",
    hint:
      "Experiment with box-sizing: border-box and compare the results."
  },
  {
    title: "Build a counter",
    category: "javascript",
    description:
      "Create a counter with increment and decrement buttons. Keep the displayed value in sync.",
    hint:
      "Use a variable to store the count and update a DOM element with textContent."
  },
  {
    title: "Filter a list",
    category: "javascript",
    description:
      "Take an array of words and display only the words longer than five characters.",
    hint:
      "Explore the filter() array method and how it returns a new array."
  }
];

// Select the HTML elements we need.
const categorySelect = document.querySelector("#category");
const generateButton = document.querySelector("#generate-btn");
const hintButton = document.querySelector("#hint-btn");
const completeButton = document.querySelector("#complete-btn");

const challengeTitle = document.querySelector("#challenge-title");
const challengeDescription = document.querySelector(
  "#challenge-description"
);
const hintArea = document.querySelector("#hint-area");
const hintText = document.querySelector("#hint-text");
const statusMessage = document.querySelector("#challenge-status");
const completedCount = document.querySelector("#completed-count");

// Keep track of the current challenge and total completions.
let currentChallenge = null;
let completedTotal = 0;

function generateChallenge() {
  const selectedCategory = categorySelect.value;

  const availableChallenges = challenges.filter((challenge) => {
    return (
      selectedCategory === "all" ||
      challenge.category === selectedCategory
    );
  });

  // Choose a random challenge from the filtered list.
  let nextChallenge =
    availableChallenges[
      Math.floor(Math.random() * availableChallenges.length)
    ];

  // Avoid showing the same challenge twice in a row when possible.
  if (availableChallenges.length > 1 && currentChallenge) {
    while (nextChallenge === currentChallenge) {
      nextChallenge =
        availableChallenges[
          Math.floor(Math.random() * availableChallenges.length)
        ];
    }
  }

  currentChallenge = nextChallenge;

  // Update the page with the new challenge.
  challengeTitle.textContent = currentChallenge.title;
  challengeDescription.textContent = currentChallenge.description;

  // Reset the hint and completion controls.
  hintArea.hidden = true;
  hintText.textContent = "";
  hintButton.disabled = false;
  completeButton.disabled = false;

  statusMessage.textContent = "A new challenge is ready!";
}

function revealHint() {
  if (!currentChallenge) return;

  hintText.textContent = currentChallenge.hint;
  hintArea.hidden = false;
  hintButton.disabled = true;
}

function completeChallenge() {
  if (!currentChallenge || completeButton.disabled) return;

  completedTotal += 1;
  completedCount.textContent = completedTotal;

  completeButton.disabled = true;
  statusMessage.textContent = "Quest complete! Nice work.";
}

// Listen for user interactions.
generateButton.addEventListener("click", generateChallenge);
hintButton.addEventListener("click", revealHint);
completeButton.addEventListener("click", completeChallenge);
