// Declare variables and Constants.
const start_btn = document.querySelector("#start_quiz");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart = document.querySelector(".restart");
const result_save = document.querySelector(".result_save");
const save_box = document.querySelector(".save_box");
const save_window = document.getElementById("#save_window");
const return_highscore = document.querySelector(".return");
const highscore_box = document.querySelector(".highscore_box");
const highscore_btn = document.querySelector("#high_score");
const username =document.getElementById('username');
const save_score_btn = document.getElementById('save_score_btn');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const clear_score = document.querySelector(".clear_highscore");
const highscore_list = document.getElementById("highscore_list");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const max_retain = 10;
const timer_init = 59;
let time = 0;
let delay = 0;
let timeresult = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;
let timewrong = 0
let timeans = 1;

// On Click (Start) make quiz window active
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    next_btn.classList.remove("show");
    showQuetions(0); 
    startTimer(timer_init); 
    delay = 0;
}

// Clear highscore on clear score click
clear_score.onclick =() =>{
    highscore_list.innerHTML = "";   
    localStorage.clear();
    highScores.length = 0;
    return;
}

//Opens Highscore List and displays list from localStorage
highscore_btn.onclick = ()=>{
    console.log("Button clicked");
    highscore_box.classList.add("activeScore");
    let delay = 0
    highscore_list.innerHTML = highScores.map (score => {
        return `<li class="high-score">${score.name}-${score.score}</li>`;
    })
    .join("");
    return_highscore.onclick = ()=>{
        highscore_box.classList.remove("activeScore");
    }
    //Closes active window when clicked outside
    window.onclick = function(event) {
        if (!event.target.closest("#highscore_window") && delay > 0) { 
        highscore_box.classList.remove("activeScore");
        }else { 
            delay =+ 1; 
        }    
    }
}

// Restart button resets variables.
restart.onclick = ()=>{
    console.log("Button clicked");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    timeans = 1;
    timewrong = 0;
    clearInterval(counter);
    result_box.classList.remove("activeResult"); 
    
}

//Opens save window and displays current score.
result_save.onclick = ()=>{
    result_box.classList.remove("activeResult"); 
    save_box.classList.add("activeSave");
    restart_check = 0;
    let delay = 0 //Add delay to prevent window from closing prematurely
    const scoreText_rtn = document.querySelector(".score_text_rtn");
    scoreText_rtn.innerHTML = timeresult;
    window.onclick = function(event) {
        if (!event.target.closest("#save_window") && delay > 0) { 
        save_box.classList.remove("activeSave");
        }else { 
            delay =+ 1; 
        } 
    }
}


// Disables save button if no input is entered
username.addEventListener('keyup', () => {
    save_score_btn.disabled = !username.value;
});

//Saves score and resets variables.
saveHighScore = (event) => {
    event.preventDefault();
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    timeans = 1;
    timewrong = 0;
    clearInterval(counter);
    const score = {
    score: timeresult,
    name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(max_retain);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(highScores);
    save_box.classList.remove("activeSave");
} 

// Clicking next triggers question variable to add and remove active next button.
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuetions(que_count); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        showResult(); 
        
    }
}

// Function shows questions by retrieving array of questions.
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    const option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Determines if user choice is correct or incorrect and determines next event
function optionSelected(answer){
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
    }else{
        answer.classList.add("incorrect"); 
        timewrong = 1; 
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

//Check for result if time ran out or user gets to end.
function showResult(){
    result_box.classList.add("activeResult");
    quiz_box.classList.remove("activeQuiz"); 
    const scoreText = document.querySelector(".score_text");
    localStorage.setItem("recentScore", timeresult);
    clearInterval(counter);
    timeCount.textContent = 60;
    if(timeans == 0){
        let scoreTag = '<span> Time Ran out :( you got a 0.</span>';
        scoreText.innerHTML = scoreTag; 
    }
    else{ 
        let scoreTag = '<span>Your Score is ' + timeresult +'!</span>';
        scoreText.innerHTML = scoreTag; 
    }
}

// Starts timer function
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        console.log(time);
        timeresult = time;
        if(time <= 0){ 
            clearInterval(counter);
            timeresult = 0;
            timeText.textContent = "End Time"; 
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    console.log("Time Off: Auto selected correct answer.");
                    timeans = 0 
                    showResult();
                    timeCount.textContent = timer_init;
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show"); 
        }
        // if time was marked wrong time would get minus 10.
        if(timewrong == 1){
            if(time <= 10){
                time = 0;
            }
            else{
            time -= 10;
            timewrong = 0
            timeCount.textContent = time; 
            }
        }
    
    }
}
// Question array
let questions = [
{
    numb: 1,
    question: "What does CDN stand for?",
    answer: "Content Delivery Network",
    options: [
        "Canadian Distribution Network",
        "Content Delivery Network",
        "Common Delivery Node",
        "Creative Delivery Network"
    ]
},
    {
    numb: 2,
    question: "What is a common list type in HTML",
    answer: "Unordered List",
    options: [
        "Unordered List",
        "Grocery List",
        "Computer Part List",
        "Bucket List"
    ]
},
    {
    numb: 3,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    options: [
        "Compass Sheeting Style",
        "Cascade Standard Styles",
        "Cascading Style Sheets",
        "Creating Style Sheets"
    ]
},
    {
    numb: 4,
    question: "What is the standard end file extension for JavaScript?",
    answer: ".js",
    options: [
        ".jjs",
        ".jsx",
        ".js",
        ".java"
    ]
},
    {
    numb: 5,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
        "Structured Query Language",
        "Sequenced Quality Language",
        "Semantic Quality Language",
        "Squared Quality Language"
    ]
},
    {
    numb: 6,
    question: "What does API stand for?",
    answer: "Application Programming Interface",
    options: [
        "Approximate Present Information",
        "Application Property Information",
        "Artificial Proponent Indicator",
        "Application Programming Interface"
    ]
},
    {
    numb: 7,
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    options: [
        "Document Object Model",
        "Detailed Operations Model",
        "Directed Object Model",
        "Dominant Object Model"
    ]
},
    {
    numb: 8,
    question: "The abbreviation HTML stands for?",
    answer: "Hyper Text Markup Language",
    options: [
        "Hypothesis Transfer Markup Language",
        "Hyper Text Markup Language",
        "Haptic Text Markup Language",
        "Hyper Technical Material Language",
    ]
},
    {
    numb: 9,
    question: "What does SEO stand for?",
    answer: "Search Engine Optimization",
    options: [
        "Standard Entity Optimization",
        "Search Entity Optimization",
        "Saved Engine Optimization",
        "Search Engine Optimization"
    ]
},
    {
    numb: 10,
    question: "What does UX stand for?",
    answer: "User Experience",
    options: [
        "User Experience",
        "University Crossing",
        "Untitled Extreme",
        "Upset of Experience"
        ]
}];