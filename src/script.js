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
    cardData.forEach((data, index) => createCard(data, index));
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

//Show number of cards
function updateCurrentText() {
    currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`; //Add 1 to it because it is 0 by default
}

// Get cards from local storage
function getCardData() {
    //Local storage only store string so we will take the array fetch back as an array using parse
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards; // If cards are null return an empty array
}

//Add Card to local storage
function setCardData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

//Event Listeners

//Next Button
nextBtn.addEventListener('click', () => {
    cardsElement[currentActiveCard].classList.remove('active');
    cardsElement[currentActiveCard].classList.add('left');

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsElement[currentActiveCard].classList.add('active');
    updateCurrentText();
});


//Previous button
prevBtn.addEventListener('click', () => {
    cardsElement[currentActiveCard].classList.remove('active');
    cardsElement[currentActiveCard].classList.add('right');

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsElement[currentActiveCard].classList.add('active');
    updateCurrentText();
});

//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
//Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));


//Add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionElement.value;
    const answer = answerElement.value;
    console.log(question, answer);

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer};

        createCard(newCard);

        questionElement.value = '';
        answerElement.value = '';

        addContainer.classList.remove('show');

        cardData.push(newCard);
        setCardData(cardData);
    }
});

//Clear cards button

clearBtn.addEventListener('click' , () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

