

// ------- Variables ---------

const form = document.querySelector('.tip-calculator-form');
const percentButton = document.querySelectorAll('.percent-button');
const tipAmount = document.querySelector('.tip-amount-result');
const total = document.querySelector('.total-result');
const resetBtn = document.querySelector('.reset-button');
const billAmountErr = document.querySelector('.bill-amount-error');
const numOfPeopleErr = document.querySelector('.num-of-people-error');
const standardInputFirst = document.querySelector('.standard-input-first');
const standardInputSecond = document.querySelector('.standard-input-second');
const customInput = document.querySelector('.custom-button');


let tip = 0;
let percentValue = 0;

let tipPerPerson = 0;
let totalPerPerson = 0;

// ---------------History variables -----------------

const noBillValue = document.querySelector('.no-bill-value');
const historyTip = document.querySelector('.tip-value');
const dateValue = document.querySelector('.date-value');

const today = new Date;
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();





// ------ Functions -------------------------------

const validateInput = () => {

    const data = new FormData(form)

    if (data.get('amount') <= 0) {

        percentButton.forEach(button => button.classList.remove('pressed-button'));
        billAmountErr.style.display = 'block';
        standardInputFirst.style.borderColor = '#E17052';
        customInput.value = "";
        return false;
    }

    if (data.get('number-of-people') <= 0) {

        percentButton.forEach(button => button.classList.remove('pressed-button'));
        billAmountErr.style.display = 'none';
        numOfPeopleErr.style.display = 'block';
        standardInputSecond.style.borderColor = '#E17052';
        standardInputFirst.style.borderColor = 'var(--grey-50)';
        customInput.value = "";
        return false;
    }

    standardInputFirst.style.borderColor = 'var(--grey-50)';
    standardInputSecond.style.borderColor = 'var(--grey-50)';
    numOfPeopleErr.style.display = 'none';
    billAmountErr.style.display = 'none';
    return true;
}

const selectButton = (e) => {

    customInput.value = "";
    customInput.readOnly = true;
    const buttonPressed = e.submitter;

    percentButton.forEach(button => button.classList.remove('pressed-button'));
    buttonPressed.classList.add('pressed-button');


    percentValue = Number(buttonPressed.innerText.slice(0, -1))
    resetBtn.disabled = false;
    resetBtn.classList.remove('reset-button-disabled');
    resetBtn.classList.add('reset-button-enabled');
}

const handleCustomInput = () => {

    resetBtn.classList.remove('reset-button-disabled');
    resetBtn.classList.add('reset-button-enabled');
    resetBtn.disabled = false;
    percentButton.forEach(button => button.classList.remove('pressed-button'));
    percentValue = customInput.value;
    calculateTipAndTotal();
    showResults(tipPerPerson, totalPerPerson);
}

const selectCustomInput = () => {

    if (validateInput()) {

        customInput.readOnly = false;
        customInput.addEventListener('input', handleCustomInput);
    }
}

const calculateTipAndTotal = () => {

    const data = new FormData(form);
    const billAmount = Number(data.get('amount'));
    const numPeople = Number(data.get('number-of-people'));

    tip = billAmount * percentValue / 100;
    tipPerPerson = (tip / numPeople).toFixed(2);
    totalPerPerson = ((billAmount + tip) / numPeople).toFixed(2);
}


const calculatorsResults = (e) => {

    e.preventDefault();

    if (validateInput()) {

        selectButton(e);
        calculateTipAndTotal();
        showResults(tipPerPerson, totalPerPerson);
    }
}





const showResults = (tipValue, totalValue) => {
    tipAmount.innerText = `$${tipValue}`;
    total.innerText = `$${totalValue}`;

    historyTip.innerText = percentValue;

}

const reset = () => {
    console.log('test');
    form.reset();
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
    tip = 0;
    customInput.value = "";
    percentButton.forEach(button => button.classList.remove('pressed-button'));

    numOfPeopleErr.style.display = 'none';
    billAmountErr.style.display = 'none';


    resetBtn.classList.remove('reset-button-enabled');
    resetBtn.classList.add('reset-button-disabled');
    resetBtn.style.backgroundColor = '';
    standardInputFirst.style.borderColor = 'var(--grey-50)';
    standardInputSecond.style.borderColor = 'var(--grey-50)';
    resetBtn.disabled = true;
}

// --- Events ---


form.addEventListener('submit', (e) => {

    calculatorsResults(e);

})

customInput.addEventListener('click', selectCustomInput)

resetBtn.addEventListener('click', reset)


// ---------------History script -----------------


dateValue.innerText = day + "." + month + "." + year;
