const state = {
  cards: [],
  currentCard: null,
  sticky: localStorage.getItem("wwSticky") === "true"
};

const imageEl = document.querySelector("#card-image");
const titleEl = document.querySelector("#card-title");
const descriptionEl = document.querySelector("#card-description");
const levelEl = document.querySelector("#card-level");
const drawButton = document.querySelector("#draw-card");
const keepButton = document.querySelector("#keep-card");
const levelFilter = document.querySelector("#level-filter");

function filteredCards() {
  const selectedLevel = levelFilter.value;
  if (selectedLevel === "all") return state.cards;
  return state.cards.filter(card => String(card.level) === selectedLevel);
}

function chooseRandomCard() {
  const available = filteredCards();
  if (!available.length) return null;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function renderCard(card) {
  if (!card) return;
  state.currentCard = card;
  imageEl.src = `cards/${card.image}`;
  imageEl.alt = `${card.title} card`;
  titleEl.textContent = card.title;
  descriptionEl.textContent = card.description;
  levelEl.textContent = `Level ${card.level}`;

  if (state.sticky) {
    localStorage.setItem("wwSelectedCard", JSON.stringify(card));
  }
}

function drawCard() {
  renderCard(chooseRandomCard());
}

function updateStickyButton() {
  keepButton.setAttribute("aria-pressed", String(state.sticky));
  keepButton.textContent = state.sticky ? "Card kept on refresh" : "Keep my card on refresh";
}

async function init() {
  state.cards = await fetch("cards.json").then(response => response.json());
  updateStickyButton();

  const saved = localStorage.getItem("wwSelectedCard");
  if (state.sticky && saved) {
    try {
      renderCard(JSON.parse(saved));
    } catch {
      drawCard();
    }
  } else {
    drawCard();
  }
}

drawButton.addEventListener("click", () => {
  if (!state.sticky) localStorage.removeItem("wwSelectedCard");
  drawCard();
});

keepButton.addEventListener("click", () => {
  state.sticky = !state.sticky;
  localStorage.setItem("wwSticky", String(state.sticky));
  if (!state.sticky) {
    localStorage.removeItem("wwSelectedCard");
  } else if (state.currentCard) {
    localStorage.setItem("wwSelectedCard", JSON.stringify(state.currentCard));
  }
  updateStickyButton();
});

levelFilter.addEventListener("change", drawCard);

init().catch(error => {
  console.error(error);
  titleEl.textContent = "Unable to load cards";
  descriptionEl.textContent = "Check that cards.json is in the same folder as index.html.";
});
