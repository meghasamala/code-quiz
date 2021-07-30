var countdown = document.querySelector("#countdown")
var startBtn = document.querySelector("#start-btn")
var questionNum = 0
var intro = document.querySelector("#initial-div")
var quizQuestions = document.querySelector("#questions-div")
var quizEnd = document.querySelector("#final-score-div")
var quizScores = document.querySelector("#saved-scores")
var questionDisplay = document.querySelector("#question")
var ans0 = document.querySelector("#ans0")
var ans1 = document.querySelector("#ans1")
var ans2 = document.querySelector("#ans2")
var ans3 = document.querySelector("#ans3")
var ansBtn = document.querySelectorAll(".ans")
var finalScore = document.querySelector("#final-score")
var initials = document.querySelector("#initials")
var submitBtn = document.querySelector("#submit")
var scoresArray = []
var scoresList = document.querySelector("#scores-list")
var clearBtn = document.querySelector("#clear-scores")
var backBtn = document.querySelector("#go-back")
var btn = document.querySelectorAll(".btn")
var content = document.querySelector("#content")
var scoreBtn = document.querySelector("#view-high-scores")

// GIVEN I am taking a code quiz
var setUp = function() {
    quizQuestions.style.display = "none"
    quizEnd.style.display = "none"
    quizScores.style.display = "none"
    intro.style.display = "block"
    questionNum = 0
    totalTime = 76
    countdown.textContent = "0"
    initials.value = ""
}

var quiz = [
    { question: "Commonly used data types do NOT include:",
      choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts"
    },
    { question: "The condition in an if/else statement is enclosed within _______.",
      choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
      answer: "3. parentheses"
    },
    { question: "Arrays in Javascript can be used to store _______.",
      choices: ["1. numbers and strings", "2. booleans", "3. other arrays", "4. all of the above"],
      answer: "4. all of the above"
    },
    { question: "String values must be enclosed within _______ when being assigned to variables.",
      choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes"
    },
    { question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
      answer: "4. console.log"
    }   
];
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
var totalTime = 76 
var startTimer = function() {
    var interval = setInterval(function() {
        totalTime--
        countdown.textContent = totalTime
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
        if (totalTime <= 0 || questionNum >= quiz.length) {
            clearInterval(interval)
            gameOver()   
        }
    }, 1000);
};

var makeQuestion = function() {
    intro.style.display = "none"
    quizQuestions.style.display = "block"
    if (questionNum < quiz.length) {
        questionDisplay.textContent = quiz[questionNum].question
        ans0.textContent = quiz[questionNum].choices[0]
        ans1.textContent = quiz[questionNum].choices[1]
        ans2.textContent = quiz[questionNum].choices[2]
        ans3.textContent = quiz[questionNum].choices[3]
    }
    else {
        gameOver()
    }
};

// WHEN I answer a question
// THEN I am presented with another question
ansBtn.forEach(element => {
    element.addEventListener("click", function(event) {

//ansBtn.addEventListener("click", function(event) {
//var nextQuestion = function(event) {
    var answerChoice = event.target;

    var lineBreak = document.createElement("hr")
    lineBreak.setAttribute("id", "hr")
    var evaluateAns = document.createElement("p")
    evaluateAns.setAttribute("id", "evaluateAns")

    if (answerChoice.textContent == quiz[questionNum].answer) {
        evaluateAns.textContent = "Correct!";
        questionNum++
    }
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
    else {
        totalTime = totalTime - 10
        evaluateAns.textContent = "Wrong!";
        questionNum++
    } 
    content.appendChild(lineBreak)
    content.appendChild(evaluateAns)

    setTimeout(function() {
        lineBreak.remove()
        evaluateAns.remove()
    }, 1000)

    makeQuestion()
    })
});

// WHEN the game is over
// THEN I can save my initials and score

var gameOver = function() {
    intro.style.display = "none"
    quizQuestions.style.display = "none"
    quizScores.style.display = "none"
    quizEnd.style.display = "block"
    finalScore.textContent = totalTime
};

var saveScores = function() {
    var scoresObject = {
        id: initials.value,
        score: finalScore.textContent
    } 
    scoresArray = localStorage.getItem("scores")
    if (scoresArray === null) {
        scoresArray = []
    }
    else {
        scoresArray = JSON.parse(scoresArray)
    }
    scoresArray.push(scoresObject)
    localStorage.setItem("scores", JSON.stringify(scoresArray))

    scoresList.innerHTML = ""

    loadScores()
}

var loadScores = function() {
    intro.style.display = "none"
    quizQuestions.style.display = "none"
    quizScores.style.display = "block"
    quizEnd.style.display = "none"
    scoresArray = localStorage.getItem("scores")
    scoresArray = JSON.parse(scoresArray)
    if (scoresArray !== null) {
        for (var i = 0; i < scoresArray.length; i++) {
            var scoreEl = document.createElement("li")
            scoreEl.innerHTML = scoresArray[i].id + " - " + scoresArray[i].score
            scoresList.appendChild(scoreEl)
        }
    }
}

clearBtn.addEventListener("click", function() {
    localStorage.clear()
    scoresList.innerHTML = ""
})

backBtn.addEventListener("click", function() {
    setUp()
})

submitBtn.addEventListener("click", function() {
    saveScores()
})

scoreBtn.addEventListener("click", function() {
    intro.style.display = "none"
    quizQuestions.style.display = "none"
    quizScores.style.display = "block"
    quizEnd.style.display = "none"
    scoresList.innerHTML = ""

    loadScores()
})

setUp();
startBtn.addEventListener("click", function() {
    startTimer()
    makeQuestion()
});
// ans0.addEventListener("click", nextQuestion());
// ans1.addEventListener("click", nextQuestion());
// ans2.addEventListener("click", nextQuestion());
// ans3.addEventListener("click", nextQuestion());
    
