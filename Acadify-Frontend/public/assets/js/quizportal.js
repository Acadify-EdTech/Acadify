const progressBar = document.querySelector('.progress-bar'),
progressText = document.querySelector('.progress-text');

    const progress= (value) =>{
        const percentage = (value/time)*100;
        progressBar.style.width = `${percentage}%`;
        progressText.innerHTML = `${value}`;
    }

let questions=[],
time =30;
score = 0;
currentQuestion,
timer;

const startBtn = document.querySelector(".start"),
    numQuestions = document.querySelector("#num-questions"),
    container = document.querySelector("#category"),
    difficulty = document.querySelector("#difficulty"),
    timePerQuestion = document.querySelector("#time"),
    quiz = document.querySelector(".quiz"),
    startscreen = document.querySelector(".start-screen");

const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;


    const url=`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
    .then((res) => res.json())
    .then(data => {
    questions = data.results;
    startscreen.classList.add('hide');
    quiz.classList.remove('show');
    currentQuestion=1
    showQuestion(questions[0]);
    });
};

startBtn.addEventListener('click', startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector('.question'),
    answerWrapper = document.querySelector('.answer-wrapper'),
    questionNumber = document.querySelector('.number');
questionText.innerHTML = question.question;


const answers = {
    ...question.incorrect_answers,
    correct: question.correct_answer,
};
answers.sort(() => Math.random() - 0.5);
answersWrapper.innerHTML = '';
answers.forEach((answer) => {
    answerWrapper.innerHTML += `
    <div class="answer correct">
                    <span class="text">${answer}</span>
                    <span class="checkbox">
                        <span class="icon">✓</span>
                    </span>
                </div>
    `;
});

questionNumber.innerHTML = `
Question <span class="current>${questions.indexOf(question) +1}</span>
<span class="total">/${questions.length}</span>
`;
};