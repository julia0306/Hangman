let sentence;
let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let result = [];
let attemptsLeft = 5;
let attemptsDisplay = document.getElementById('attempts-left');
let inputField = document.getElementById('inputField');
let textSubmit = document.getElementById('textSubmit');
let clickedLetter;
let inputText;
let letterContainer = document.getElementById('letters');
let letterDiv;
let letterDivs = document.getElementsByClassName('letterDiv');
let victoryInfo = document.getElementById('victory-info');
let textToGuess= document.getElementById('text-to-guess');
let isNewWordSubmitted = false;


            // INITIALISATION DU JEU 

// J'affiche le nombre d'essais, les lettres de l'alphabet et l'entrée utilisateur 

displayAttempts();
displayLetters();
collectLetterInput(); 

// cette fonction affiche le nombre d'essais restants
function displayAttempts() {
    attemptsDisplay.textContent = `You have ${attemptsLeft} attempts left.`;
};

// Cette fonction affiche l'ensemble de l'alphabet 
function displayLetters(){
    for(i=0; i<letters.length; i++){
        letterDiv=document.createElement('div');
        letterContainer.appendChild(letterDiv);
        letterDiv.textContent=letters[i];
        letterDiv.setAttribute('class', 'letterDiv')
    }
}

// cette fonction identifie la lettre sélectionnée par l'utilisateur
function collectLetterInput() {
    for (let i = 0; i < letterDivs.length; i++) {
    letterDivs[i].addEventListener('click', function() {
        clickedLetter = this.textContent.toLowerCase();
        console.log("Clicked letter: " + clickedLetter);
        checkWord();
    });
}
}

            // MISE EN PLACE DU FONCTIONNEMENT

// Cet écouteur d'événement permet d'identifier l'entrée d'un nouveau mot à deviner. 
textSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    isNewWordSubmitted = true;
    // récupération du mot, transformation en chaines de "_" et d'espaces, puis affichage de cette chaine
    collectWord();
    // affichage des chances restantes
    displayAttempts();
    return isNewWordSubmitted = true;
});

// Je récupère le mot; je le transforme en chaine de "_" et d'espaces 
function collectWord() {
    inputText = inputField.value.toLowerCase().trim();

    if (isNewWordSubmitted && inputText !== "") {
        resetGame();

        for (let i = 0; i < inputText.length; i++) {
            if (inputText.charAt(i) !== " ") {
                result.push("_");
            } else {
                result.push(" ");
            }
        }
        // J'affiche la chaine 
        displayWord();
        // Je réinitialise le champ de saisie utilisateur 
        inputField.value = "";
    }
    // Je vérifie le mot
    checkWord();
}

// Jaffiche le mot dans la page HTML sous forme de "_ _ _ _"
function displayWord() {
    textToGuess.textContent = result.join('');
}

// Je compare chaque lettre sélectionnée par l'utilisateur avec les lettres présentes dans l'expression
function checkWord() {
    let correctGuess = false;
    for (let i = 0; i < inputText.length; i++) {
        if (clickedLetter === inputText.charAt(i)) {
            result[i] = clickedLetter;
            correctGuess = true;
        }
    }
    // J'enlève une vie si l'utilisateur se trompe
    if (isNewWordSubmitted == true  && correctGuess == false) {
        attemptsLeft--;
        displayAttempts();
    }

    displayWord();
    checkForVictory();
    declareDefeat();
}

// Je réinitalise le jeu 
function resetGame() {
    result = [];
    attemptsLeft = 5;
    isNewWordSubmitted = false;
}

// Je vérifie s'il y a victoire, càd si l'ensemble des lettres trouvées correspondent exactement à l'expression initialement saisie
function checkForVictory() {
    if (isNewWordSubmitted && result.join('') === inputText) {
        victoryInfo.textContent="You have won, O Galilean. "
        attemptsDisplay.style.display='none';
        isNewWordSubmitted=false;
    }else
    {
    attemptsDisplay.style.display='block'
    victoryInfo.textContent='';}
}

// J'annonce la défaite si l'utilisateur a épuisé toutes ses vies 

function declareDefeat(){
    if(attemptsLeft==0){
        attemptsDisplay.textContent="There are some defeats more triumphant than victories.".toUpperCase();
        textSubmit.removeEventListener();

        
    }
    else{return}
}

