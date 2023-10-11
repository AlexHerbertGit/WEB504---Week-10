//DOM selectors
const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentElement = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')
const addQuestionBtn = document.getElementById('add-question')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

//Keep Track of current card
let currentActiveCard = 0;

//Store DOM cards
const cardsElement = [];

//Store card data
const cardData = getCardData()

//Create Cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

card.innerHTML = `
<div class="inner-card">
                  <div class="inner-card-front">
                    <p>
                      ${data.question}
                    </p>
                  </div>
                  <div class="inner-card-back">
                    <p>
                     ${data.answer}
                    </p>
                  </div>
                </div>
                `;

card.addEventListener('click', () => card.classList.toggle('show-answer'));

//Add to DOM cards
cardsElement.push(card);

cardsContainer.appendChild(card);

updateCurrentText();

}