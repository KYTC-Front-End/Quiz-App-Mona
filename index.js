// quiz Questions
const quizQuestions=[
    {
        question : "Which tag is used to list items with bullets?",
        a :" <bullet> ... <bullet/>",
        b : "<list> ... <list/> ",
        c : "<ol> ... <ol/>",
        d  : "<ul> ... <ul/> ",
        correct : "d",  
    },
    {
        question : "DNS translates __________",
        a  :"  the domain name as IP address",
        b : " IP address as a domain name ",
        c : "Both A and B are true.",
        d : " the domain name as physical address (MAC)",
        correct : "a", 
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question : "How to define a link that should open in a new page in HTML?",
        a  :"<a href = “https://stackhowto.com” target = “blank”>Click Here</a>",
        b : "<a href = “https://stackhowto.com” target =“_blank”>Click Here</a> ",
        c : "<a href = “https://stackhowto.com” target = “#blank”>Click Here</a>",
        d: "<a href = “https://stackhowto.com” target = “@blank”>Click Here</a> ",
        correct : "b", 
    },
    {
        question : " How to define a background image for a web page?",
        a  :" <body background = “test.jpg”>",
        b : "<body background image = “test.jpg”> ",
        c : " <background = “test.jpg”>",
        d  : "<background image = “test.jpg”>",
        correct : "a", 
    },
    {
        question : "The first page of a website is called _____.",
        a :"  Design page",
        b: " Home page",
        c: " Front page",
        d: "Main page",
        correct : "b", 
    },
    {
        question : "The Head tag is used for?",
        a :" Writing CSS styles",
        b  : " Writing Javascript",
        c : "Including CSS and JS files",
        d : " All the answers are true ",
        correct : "d", 
    },
    {
        question : "By default, links are displayed with an underline. How can you remove the underline from all links using CSS code?",
        a :" a {text: no-underline;}",
        b : "a {text-decoration:none;}",
        c  : "a {text-style: no-underline;}",
        d : "a {text-decoration: no-underline;} ",
        correct : "b", 
    },
    {
        question : "Which of the following selectors selects the checkboxes that is checked or enabled?",
        a  :"  E ~ F",
        b  : "::after",
        c  : ":checked",
        d  : " None of the above",
        correct : "c", 
    },
    {
        question : "Links can be styled with any CSS property. This a {text-decoration:none;} removes the underline from all links.",
        a  :" Body:color=black",
        b : "{body;color:black}",
        c : "{body:color=black(body}",
        d: "Body {color: Black}",
        correct:"d", 
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "javascript",
        correct: "d",
    },
    {
        question: "How We Specify Document Type Of HTML5 Page",
        a: "<DOCTYPE html>",
        b: "<DOCTYPE html5>",
        c: "<!DOCTYPE html5>",
        d: "<!DOCTYPE html>",
        correct: "d"
      },
];

//Definition
const hero=document.getElementById('hero');
const userNameInput=document.getElementById('fname');
const required=document.getElementById('required');
const startQuiz=document.getElementById('startQuiz'); // start button
const leaderBtn=document.getElementById('Leaderbtn'); // start button
const quiz= document.getElementById('quiz');
const counter = document.getElementById('counter');
const timeText = document.querySelector(".question-header .time_left_txt");
const timeCount = document.querySelector(".time_left_txt .timer_sec");
const questionId=document.getElementById('question');
const inputs =document.querySelectorAll('.answer'); 
const txt_a=document.getElementById('txt_a');
const txt_b=document.getElementById('txt_b');
const txt_c=document.getElementById('txt_c');
const txt_d=document.getElementById('txt_d');
const submitBtn=document.getElementById('submit');
const leaderboard = document.getElementById('leaderboard');

// start Quiz 
startQuiz.addEventListener('click' , (event)=>{
    event.preventDefault();
    let userName= userNameInput.value;
    if(userName === ""){
        required.textContent="* Enter Your Name";
    }
    else{
        required.textContent='';
        quiz.style.display ='flex';
        hero.style.display='none';
       
        }
});


let currentQustions= 0;
let score =0 ;
// random questions
const questionCounter=[];
while(questionCounter.length < 10){
 const questionIndex = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
 if(!questionCounter.includes(questionIndex)) {
    questionCounter.push(questionIndex);
    }
}
// start game
startGame();
function startGame() {
    uncheckedAnswer();
    const currentQuestionData = questionCounter[currentQustions];
    questionId.innerText= currentQuestionData.question;
    txt_a.innerText =currentQuestionData.a;
    txt_b.innerText =currentQuestionData.b;
    txt_c.innerText =currentQuestionData.c;
    txt_d.innerText =currentQuestionData.d;
    if(currentQustions == 9){
        submitBtn.textContent ="Submit";
    }
}
// uncheckedAnswer status
function uncheckedAnswer() {
    inputs.forEach(inputs => (inputs.checked = false));
}

// chicked answers and submit
function  checkedAnswer() {
    let answer;
    inputs.forEach(inputs => {
        if (inputs.checked){
            answer =inputs.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click' , () => {
    const answer =checkedAnswer();
    if (answer){
        if (answer === questionCounter[currentQustions].correct){
            score++; 
        }
        currentQustions++;

        counter.textContent=`${currentQustions + 1}/10`;
        if (currentQustions < questionCounter.length){
            startGame();
            // startTimer(timeValue);

        } 
        else {
            resultScore(userNameInput.value, score);       
            hero.style.display ='none';
            quiz.style.display='none';
            leaderboard.style.display ="flex";
            leaderboardtable();
            
        }
    }
});


//resulte score
function  resultScore(username , score ){
    localStorage.setItem('data' ,JSON.stringify(quizQuestions));
    localStorage.setItem('questions' ,JSON.stringify(questionCounter));
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (!leaderboard){
        leaderboard =[];
    }
    const outUser =leaderboard.find((enterr) => enterr.username === username);
    if (outUser){
        outUser.score = score ;
    } else {
        leaderboard.push({ username, score});
    }
    localStorage.setItem('leaderboard' , JSON.stringify(leaderboard));
}

leaderBtn.addEventListener('click' , ()=>{
    hero.style.display ='none';
    quiz.style.display='none';
    leaderboard.style.display ="flex";
    leaderboardtable();
})


function leaderboardtable(){
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    const leaderBoardBody = document.getElementById('leaderboard-body');
    if(leaderboard && leaderboard.length > 0 ) {
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.forEach((enterr) => {
            const row = document.createElement('tr');
            const user = document.createElement('td');
            const resultt = document.createElement('td');

            user.textContent = enterr.username;
            resultt.textContent =enterr.score;
            row.appendChild(user);
            row.appendChild(resultt);
            leaderBoardBody.appendChild(row);
        });
    }
    
}

//   