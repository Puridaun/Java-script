
// Get html elements
const questions = document.querySelectorAll('.quiz-subject');
const quizTitle = document.querySelector('.quiz-app-title');
const quizQuestionText = document.querySelector('.question-text');
const submitAnswer = document.querySelector('.submit-answer-btn');
const nextQuestion = document.querySelector('.next-question-btn');
let answers
const questionOfMax = document.querySelector('.question-of-max')
const questionOfMaxSpan = document.querySelector('.question-of-max span')
const subtitleSugestion = document.querySelector('.subtitle-sugestion')
const noAnswerError = document.querySelector('.no-answer-error')
const selectedCategoryName = document.querySelector('.selected-subject-name')
const selectedCategoryBox = document.querySelector('.selected-subject')


// Variables
let numberOfQuestion = 0;
let answer = ''
let clickedAnswer = ''
let maxQuestions = 0;

// Data from API
let quizQuestions = []
let allAnswers = []
let correctAnswers = []



// 1. Select (click) category for quiz
// 2. Show quiz question and answers
// 3. Get clicked answer text
// 4. Compare clicked answer with correct answer
// 5. Submit answer and go to next one


const questionAndAnswers = async () => {

    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple')
    const data = await response.json()

    for (let i = 0; i < data.results.length; i++) {

        quizQuestions.push(data.results[i].question)
        const correctAnswer = data.results[i].correct_answer
        const incorrectAnswers = data.results[i].incorrect_answers
        allAnswers.push([correctAnswer, ...incorrectAnswers].sort(() => Math.random()));

        correctAnswers.push(data.results[i].correct_answer)
    }

    maxQuestions = data.results.length
};

questionAndAnswers();


const startQuiz = function () {

    if (questions[0].classList.contains('answer-div')) {
        return
    }
    // click on questions and get their innerText and show the question and answers 
    const category = this.querySelector('p').innerText;

    selectedCategoryName.innerText = category;
    selectedCategoryBox.classList.remove('invisible')

    if (category === 'HTML') {
        selectedCategoryBox.querySelector('img').setAttribute('src', './assests/html icon.svg')
    }
    if (category === 'CSS') {
        selectedCategoryBox.querySelector('img').setAttribute('src', './assests/css icon.svg')
    }
    if (category === 'Javascript') {
        selectedCategoryBox.querySelector('img').setAttribute('src', './assests/js icon.svg')
    }
    if (category === 'Accesibility') {
        selectedCategoryBox.querySelector('img').setAttribute('src', './assests/acces icon.svg')
    }
    // Show the first question and answers 

    quizTitle.classList.add('hide');
    quizQuestionText.innerText = quizQuestions[numberOfQuestion];
    quizQuestionText.classList.remove('hide');
    subtitleSugestion.classList.add('hide')
    questionOfMax.classList.remove('hide')

    questions.forEach(question => {
        question.querySelector('.subject-category img').classList.add('hide')
        question.querySelector('.subject-category label').classList.remove('hide')
    });

    for (let i = 0; i < 4; i++) {

        questions[i].querySelector('.subject-category p').innerText = allAnswers[numberOfQuestion][i]
    };
    numberOfQuestion++;
    submitAnswer.classList.remove('hide');
    // add event listener for every answer (add a class at the start of quiz on every answer)

    questions.forEach(question => {
        question.classList.add('answer-div')
    })

    answers = document.querySelectorAll('.answer-div');
    answers.forEach(answer => {
        answer.addEventListener('click', selectAnswer)
    })
    // run the function only one time to start the quiz
};

const changeToNextQuestion = () => {


    nextQuestion.classList.add('hide')
    submitAnswer.classList.remove('hide')



    // After 2s change the question and the answers 



    questions.forEach(question => {
        question.style.border = 'none'
        question.querySelector('label').style.backgroundColor = 'var(--Blue-50)'
    })

    clickedAnswer.querySelector(':scope > img').classList.add('hide')

    quizQuestionText.innerText = quizQuestions[numberOfQuestion];

    for (let i = 0; i < 4; i++) {

        questions[i].querySelector('.subject-category p').innerText = allAnswers[numberOfQuestion][i]
    }
    numberOfQuestion++
    questions.forEach(question => {
        question.classList.remove('disabled')
    })

    questionOfMaxSpan.innerText = numberOfQuestion
    submitAnswer.classList.remove('disabled')

    clickedAnswer = ''

    questions.forEach(question => {
        question.querySelector(':scope > img').classList.add('hide')
    })

}

const checkAnswer = () => {



    if (clickedAnswer === '') {
        noAnswerError.classList.remove('hide')
        return
    }



    for (let i = 0; i < 4; i++) {
        if (questions[i].querySelector('.subject-category p').innerText === correctAnswers[numberOfQuestion - 1]) {
            questions[i].querySelector(':scope > img').classList.remove('hide')
        }
    }

    // Disable answers after click submit

    questions.forEach(question => {
        question.classList.add('disabled')
    })
    clickedAnswer.classList.remove('disabled')

    // submitAnswer.classList.add('disabled')
    submitAnswer.classList.add('hide')


    // check if Answer is correct and change css style

    if (clickedAnswer.querySelector('p').innerText === correctAnswers[numberOfQuestion - 1]) {
        clickedAnswer.style.border = '4px solid var(--Green-500)'
        clickedAnswer.querySelector('label').style.backgroundColor = 'var(--Green-500)'
        clickedAnswer.querySelector(':scope > img').classList.remove('hide')
    } else {
        clickedAnswer.style.border = '4px solid var(--Orange-400)'
        clickedAnswer.querySelector('label').style.backgroundColor = 'var(--Orange-400)'
    }


    if (numberOfQuestion < maxQuestions) {
        nextQuestion.classList.remove('hide')

    } else {

        quizTitle.classList.remove('hide')
        questionOfMax.classList.add('hide')
        quizQuestionText.classList.add('hide')
        return
    }

}

const selectAnswer = function () {

    noAnswerError.classList.add('hide')
    clickedAnswer = this

    questions.forEach(question => {
        question.style.border = 'none'
        question.querySelector('label').style.backgroundColor = 'var(--Blue-50)'
    })

    clickedAnswer.style.border = '4px solid var(--Purple-600)'
    clickedAnswer.querySelector('label').style.backgroundColor = 'var(--Purple-600)'
}






questions.forEach(question => { question.addEventListener('click', startQuiz) })
nextQuestion.addEventListener('click', changeToNextQuestion)
submitAnswer.addEventListener('click', checkAnswer)

