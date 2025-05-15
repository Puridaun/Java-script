
// Get html elements
const body = document.body;
const header = document.header
const questions = document.querySelectorAll('.quiz-subject');
const quizTitle = document.querySelector('.quiz-app-title');
const quizTitleH1 = document.querySelectorAll('.quiz-app-title h1');
const quizQuestionText = document.querySelector('.question-text');
const submitAnswer = document.querySelector('.submit-answer-btn');
const nextQuestion = document.querySelector('.next-question-btn');
let answers;
const questionOfMax = document.querySelector('.question-of-max');
const questionOfMaxSpan = document.querySelector('.question-of-max span');
const subtitleSugestion = document.querySelector('.subtitle-sugestion');
const noAnswerError = document.querySelector('.no-answer-error');
const selectedCategoryName = document.querySelectorAll('.selected-subject-name');
const selectedCategoryBox = document.querySelectorAll('.selected-subject');
const quizContainerRight = document.querySelector('.quiz-app-right-side');
const quizScoreContainer = document.querySelector('.show-score-container');
const quizScore = document.querySelector('.score');
const playAgainBtn = document.querySelector('.play-again-button')
const progressBar = document.querySelector('.progress-bar')
const progressContainer = document.querySelector('.progress-container')
const toggleTheme = document.querySelector('.theme-switcher')
const quizAppContainer = document.querySelector('.quiz-app-container')

// Variables
let numberOfQuestion = 0;
let answer = '';
let clickedAnswer = '';
let maxQuestions = 0;
let score = 0;

// Data from API
let quizQuestions = [];
let allAnswers = [];
let correctAnswers = [];

//Dark theme colors variable
let themeColor = 'var(--Grey-50)'

// 1. Select (click) category for quiz
// 2. Show quiz question and answers
// 3. Get clicked answer text
// 4. Compare clicked answer with correct answer
// 5. Submit answer and go to next one


const questionAndAnswers = async () => {

    try {
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
    } catch (error) {

        alert('An error occured. Please refresh page')
    }
};

questionAndAnswers();


const startQuiz = function () {

    if (questions[0].classList.contains('answer-div')) {

        return
    }


    // click on questions and get their innerText and show the question and answers 
    const category = this.querySelector('p').innerText;


    selectedCategoryName.forEach(element => {
        element.innerText = category
    })
    selectedCategoryBox[0].classList.remove('invisible')

    if (category === 'HTML') {

        selectedCategoryBox.forEach(element => {
            element.querySelector('img').setAttribute('src', './assests/html icon.svg')
        })
    }
    if (category === 'CSS') {

        selectedCategoryBox.forEach(element => {
            element.querySelector('img').setAttribute('src', './assests/css icon.svg')
        })
    }
    if (category === 'Javascript') {

        selectedCategoryBox.forEach(element => {
            element.querySelector('img').setAttribute('src', './assests/js icon.svg')
        })
    }
    if (category === 'Accesibility') {

        selectedCategoryBox.forEach(element => {
            element.querySelector('img').setAttribute('src', './assests/acces icon.svg')
        })
    }
    // Show the first question and answers 
    numberOfQuestion++;


    quizTitle.classList.add('hide');
    quizQuestionText.innerText = quizQuestions[numberOfQuestion - 1];

    quizQuestionText.classList.remove('hide');
    subtitleSugestion.classList.add('hide')
    questionOfMaxSpan.innerText = numberOfQuestion;
    questionOfMax.classList.remove('hide')

    questions.forEach(question => {
        question.querySelector('.subject-category img').classList.add('hide')
        question.querySelector('.subject-category label').classList.remove('hide')
    });

    randomize(allAnswers[numberOfQuestion - 1])

    for (let i = 0; i < 4; i++) {

        questions[i].querySelector('.subject-category p').innerText = allAnswers[numberOfQuestion - 1][i]
    };


    submitAnswer.classList.remove('hide');

    // add event listener for every answer (add a class at the start of quiz on every answer)

    questions.forEach(question => {
        question.classList.add('answer-div')
    })

    answers = document.querySelectorAll('.answer-div');
    console.log('create event listener')
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
        question.querySelector('label').style.backgroundColor = themeColor
    })

    clickedAnswer.querySelector(':scope > img:nth-of-type(2)').classList.add('hide')

    quizQuestionText.innerText = quizQuestions[numberOfQuestion];

    randomize(allAnswers[numberOfQuestion])

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

    progressContainer.classList.remove('hide');
    updateProgress()

    for (let i = 0; i < 4; i++) {
        if (questions[i].querySelector('.subject-category p').innerText === correctAnswers[numberOfQuestion - 1]) {

            questions[i].querySelector(':scope > img:nth-of-type(1)').classList.remove('hide')
        }
    }

    // Disable answers after click submit

    questions.forEach(question => {
        question.classList.add('disabled')
    })
    // clickedAnswer.classList.remove('disabled')

    submitAnswer.classList.add('hide')


    // check if Answer is correct and change css style

    if (clickedAnswer.querySelector('p').innerText === correctAnswers[numberOfQuestion - 1]) {

        clickedAnswer.style.border = '4px solid var(--Green-500)';
        clickedAnswer.querySelector('label').style.backgroundColor = 'var(--Green-500)';
        // clickedAnswer.querySelector(':scope > img').classList.remove('hide');
        score++

    } else {
        clickedAnswer.querySelector(':scope > img:nth-of-type(2)').classList.remove('hide')
        clickedAnswer.style.border = '4px solid red'
        clickedAnswer.querySelector('label').style.backgroundColor = 'red'
    }


    if (numberOfQuestion < maxQuestions) {

        nextQuestion.classList.remove('hide')

    } else {

        quizTitleH1[0].innerText = 'Quiz completed'
        quizTitleH1[1].innerText = 'You scored...'
        quizTitle.classList.remove('hide')
        questionOfMax.classList.add('hide')
        quizQuestionText.classList.add('hide')
        quizScoreContainer.classList.remove('hide')
        quizContainerRight.classList.add('hide')
        quizScore.innerText = score;
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

    console.log(numberOfQuestion)
    clickedAnswer.style.border = '4px solid var(--Purple-600)'
    clickedAnswer.querySelector('label').style.backgroundColor = 'var(--Purple-600)'
}


