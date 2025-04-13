// ---------------HTML ELEMENTS
const confirmBtn = document.querySelector(".confirm-button");
const cardHolderName = document.querySelector(".owner-name");
const cardNumber = document.querySelector(".card-16-digit-number");
const cardExpireDate = document.querySelector(".card-expire-date");
const cardCvc = document.querySelector(".back-side-cvc-number");

// ---------------HTML INPUTS
const cardNameInput = document.querySelector('.card-name-input')
const cardNumberInput = document.querySelector('.card-number-input')
const cardMonthInput = document.querySelector('.card-month-input')
const cardYearInput = document.querySelector('.card-year-input')
const cardCvcInput = document.querySelector('.card-cvc-input')



// -------------------Variables
let card = [];



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

    console.log(inputValue, outputValue)

    cardNumberInput.value = outputValue;
}


const areInputsValid = () => {
    let numberOfErr = 0;

    if (cardNameInput.value === "") {
        numberOfErr++
    }

    if (cardNumberInput.value === "") {
        numberOfErr++
    }

    console.log(Number(cardNumberInput.value))

    if (isNaN(Number(cardNumberInput.value))) {
        console.log("good")
    }


    if (cardMonthInput.value === "") {
        numberOfErr++
    }

    if (cardYearInput.value === "") {
        numberOfErr++
    }

    if (cardCvcInput.value === "") {
        numberOfErr++
    }

    if (numberOfErr > 0) {
        return false
    }

    return true
}


//--------------Actions
confirmBtn.addEventListener("click", getInputsValue)

cardNumberInput.addEventListener("input", handleCardNumberInput)