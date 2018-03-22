//Variables =====================
var qPointer = 1; //points to the number of the current question
var QPointer = "q" + qPointer; //points to the full name of the question
var guess = ""; //answer choice the user clicks
var score = 0; //total number of correct guess by the user
var intervalID //holds the interval for the run function
var timer = 10 //seconds left on the timer

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

//Functions =====================
function guessChecker(){
    if (guess === quiz[QPointer].correctLetter){
        $("#question").text("Yes!");
        $("#choiceA").text("");
        $("#choiceB").text("");
        $("#choiceC").text("");
        $("#choiceD").text("");
        score++
        qPointer++;
        QPointer = "q" + qPointer;
        loadNext();
    }
    else{
        $("#question").text("Nope.");
        $("#choiceA").text("The correct answer was: " + quiz[QPointer].correctAns);
        $("#choiceB").text("");
        $("#choiceC").text("");
        $("#choiceD").text("");
        qPointer++;
        QPointer = "q" + qPointer;
        loadNext();
    }
};

function loadNext(){  //brings up the next question in the quiz object
    var questionStr = quiz[QPointer].question;

    $("#question").text(questionStr);
    $("#choiceA").text("A. " + quiz[QPointer].ansA);
    $("#choiceB").text("B. " + quiz[QPointer].ansB);
    $("#choiceC").text("C. " + quiz[QPointer].ansC);
    $("#choiceD").text("D. " + quiz[QPointer].ansD);

    run();    
};

function run(){  //starts the countdown, continues every second
    clearInterval(intervalID);
    intervalID = setInterval(decrement, 1000);
};

function decrement(){ //keeps the time and prints out remaining time to the page
    timer--;
    $(".timer").text("Time Left: " + timer);

    if (timer === 0){
        $("#question").text("Time's up!");
        $("#choiceA").text("The correct answer was: " + quiz[QPointer].correctAns);
        $("#choiceB").text("");
        $("#choiceC").text("");
        $("#choiceD").text("");
        stop();
    }
}

function stop(){
    clearInterval(intervalID);
};

//Main Process ==================

//Page initializes with first question chosen from question array
loadNext();

//Timer gives user 30 seconds to answer question 

//After 30 seconds OR user clicks an answer, score will be recorded
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

//Correct answer will display a Yay! screen

//Wrong answer will display a -_- screen and let the user know the correct answer

//New question will display after 5 seconds

//End of questions, final score will be shown to user