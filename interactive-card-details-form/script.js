// ---------------HTML ELEMENTS
const confirmBtn = document.querySelector(".confirm-button");
const cardHolderName = document.querySelector(".owner-name");
const cardNumber = document.querySelector(".card-16-digit-number");
const cardExpireDate = document.querySelector(".card-expire-date");
const cardCvc = document.querySelector(".back-side-cvc-number");
const afterConfirmButton = document.querySelector(".card-after-confirm-button");
const formToConfirm = document.querySelector(".card-form");
const continueButton = document.querySelector('.continue-button')

// ---------------HTML INPUTS
const cardNameInput = document.querySelector('.card-name-input')
const cardNumberInput = document.querySelector('.card-number-input')
const cardMonthInput = document.querySelector('.card-month-input')
const cardYearInput = document.querySelector('.card-year-input')
const cardCvcInput = document.querySelector('.card-cvc-input')

// --------------HTLM LABELS
const cardNameErr = document.querySelector('.name-error')
const cardNumberFormatErr = document.querySelector('.number-format-label-error')
const cardNumberEmptyErr = document.querySelector('.number-empty-label-error')
const expDateLabelErr = document.querySelector('.exp-date-error')
const dateFormatErrOne = document.querySelector('.date-format-error1')
const dateFormatErrTwo = document.querySelector('.date-format-error2')
const cardCvcErr = document.querySelector('.cvc-label-error')
const cardCvcFormatErr = document.querySelector('.format-cvc-label-error')

// -------------------Variables
let card = [];
const forbiddenChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '!', '@', '.', '#', '$', '%', '&']



// ------------------Functions


const changeCardInfo = () => {
    cardHolderName.innerHTML = card[0].name;
    cardNumber.innerHTML = card[0].number;
    cardExpireDate.innerHTML = card[0].expireMonth + "/" + card[0].expireYear;
    cardCvc.innerHTML = card[0].cvc
}



const getInputsValue = (e) => {

    e.preventDefault();

    if (areInputsValid() === false) {

        return
    }

    const form = document.querySelector("form");
    const data = new FormData(form);

    card.push({
        name: data.get("name"),
        number: (data.get("card-number")),
        expireMonth: (data.get("card-expire-month")),
        expireYear: (data.get("card-expire-year")),
        cvc: (data.get("card-CVC")),
    })


    changeCardInfo()

    afterConfirmButton.classList.remove('hide')
    formToConfirm.classList.add('hide')


};



const handleCardNumberInput = () => {

    const inputValue = cardNumberInput.value.replaceAll(" ", "").split("");
    let outputValue = "";


    for (i = 0; i < inputValue.length; i++) {

        outputValue += inputValue[i];

        if (i === 3 || i === 7 || i === 11) {

            outputValue += " "
        }
    }

    cardNumberInput.value = outputValue;
}

const backToResetForm = () => {

    afterConfirmButton.classList.add('hide')
    formToConfirm.classList.remove('hide')

    formToConfirm.reset();

    cardHolderName.innerHTML = "JANE APPLESEED";
    cardNumber.innerHTML = "0000 0000 0000 0000";
    cardExpireDate.innerHTML = "00/00";
    cardCvc.innerHTML = "000"

}

const checkValueOfMonthInput = () => {

    const inputValue = cardMonthInput.value;

    console.log(inputValue)
    if (inputValue.length === 2 && inputValue < 13) {

        cardYearInput.focus()
    }

    if (inputValue > 0 && inputValue < 10 && inputValue.length < 2) {

        cardMonthInput.value = "0" + inputValue
    }

    if (inputValue < 13 && inputValue > 9) {

        cardMonthInput.value = Number(inputValue)
        cardYearInput.focus()
    }

    if (inputValue > 13) {

        return cardMonthInput.value = ""
    }
}

const checkValueOfYearInput = () => {

    const inputValue = cardYearInput.value;
    let passValue = 0

    if (inputValue.length === 4 || inputValue.length < 4) {
        if (inputValue < 2026) {

            expDateLabelErr.innerText = 'Year expired';
            expDateLabelErr.classList.remove('hide')
            return

        }
        passValue++
    }

    if (inputValue.length === 4) {
        if (inputValue > 2045) {

            expDateLabelErr.innerText = 'Year too high';
            expDateLabelErr.classList.remove('hide')
            return

        }
        passValue++
    }

    if (inputValue.length > 4) {

        return cardYearInput.value = ""
    }

    if (inputValue.length === 4 && passValue > 0) {

        cardYearInput.value = inputValue % 100

        expDateLabelErr.classList.add('hide')
        cardCvcInput.focus()
    }


}


