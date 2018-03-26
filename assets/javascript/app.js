//Variables =====================
var qPointer = 1; //points to the number of the current question
var QPointer = "q" + qPointer; //points to the full name of the question
var guess = ""; //answer choice the user clicks
var score = 0; //total number of correct guess by the user
var intervalID; //holds the interval for the questions
var timer = 30; //seconds left on the question timer

var quiz = {
    q1: {
        question: "What was Walt Disney's first feature length film?",
        ansA: "Snow White and the Seven Dwarves",
        ansB: "Cinderella",
        ansC: "Pinocchio",
        ansD: "Dumbo",
        correctLetter: "A",
        correctAns: "Snow White and the Seven Dwarves",
    },

    q2: {
        question: "Which iconic Disney Princess sings the song 'How Far I'll Go'?",
        ansA: "Tiana",
        ansB: "Moana",
        ansC: "Elsa",
        ansD: "Aurora",
        correctLetter: "B",
        correctAns: "Moana",
    },

    q3: {
        question: "In what fictional city does the movie Big Hero 6 take place?",
        ansA: "Robotopolis",
        ansB: "Arendell",
        ansC: "San Fransokyo",
        ansD: "It's never mentioned in the movie",
        correctLetter: "C",
        correctAns: "San Fransokyo",
    },

    q4: {
        question: "Which Disney movie is based off of the Shakespeare play 'Hamlet'?",
        ansA: "The Aristocats",
        ansB: "The Lion King",
        ansC: "The Sword in the Stone",
        ansD: "Brother Bear",
        correctLetter: "B",
        correctAns: "The Lion King",
    },

    q5: {
        question: "In the Disney Pixar movie 'The Incredibles,' why is the Parr family undercover?",
        ansA: "An evil mastermind is after them",
        ansB: "They have to complete their missions anonymously",
        ansC: "They would be kidnapped by Mirage and experimented on",
        ansD: "The world has turned its back on superheroes",
        correctLetter: "D",
        correctAns: "The world has turned its back on superheroes",
    },

    q6: {
        question: "Which of these animal sidekicks can NOT talk?",
        ansA: "Flounder from The Little Mermaid",
        ansB: "Mushu form Mulan",
        ansC: "Maximus from Tangled",
        ansD: "Ray from The Princess and the Frog",
        correctLetter: "C",
        correctAns: "Maximus from Tangled",
    },

    q7: {
        question: "In the movie 'Lilo and Stitch,' what endangered creature does Pleekly think he has found on Earth?",
        ansA: "Mosquitos",
        ansB: "Sharks",
        ansC: "Feral Cats",
        ansD: "Vampires",
        correctLetter: "A",
        correctAns: "Mosquitos",
    },

    q8: {
        question: "What are the names of Hades' henchmen in the movie 'Hercules'?",
        ansA: "Fire and Fury",
        ansB: "Cerberus and Hydron",
        ansC: "Pain and Panic",
        ansD: "Flotsam and Jetsam",
        correctLetter: "C",
        correctAns: "Pain and Panic",
    },

    q9: {
        question: "Which movie(s) has the running joke of a character being incredibly joyous about media coverage despite always being covered up by a logo?",
        ansA: "Zootopia",
        ansB: "Home on the Range",
        ansC: "The Toy Story series",
        ansD: "Monster's Inc.",
        correctLetter: "D",
        correctAns: "Monster's Inc.",
    },

    q10: {
        question: "What Disney movie features the song 'I Wanna Be Like You'?",
        ansA: "The Emperor's New Groove",
        ansB: "The Jungle Book",
        ansC: "Lady and the Tramp",
        ansD: "Tarzan",
        correctLetter: "B",
        correctAns: "The Jungle Book",
    }
};

var objArray = Object.keys(quiz); //puts object properties into an array
var quizLen = objArray.length; //length of array (aka number of questions in quiz)

//Functions =====================
function guessChecker(){  //Checks for right or wrong answers
    if (guess === quiz[QPointer].correctLetter){ //correct guess will display yes! screen
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
                </div>
                <br>
                <div id="question">Yes!</div>
            `
        );
        score++
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
    else{ //wrong guess will display the correct answer
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">Nope.</div>
            <br>
            <div class="answers">
                <div class="result">The correct answer was: ${quiz[QPointer].correctAns}</div>
            </div>
            `
        );
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
};

function loadNext(){  //brings up the next question in the quiz object
    var questionStr = quiz[QPointer].question;
    stop();
    $(".questionArea").empty();
    $(".questionArea").html(
        `
        <div class="timer">
            Time Left:
        </div>
        <br>
        <div id="question">${questionStr}</div>
        <br>
        <div class="answers">
            <div class="answer" id="choiceA">A. ${quiz[QPointer].ansA}</div>
            <div class="answer" id="choiceB">B. ${quiz[QPointer].ansB}</div>
            <div class="answer" id="choiceC">C. ${quiz[QPointer].ansC}</div>
            <div class="answer" id="choiceD">D. ${quiz[QPointer].ansD}</div>
        </div>
        `
    );

    //click events store which answer the user guesses and checks to see if it's right
    $("#choiceA").click(function(){
        guess = "A";
        guessChecker();
    });
    $("#choiceB").click(function(){
        guess = "B";
        guessChecker();
    });
    $("#choiceC").click(function(){
        guess = "C";
        guessChecker();
    });
    $("#choiceD").click(function(){
        guess = "D";
        guessChecker();
    });

    run();    
};

function run(){  //resets the countdown to 30, starts counting down every second
    clearInterval(intervalID);
    timer = 30;
    intervalID = setInterval(decrement, 1000);
};

function decrement(){ //keeps the time and prints out remaining time to the page
    timer--;
    $(".timer").text("Time Left: " + timer);

    if (timer === 0){ //if timer reaches 0, time's up! will display before loading the next question
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">Time's up!</div>
            <br>
            <div class="answers">
                <div class="result">The correct answer was: ${quiz[QPointer].correctAns}</div>
            </div>
            `
        );
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
}

function endCheck(){ //checks to see if the last question has been reached
    if (qPointer>quizLen){ //if all the questions have been displayed, final score is shown
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">You answered all the questions!</div>
            <br>
            <div class="answers">
                <div class="result">Score: ${score}/10</div>
            </div>
            `
        );
    } else{ //if there are questions left, the next question is loaded
        setTimeout(loadNext, 3000);
    }
}

function stop(){ //clears the interval
    clearInterval(intervalID);
};

//Main Process ==================
//Page initializes with first question chosen from question object
$(".questionArea").html(
    `
    <button class="start">Start</button>
    `
);
$(".start").click(function(){
    loadNext();
});
