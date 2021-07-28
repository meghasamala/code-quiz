var countdown = document.querySelector("#countdown")
var startBtn = document.querySelector("#start-btn")

// GIVEN I am taking a code quiz
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
]
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
var totalTime = 76
startBtn.addEventListener("click", function() {
    setInterval(function() {
        totalTime--
        countdown.textContent = totalTime
    }, 1000)
})
    


// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score