document.addEventListener('DOMContentLoaded', () => {

    let colors = ['cyan', 'green', 'blue', 'yellow', 'purple']; //? Define the colors for the pairs of cards
    let gameColors = colors.concat(colors); //? Duplicate the colors to have pairs


     //? Declare variables needed for the game
    let cards;
    let timer;

    let timeRemaining = 40;
    let matchedPairs = 0;
    let selectedCards = [];
    let selectedCardIds = [];


    //? Get  DOM elements 
    let timerDiv = document.getElementById('timer');
    let modal = document.getElementById('modal');
    let modalText = document.getElementById('modal-text');
    let closeButton = document.querySelector(".close-button");
    let replayButton = document.getElementById('replay-button');



     //? Initialize the game
    function initGame() {
        shuffleColors();
        setupCards();
        resetTimer();
        matchedPairs = 0;
    }


     //? Function to shuffle the colors
    function shuffleColors() {
        gameColors.sort(() => 0.5 - Math.random());
    }


      //? Function to set up the cards
    function setupCards() {

        cards = document.querySelectorAll('.card');

        cards.forEach((card, index) => {

            card.classList.remove('flipped');

            card.addEventListener('click', flipCard);

            let backSide = card.querySelector('.back');

            backSide.style.backgroundColor = gameColors[index];
            card.setAttribute('data-id', index); //? Set a data attribute on the card to hold its index
        });
    }


     //? Function for when a card is flipped
    function flipCard() {

        let cardId = this.getAttribute('data-id');

        selectedCards.push(this);

        selectedCardIds.push(cardId);

        this.classList.add('flipped');

        if (selectedCards.length === 2) {

            setTimeout(checkForMatch, 500); //? Check if the two selected cards match

        }
    }


    //? Check if the two selected cards match
    function checkForMatch() {

        let [firstCard, secondCard] = selectedCards;

        if (gameColors[selectedCardIds[0]] === gameColors[selectedCardIds[1]]) {

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            matchedPairs++;

        } else {

            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

        }

        selectedCards = [];
        selectedCardIds = [];

        if (matchedPairs === colors.length) {

            clearInterval(timer);

            showModal('Félicitations! Vous avez trouvé toutes les paires avant la fin du temps!');
        }
    }


     //? Function to reset the timer
    function resetTimer() {

        clearInterval(timer);

        timeRemaining = 40;

        timerDiv.textContent = `Time remaining: ${timeRemaining} seconds`;

        timer = setInterval(() => {

            timeRemaining--;

            timerDiv.textContent = `Time remaining: ${timeRemaining} seconds`;

            if (timeRemaining === 0) {

                clearInterval(timer);

                showModal('Temps écoulé! Vous avez perdu.'); //? Show the modal with a loss message
            }
        }, 1000);
    }


      //? Function to show a modal with a message
    function showModal(message) {

        modalText.textContent = message;

        modal.style.display = 'block';
    }

    closeButton.addEventListener("click", () => {

        modal.style.display = 'none';

    });

    replayButton.addEventListener('click', () => {

        modal.style.display = 'none';

        initGame();

    });

    initGame();
});
