const rateBtn = document.querySelectorAll('.rate')
const submitBtn = document.querySelector('.submit-btn')
const interactiveContainer = document.querySelector('.interactive-rating-container')
const thankYouContainer = document.querySelector('.thank-you-container')
const showRate = document.querySelector('.rate-value')
let rateValue = 0;
let pressed = false

const handleRateBtn = (e) => {
    const pressedBtn = e.target
    rateBtn.forEach(button => {
        button.classList.remove('rate-button-pressed');
    });
    pressedBtn.classList.add('rate-button-pressed')

    rateValue = pressedBtn.innerText

    pressed = true
}


const handleSubmitBtn = () => {

    if (pressed) {
        rateBtn.forEach(button => {
            button.classList.remove('rate-button-pressed');
        });

        showRate.innerText = rateValue

        interactiveContainer.classList.add('hide')
        thankYouContainer.classList.remove('hide')
    }
}





rateBtn.forEach(button => button.addEventListener('click', handleRateBtn));
submitBtn.addEventListener('click', handleSubmitBtn)