var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start-quiz');


// Timer that counts down from 15
function countdown() {
    
  var timeLeft = 15;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1 ) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      
      // Decrement `timeLeft` by 1
      timeLeft--;
     
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    }
   
    else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      return window.location.assign("end.html")
    }

  }, 1000);
  
}
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the weight of 1 egg in grams?',
        choice1: '50',
        choice2: '150',
        choice3: '30',
        choice4: '100',
        answer: 1,


    },
    {
    question: 'How much protein does one egg contain?',
        choice1: '36 g',
        choice2: '20 g',
        choice3: '6 g',
        choice4: '100 g',
        answer: 3,
},
{
question: 'How much fat is in a single egg?',
        choice1: '50 g',
        choice2: '5 g',
        choice3: '30 g',
        choice4: '2 g',
        answer: 2,
},
{
    question: 'How many carbs is in a single egg?',
        choice1: '6 g',
        choice2: '10 g',
        choice3: '2.5 g',
        choice4: '0.6',
        answer: 4,
},
{
question: 'How many calories are in a single egg (50 g)',
        choice1: '78 cal',
        choice2: '150 cal',
        choice3: '30 cal',
        choice4: '100 cal',
        answer: 1,
}
]

const SCORE_POINTS =100
const MAX_QUESTIONS = 5

var startGame = ()=>{
    questionCounter =0
    score =0
    availableQuestions = [...questions]
    getNewQuestion()
}

var getNewQuestion= () =>{
    if(availableQuestions.lenght === 0 || questionCounter> MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }
questionCounter++
// progressText.innerText = 'Question' + question + 'of${MAX_QUESTIONS}' ;
// progressBarFull.style.witth = '${(questionCounter/Max_QUESTIONS)* 100}%';

const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions [questionsIndex];
question.innerText = currentQuestion.question;

choices.forEach(choice =>{
const number = choice.dataset ['number']
choice.innerText = currentQuestion ['choice'+number]
}
)
availableQuestions.splice(questionsIndex, 1);
acceptingAnswers = true;
}
choices.forEach(choice=>{
    choice.addEventListener('click', e=>{
    if(!acceptingAnswers) return;
    acceptingAnswers = false;


    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
    'incorrect'

    if(classToApply=== 'correct'){
        incrementScore(SCORE_POINTS)
    }
    selectedChoice.parentElement.classList.add(classToApply)
    setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
       

         
    }, 1000)
})
})
incrementScore = num =>{
  score+=num
  scoreText.innerText = score
}
countdown();
startGame();








