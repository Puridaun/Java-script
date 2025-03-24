

// constants
const form = document.querySelector('.tip-calculator-form');
const percentButton = document.querySelectorAll('.percent-button');
const tipAmount = document.querySelector('.tip-amount-result');
const total = document.querySelector('.total-result');
const resetBtn = document.querySelector('.reset-button');
const billAmountErr = document.querySelector('.bill-amount-error');
const numOfPeopleErr = document.querySelector('.num-of-people-error');
const standardInputFirst = document.querySelector('.standard-input-first');
const standardInputSecond = document.querySelector('.standard-input-second');

let tip = 0;
let percentValue = 0;



// Funtions


const selectButton = (e) => {

    console.log('selectButton() accesat')
    console.log(e)

    const data = new FormData(form)
    const buttonPressed = e.submitter;



    percentButton.forEach(button => button.classList.remove('pressed-button'));
    buttonPressed.classList.add('pressed-button');

    // console.log(typeof (data.get('custom-percent')))

    if (data.get('custom-percent')) {

        percentValue = Number(data.get('custom-percent'));
        percentButton.forEach(button => button.classList.remove('pressed-button'));
        console.log("percentValueCustom is " + percentValue);
        document.querySelector('.custom-button').value = "";
        resetBtn.disabled = false;
        resetBtn.style.backgroundColor = 'var(--green-400)'
        return;

    };

    percentValue = Number(buttonPressed.innerText.slice(0, -1))
    resetBtn.disabled = false;
    resetBtn.style.backgroundColor = 'var(--green-400)'

}





const validateInput = () => {



    const data = new FormData(form)

    if (data.get('amount') <= 0) {
        billAmountErr.style.display = 'block';
        standardInputFirst.style.borderColor = '#E17052';
        return false;
    }

    if (data.get('number-of-people') <= 0) {
        billAmountErr.style.display = 'none';
        numOfPeopleErr.style.display = 'block';
        standardInputSecond.style.borderColor = '#E17052';
        standardInputFirst.style.borderColor = 'var(--grey-50)';
        return false;
    }

    standardInputSecond.style.borderColor = 'var(--grey-50)';
    numOfPeopleErr.style.display = 'none';
    return true;
}

const calculatorResults = (e) => {
    // console.log(e);

    if (validateInput()) {
        selectButton(e);
        const data = new FormData(form)

        const billAmount = Number(data.get('amount'));
        const numPeople = Number(data.get('number-of-people'));

        console.log(typeof (billAmount), typeof (percentValue))

        tip = billAmount * percentValue / 100;

        console.log("calculate tip is " + tip)

        const tipPerPerson = (tip / numPeople).toFixed(2);
        const totalPerPerson = ((billAmount + tip) / numPeople).toFixed(2);

        console.log('Tip per person:', tipPerPerson);
        console.log('Total per person:', totalPerPerson);

        showResults(tipPerPerson, totalPerPerson);
    }


}





const showResults = (tipValue, totalValue) => {
    tipAmount.innerText = `$${tipValue}`;
    total.innerText = `$${totalValue}`;
}



const reset = () => {
    form.reset();
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
    tip = 0;
    percentButton.forEach(button => button.classList.remove('pressed-button'));
    numOfPeopleErr.style.display = 'none';
    billAmountErr.style.display = 'none';

    resetBtn.style.backgroundColor = ''
    resetBtn.disabled = true;
}






// Events




form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculatorResults(e);

})

resetBtn.addEventListener('click', reset)