const playAgain = () => {

    selectedCategoryBox[0].classList.add('invisible')
    quizTitleH1[0].innerText = 'Welcome to the'
    quizTitleH1[1].innerText = 'Frontend Quiz!'
    quizTitle.classList.remove('hide')
    questionOfMax.classList.add('hide')
    quizQuestionText.classList.add('hide')
    quizContainerRight.classList.remove('hide')
    quizScoreContainer.classList.add('hide')
    score = 0;

    // Show categories

    progressContainer.classList.add('hide')
    subtitleSugestion.classList.remove('hide')
    questionOfMax.classList.add('hide')

    questions.forEach(question => {
        question.querySelector('.subject-category img').classList.remove('hide')
        question.querySelector('.subject-category label').classList.add('hide')
    });

    for (let i = 0; i < 4; i++) {

        questions[0].querySelector('.subject-category p').innerText = 'HTML'
        questions[1].querySelector('.subject-category p').innerText = 'CSS'
        questions[2].querySelector('.subject-category p').innerText = 'Javascript'
        questions[3].querySelector('.subject-category p').innerText = 'Accesibility'
    };

    questions.forEach(question => {
        question.style.border = 'none'
        question.querySelector('label').style.backgroundColor = 'var(--Blue-50)'
    })

    questions.forEach(question => {

        question.classList.remove('disabled')
        question.querySelector(':scope > img:nth-of-type(1)').classList.add('hide');
        question.querySelector(':scope > img:nth-of-type(2)').classList.add('hide');
    })



    numberOfQuestion = 0;
    questionOfMaxSpan.innerText = numberOfQuestion
    submitAnswer.classList.add('hide');

    console.log('delete event listener')
    answers.forEach(answer => {
        answer.removeEventListener('click', selectAnswer)
    })

    questions.forEach(question => {
        question.classList.remove('answer-div')
    })
}

const updateProgress = () => {

    const progressPercentage = (numberOfQuestion / maxQuestions) * 100
    progressBar.style.width = progressPercentage + '%';
}



function randomize(arr) {

    // Start from the last element and swap 
    // one by one. We don't need to run for 
    // the first element that's why i > 0 
    for (let i = arr.length - 1; i > 0; i--) {

        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));

        // Swap arr[i] with the element 
        // at random index 
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}


const toogleThemeColor = function () {
    if (this.checked) {

        body.style.backgroundColor = ' #3B4D66';
        quizAppContainer.classList.add('dark-theme')
        quizScoreContainer.classList.add('dark-theme')
        selectedCategoryBox[0].classList.add('dark-theme')
    } else {

        body.style.backgroundColor = '#EBF0FF';
        quizAppContainer.classList.remove('dark-theme')
        quizScoreContainer.classList.remove('dark-theme')
        selectedCategoryBox[0].classList.remove('dark-theme')
    }
}

questions.forEach(question => { question.addEventListener('click', startQuiz) })
nextQuestion.addEventListener('click', changeToNextQuestion)
submitAnswer.addEventListener('click', checkAnswer)
playAgainBtn.addEventListener('click', playAgain)
toggleTheme.addEventListener('click', toogleThemeColor)