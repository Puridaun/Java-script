

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
const accessHistoryBtn = document.querySelector('.access-history-btn')
const statsBtn = document.querySelector('.access-stats-btn')
const editHistory = document.querySelector('.edit-history-section')
const calculatorSection = document.querySelector('.tip-calculator-section')
const billStatistics = document.querySelector('.bill-statistics')

let numberOfErr = 0;

let tip = 0;
let billTip = 0;

let tipPerPerson = 0;
let totalPerPerson = 0;

// ---------------History variables -----------------
const historySection = document.querySelector('.bills-tip-history');
const historyTable = document.querySelector('.history-table');

let hideElement = true;

//Date
const today = new Date;
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const history = [];



// ------ Functions -------------------------------
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


const validateInput = () => {

    numberOfErr = 0;
    const data = new FormData(form)

    if (data.get('amount') <= 0) {

        billAmountErr.style.display = 'block';
        standardInputFirst.style.borderColor = '#E17052';
        customInput.value = "";
        numberOfErr++;
    } else {
        billAmountErr.style.display = 'none';
        standardInputFirst.style.borderColor = 'var(--grey-50)';
    }

    if (data.get('number-of-people') <= 0) {

        numOfPeopleErr.style.display = 'block';
        standardInputSecond.style.borderColor = '#E17052';
        customInput.value = "";
        numberOfErr++;
    } else {
        numOfPeopleErr.style.display = 'none';
        standardInputSecond.style.borderColor = 'var(--grey-50)';
    }

    if (numberOfErr > 0) {
        percentButton.forEach(button => button.classList.remove('pressed-button'));
        console.log(numberOfErr)
        return false;
    }

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
        customInput.addEventListener('change', handleCustomInput);
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
    updateStatistics();
}


const showResults = (tipValue, totalValue) => {

    tipAmount.innerText = `$${tipValue}`;
    total.innerText = `$${totalValue}`;

    if (hideElement) {

        accessHistoryBtn.classList.remove('hide-element');
        statsBtn.classList.remove('hide-element');
    }
}


const calculatorsResults = (e) => {

    console.log('is valid ', validateInput())
    e.preventDefault();

    if (validateInput()) {

        selectButton(e);
        calculateTipAndTotal();
        showResults(tipPerPerson, totalPerPerson);
    }
}


// -------------------- Events -------------------


form.addEventListener('submit', (e) => {

    calculatorsResults(e);
})

customInput.addEventListener('click', selectCustomInput)

resetBtn.addEventListener('click', reset)



// ---------------History script -----------------

const tableBody = document.querySelector('.table-body');
let rowId = 0;

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
              <td><button class="edit-button">
                    <img src="./assets/edit-text.svg" />
                </button></td> `;

    tableBody.appendChild(historyBillElement);
    const deleteButton = historyBillElement.querySelector('.delete-button')
    const editButton = historyBillElement.querySelector('.edit-button')


    const handleDeleteHistoryElement = () => {

        const index = history.findIndex(item => item.id === Number(historyBillElement.id))
        if (index !== -1) {

            history.splice(index, 1);
            console.log('updatedHistory ', history); //Debugging

            if (history.length === 0) {

                accessHistoryBtn.classList.add('hide-element');

                historySection.classList.add('hide-element');
            }


        }

        tableBody.removeChild(historyBillElement);
        updateStatistics();
    }

    // --------------------------EDIT HISTORY script -----------------------------

    const handleEditHistoryElement = () => {
        const editBill = document.querySelector('.edit-bill')
        const tipEditInput = document.querySelector('.tip-edit-input')
        const editNumberOfPeople = document.querySelector('.edit-number-of-people')

        const index = history.findIndex(item => item.id === Number(historyBillElement.id))
        console.log(history[index].bill)
        editBill.value = history[index].bill
        tipEditInput.value = history[index].billTip
        editNumberOfPeople.value = history[index].numberOfPeople

        calculatorSection.classList.add('hide-element')
        editHistory.classList.remove('hide-element')


    }

    deleteButton.addEventListener('click', handleDeleteHistoryElement);
    editButton.addEventListener('click', handleEditHistoryElement);
};

const showHistory = () => {

    percentButton.forEach(button => button.classList.remove('pressed-button'));
    historySection.classList.toggle('hide-element')
}

accessHistoryBtn.addEventListener('click', showHistory)




// -----------------------Statisctics script

const showStatistics = () => {

    percentButton.forEach(button => button.classList.remove('pressed-button'));
    billStatistics.classList.toggle('hide-element')
}

statsBtn.addEventListener('click', showStatistics)


const updateStatistics = () => {

    let billSum = 0;
    let tipSum = 0;
    let max = 0

    for (i = 0; i < history.length; i++) {

        billSum += history[i].bill;
        tipSum += history[i].billTip;

        if (history[i].bill > max) {
            max = history[i].bill;
        }
    }



    const averageBill = (billSum / history.length).toFixed(2)
    const averageTip = (tipSum / history.length).toFixed(2)

    const averageBillValue = document.querySelector('.average-bill-value')
    const averageTipValue = document.querySelector('.average-tip-value')
    const mostExpensive = document.querySelector('.most-expensive-value')

    averageBillValue.innerText = averageBill + " $";
    averageTipValue.innerText = averageTip + " %";
    mostExpensive.innerText = max;
}