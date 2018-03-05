/**
 * Created by Dima on 31.10.2017.
 */

    let buttonStart = document.getElementById('buttonStart');
    let minutes = document.querySelectorAll('div.timer span')[0];
    let seconds = document.querySelectorAll('div.timer span')[1];
    let choiceDifficulty = document.getElementById('choice_level');
    let choiceSkird = document.getElementById('choice_skird');
    let mainField = document.getElementById('main');
    let informationField = document.getElementById('infornation_field');
    let arrOfImage = [];
    let playerChoice = {};
    let currentArr = [];
    let sumHiddenElements = 0;
    let clearTimer;


    for (let i = 0; i < 12; i++) {
    let image = new Image;
    image.src = 'image/hero_' + (i + 1) +'.jpg';
    image.classList.add('for_cards_hidden');
    arrOfImage.push(image);

    let image1 = new Image;
    image1.src = 'image/hero_' + (i + 1) +'.jpg';
    image1.classList.add('for_cards_hidden');
    arrOfImage.push(image1);

    }

    const mainFieldOnclick = function (event) {
    let target = event.target;


    while(target != this) {
        if(target.classList.contains('cards_style')) {
            ratationCard(target);
            return;
        } else {
            target = target.parentElement;
        }
    }
};

    const checkSelection = function(event) {
        if(playerChoice.cardSkirt === undefined || playerChoice.rows === undefined){
            informationField.innerHTML = "Atention! You didn't choice a scirt or a level of game!";
            informationField.classList.add('infornation_field_danger');
            buttonStart.preventDefault(event);
        }
    };

    const timer = function() {

                seconds.innerHTML = Number(seconds.innerHTML) + 1;
            if(seconds.innerHTML < 10) {
                seconds.innerHTML = '0' + seconds.innerHTML;
            } else if (seconds.innerHTML === '60') {
                seconds.innerHTML = '00';
                minutes.innerHTML = Number(minutes.innerHTML) + 1;
            }
    };

    const addCards = function() {

        for(let i = 0; i < playerChoice.rows; i++) {
            let div = document.createElement('div');
            div.classList.add('rows_for_cards');
            mainField.appendChild(div);
        }

        let rowsForCards = document.getElementsByClassName('rows_for_cards');

        for(let x = 0; x < playerChoice.rows; x++) {

            for (let i = 0; i < playerChoice.cells; i++) {
                let card = document.createElement('div');
                card.classList.add('cards_style', playerChoice.cardSkirt);
                // card.classList.add();
                rowsForCards[x].appendChild(card);
            }
        }
        mainField.classList.add('main_after');
    };

    const addCardsImg = function () {
    let cards = document.getElementsByClassName('cards_style');

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    arrOfImage.length = playerChoice.cells * playerChoice.rows;
    arrOfImage.sort(compareRandom);

    for (let i = 0; i < cards.length; i++) {
        cards[i].insertBefore(arrOfImage[i], null);
        arrOfImage[i].classList.remove('show_image');
        }
    };

    const pressButton = function() {
        checkSelection();
        informationField.style.display = 'none';
        document.getElementsByTagName('main')[0].innerHTML = null;

        addCards();
        clearTimer && clearInterval(clearTimer);
        seconds.innerHTML = '00';
        minutes.innerHTML = '0';
        clearTimer = setInterval(timer,1000);
        addCardsImg();
        sumHiddenElements = 0;
    };

    const ratationCard = function (event) {
        let temp_img = event.querySelector('img');
        let currentDeg = 0;

        if(currentArr.length < 2) {
    let foo =  setInterval( () => {
        currentDeg += 2.88;
        event.style.transform = `rotate3d(0,1,0,${currentDeg}deg)`;
        if(currentDeg > 180) {
            clearInterval(foo);
        }
    },16);

    setTimeout( () => {temp_img.classList.add('show_image')},500);
    currentArr.push(temp_img);

    if(currentArr[0].src === currentArr[1].src) {
        for(let i = 0; i < currentArr.length; i++) {
            setTimeout( () => currentArr[i].parentElement.style.visibility = 'hidden', 1500);
            sumHiddenElements++;
            if(playerChoice.cells * playerChoice.rows === sumHiddenElements) {
                clearInterval(timer);
                setTimeout( () => addFieldForWinner(), 1000);
            }
        }
    }
} else {
    for(let i = 0; i < currentArr.length; i++) {
        let foo =  setInterval( () => {
            currentDeg += 2.88;
            event.style.transform = `rotate3d(0,1,0,${currentDeg}deg)`;
            if(currentDeg > 180) {
                clearInterval(foo);
            }
        },16);

        currentArr[i].classList.remove('show_image');

    }
    setTimeout( () => {temp_img.classList.add('show_image')},300);
    currentArr.length = 0;
    currentArr.push(temp_img);
}


};

    const addFieldForWinner = function () {
    let fieldForWinner = document.createElement('div');
    fieldForWinner.classList.add('field_for_winner');
    mainField.appendChild(fieldForWinner);
    fieldForWinner.innerHTML = 'Congratulate! You are WINNER!'
}




    choiceDifficulty.onclick = function (event) {
        let target = event.target;
        playerChoice.cells = target.getAttribute('data-cells');
        playerChoice.rows = target.getAttribute('data-rows');
    };
    choiceSkird.onclick = (event) => {
        let target = event.target;
        playerChoice.cardSkirt = target.getAttribute('data-picture');
    };
    mainField.addEventListener('click', mainFieldOnclick);
    buttonStart.addEventListener('click' , pressButton);
    document.getElementsByClassName()















