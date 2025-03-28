

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
let billTip = 0;

let tipPerPerson = 0;
let totalPerPerson = 0;

// ---------------History variables -----------------
const historyTable = document.querySelector('.history-table');

//Date
const today = new Date;
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const history = [];



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


    billTip = Number(buttonPressed.innerText.slice(0, -1))
    resetBtn.disabled = false;
    resetBtn.classList.remove('reset-button-disabled');
    resetBtn.classList.add('reset-button-enabled');
}

const handleCustomInput = () => {

    if (validateInput()) {

        resetBtn.classList.remove('reset-button-disabled');
        resetBtn.classList.add('reset-button-enabled');
        resetBtn.disabled = false;
        billTip = customInput.value;
        calculateTipAndTotal();
        showResults(tipPerPerson, totalPerPerson);
        return;
    }

    customInput.value = "";
    customInput.readOnly = true;
}

const selectCustomInput = () => {


    if (validateInput()) {

        customInput.readOnly = false;
        percentButton.forEach(button => button.classList.remove('pressed-button'));
        customInput.addEventListener('blur', handleCustomInput);
    }
}

const calculateTipAndTotal = () => {

    const data = new FormData(form);
    const billAmount = Number(data.get('amount'));
    const numPeople = Number(data.get('number-of-people'));

    tip = billAmount * billTip / 100;
    tipPerPerson = (tip / numPeople).toFixed(2);
    totalPerPerson = ((billAmount + tip) / numPeople).toFixed(2);

    addBillToHistory(billAmount, numPeople);

    history.push({
        id: rowId,
        bill: billAmount,
        billTip: billTip,
        numberOfPeople: numPeople,
    });
    rowId++
    console.log(history);
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


const calculatorsResults = (e) => {

    e.preventDefault();

    if (validateInput()) {

        selectButton(e);
        calculateTipAndTotal();
        showResults(tipPerPerson, totalPerPerson);
    }
}


// --- Events ---


form.addEventListener('submit', (e) => {

    calculatorsResults(e);
})

customInput.addEventListener('click', selectCustomInput)

resetBtn.addEventListener('click', reset)


// ---------------History script -----------------


const tableBody = document.querySelector('.table-body');
let rowId = 0
const addBillToHistory = (billAmount, numPeople) => {

    const historyBillElement = document.createElement('tr')
    historyBillElement.id = rowId
    historyBillElement.innerHTML = `      
              <td>${billAmount}</td>
              <td>${billTip} %</td>
              <td>${numPeople}</td>
              <td>Date</td>
              <td>
                <button class="delete-button">
                    <img src="./assets/Delete.svg" />
                </button>
              </td>
              <td><img src="./assets/Delete.svg" /></td> `;

    tableBody.appendChild(historyBillElement);

    const deleteButton = historyBillElement.querySelector('.delete-button')

    const handleDeleteHistoryElement = () => {
        const index = history.findIndex(item => item.id === Number(historyBillElement.id))

        if (index !== -1) {
            history.splice(index, 1);
            console.log('updatedHistory ', history);
        }

        tableBody.removeChild(historyBillElement);
    }

    deleteButton.addEventListener('click', handleDeleteHistoryElement);


};