const start_btn = document.querySelector("#start_quiz");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    console.log("Button clicked");
    showQuetions(0); //calling showQestions function
    startTimer(60); //calling startTimer function
}

let timeresult = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;
let timewrong = 0
let timeans = 10;
let questions = [
    {
    numb: 1,
    question: "What is the abbreviation HTML?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hypothesis Themed Markup Language",
      "Hyper Textile Marking Language",
      "Horizontal Markup Language",
      "Hyper Text Markup Language"
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
    question: "What does CDN stand for?",
    answer: "Content Delivery Network",
    options: [
      "Canadian Distribution Network",
      "Content Delivery Network",
      "Common Delivery Node",
      "Creative Delivery Network",
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
      "Search Engine Optimization",
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
      "Upset of Experience",
    ]
  },
];

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        showResult(); //calling showResult function
        
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag  
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        timewrong = 1;
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    result_box.classList.add("activeResult"); //show result box
    quiz_box.classList.remove("activeQuiz"); 
    const scoreText = result_box.querySelector(".score_text");
    clearInterval(counter);
    console.log(timeresult);
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Your Score is ' + timeresult +'</span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>Your Score is ' + timeresult +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(timeans == 0){ // if user scored more than 1
        let scoreTag = '<span> Time Ran out :( you got a 0.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>Your Score is ' + timeresult +'</span>';
        scoreText.innerHTML = scoreTag;
    
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        console.log(timeans);
        timeresult = time;
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "End Time"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    console.log("Time Off: Auto selected correct answer.");
                    timeans = 0
                    showResult();
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
        if(timewrong == 1){
            if(time <= 10){
                time = 0;
            }
            else{
            time = time-10;
            timewrong = 0
            timeCount.textContent = time; 
            }
        }
    
}
}
