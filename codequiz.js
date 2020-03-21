
// Qustions / Answers that will pop up when you click the button. // 
const quizQuestions = [
    {
        question: "What do CSS stand for?",
        answers: {
            A: "Cascading Style Sheet",
            B: "Create Style Sheet",
            C: "Common Style Sheet",
            D: "Code System Sheet"
        },
        correctAnswer: "A",
    },
    {
        question: "Who maintains Javascript?",
        answers: {
            A: "World Wide Web Consortium",
            B: "Google",
            C: "Microsoft",
            D: "Apple"
        },
        correctAnswer: "A",
    },
    {
        question: "What is the correct way to make a function in javascipt?",
        answers: {
            A: "function() name{}",
            B: "function name(){}",
            C: "function name{}()",
            D: "name() function{}"
        },
        correctAnswer: "B",
    },
    {
        question: "What does NaN stand for?",
        answers: {
            A: "Negative answer Notation",
            B: "New asyncronous Number",
            C: "Not a Number",
            D: "Next amount Now"
        },
        correctAnswer: "C",
    },
];
const timeAmount = 80000;
const quizQuestionContainer = document.getElementById("question");
const quizAnswersContainer = document.getElementById("answers");
const answerResultContainer = document.getElementById("result");
const nextSetButton = document.getElementById("next");
const timerElem = document.getElementById("timer");


var questionSetCounter = 0;
var answerCounter = 0;
var answerElementCount = 0;

var highscores = [];
var score = 0;
var time = 30;

function startTimer() {

    var counter = setInterval(timer, 1000);

    function timer() {
        time = time - 1;
        if (time <= 0) {
            clearInterval(counter);
            
            return;
        }

        timerElem.innerHTML = time;

    }
}

function chosenAnswer() {
    var answer = document.getElementById(event.srcElement.id);


    answerArray = answer.innerHTML.split('');

    if (answerArray[0] === quizQuestions[questionSetCounter - 1].correctAnswer) {
        answerResultContainer.innerHTML = "Correct!";
        score += 5;
    } else {
        answerResultContainer.innerHTML = "Wrong!";
    }
    getNextQuestionSet();
}


function answerButton(letter, answer) {
    var btn = document.createElement("BUTTON");
    btn.type = "button";
    btn.id = `chosen${answerCounter}`;
    btn.onclick = chosenAnswer;
    btn.class = "btn btn-primary";
    btn.innerHTML = `${letter}: ${answer}`;

    answerCounter++;
    return btn;
}


function getNextQuestionSet() {
    var answerSet = [];


    while (quizAnswersContainer.firstChild) {
        quizAnswersContainer.removeChild(quizAnswersContainer.firstChild);
    }

    if (time !== 0 && questionSetCounter < quizQuestions.length) {
        if (nextSetButton) {
            nextSetButton.remove();
        }


        for (answer in quizQuestions[questionSetCounter].answers) {
            answerSet.push(
                answerButton(answer, quizQuestions[questionSetCounter].answers[answer])
            )
        }

        quizQuestionContainer.innerHTML = quizQuestions[questionSetCounter].question;

        for (var i = 0; i < answerSet.length; i++) {
            quizAnswersContainer.appendChild(answerSet[i]);
        }

        questionSetCounter++;
    } else {
        showResults();
    }

}

function showResults() {
    var inputElem = document.createElement("INPUT");
    inputElem.setAttribute("type", "text");
    inputElem.id = "initials";

    var submitBtn = document.createElement("BUTTON");
    submitBtn.type = "button";
    submitBtn.id = "submit";
    submitBtn.onclick = submitScore;
    submitBtn.class = "btn btn-primary";
    submitBtn.innerHTML = "Submit";

    answerResultContainer.innerHTML = '';
    quizQuestionContainer.innerHTML = `Your score is ${score}!`;
    quizAnswersContainer.innerHTML = "Initials: ";
    quizAnswersContainer.appendChild(inputElem);
    quizAnswersContainer.appendChild(submitBtn);
}

function submitScore() {
    var userInitial = document.getElementById("initials").value;
    highscores.push(
        {
            Initials: userInitial,
            Score: score,
        }
    )

    highscoresPage();
}

function highscoresPage() {

    while (quizAnswersContainer.firstChild) {
        quizAnswersContainer.removeChild(quizAnswersContainer.firstChild);
    }

    var title = document.getElementById("title");
    var listScores = "";
    title.innerHTML = "Highscores";

    for (var i = 0; i < highscores.length; i++) {

        listScores = listScores + `${highscores[i].Initials}: ${highscores[i].Score} </br>`;
    }

    quizQuestionContainer.innerHTML = listScores;

}

nextSetButton.addEventListener('click', () => {
    startTimer();
    getNextQuestionSet();
});