const checkNameFormat = () => {

    const name = cardNameInput.value.split('');

    for (i = 0; i < name.length; i++) {
        if (forbiddenChar.includes(name[i])) {

            cardNameErr.innerText = "Wrong format, only letters"
            cardNameErr.classList.remove('hide')
            return cardNameInput.value = ""
        }
    }

    cardNameErr.classList.add('hide')
}

const areInputsValid = () => {

    let numberOfErr = 0;
    cardNameErr.innerText = "This field is required"
    expDateLabelErr.innerText = "Can't be blank"

    if (cardNameInput.value === "") {

        // Label
        cardNameErr.classList.remove('hide')
        // Input
        cardNameInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label
        cardNameErr.classList.add('hide')
        // Input
        cardNameInput.classList.remove('input-error')
    }

    // Card Number input-------------------------------

    if (cardNumberInput.value === "") {

        // Label error
        cardNumberFormatErr.classList.add('hide')
        cardNumberEmptyErr.classList.remove('hide')

        // Input error
        cardNumberInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label 
        cardNumberEmptyErr.classList.add('hide')
        // Input error
        cardNumberInput.classList.remove('input-error')
    }

    const cardNumberNoSpaces = cardNumberInput.value.replaceAll(" ", '');

    if (isNaN(Number(cardNumberNoSpaces))) {

        // Label error
        cardNumberEmptyErr.classList.add('hide')
        cardNumberFormatErr.classList.remove('hide')
        // Input error
        cardNumberInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label 
        cardNumberFormatErr.classList.add('hide')
        // Input error

    }

    if (cardNumberNoSpaces.length !== 16 && cardNumberNoSpaces.length > 0) {

        // Label error
        cardNumberFormatErr.innerText = "Too short, must contain 16 digits";
        cardNumberFormatErr.classList.remove('hide')
        // Input error
        cardNumberInput.classList.add('input-error')
    } else {
        // Label error
        cardNumberFormatErr.innerText = "Wrong format, only numbers";
        cardNumberFormatErr.classList.add('hide')
        // Input error
        cardNumberInput.classList.remove('input-error')
    }

    // Month input-------------------------------

    if (cardMonthInput.value === "") {

        // Label error
        expDateLabelErr.classList.remove('hide')
        // Input error
        cardMonthInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label error
        expDateLabelErr.classList.add('hide')
        // Input error
        cardMonthInput.classList.remove('input-error')
    }

    // Year input-------------------------------

    if (cardYearInput.value === "") {

        // Label error
        expDateLabelErr.classList.remove('hide')
        // Input error
        cardYearInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Input error
        cardYearInput.classList.remove('input-error')
    }



    // CVC input-------------------------------

    if (cardCvcInput.value === "") {

        // Label error
        cardCvcErr.classList.remove('hide')
        // Input error
        cardCvcInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label
        cardCvcErr.classList.add('hide')
        // Input error
        cardCvcInput.classList.remove('input-error')
    }

    if (cardCvcInput.value.length !== 3 && cardCvcInput.value !== "") {

        // Label error
        cardCvcErr.classList.add('hide')
        cardCvcFormatErr.classList.remove('hide')
        // Input error
        cardCvcInput.classList.add('input-error')
        numberOfErr++
    } else {

        // Label error
        cardCvcFormatErr.classList.add('hide')
    }

    if (numberOfErr > 0) {
        return false
    }


    return true
}


//--------------Actions
confirmBtn.addEventListener("click", getInputsValue)

cardNumberInput.addEventListener("input", handleCardNumberInput)

continueButton.addEventListener('click', backToResetForm)

cardMonthInput.addEventListener('input', checkValueOfMonthInput)

cardYearInput.addEventListener('input', checkValueOfYearInput)

cardNameInput.addEventListener('input', checkNameFormat)