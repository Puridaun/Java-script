

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
const historyTable = document.querySelector('.history-table');


const today = new Date;
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
let numberOfBill = 0;
let rowId = 0;
const historyArray = [];

const rowsHistory = {
    billNumber: "",
    tipProcent: "",
    numberOfPeople: "",
    actualDate: day + "." + month + "." + year,
    buttonOne: 0,
    buttonTwo: 0,
};




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

    if (validateInput()) {

        resetBtn.classList.remove('reset-button-disabled');
        resetBtn.classList.add('reset-button-enabled');
        resetBtn.disabled = false;
        percentValue = customInput.value;
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

    rowsHistory.numberOfPeople = numPeople;

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

    rowsHistory.billNumber = numberOfBill;
    rowsHistory.tipProcent = percentValue;
    updateBillHistory();
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

// --- Events ---


form.addEventListener('submit', (e) => {

    calculatorsResults(e);
})

customInput.addEventListener('click', selectCustomInput)

resetBtn.addEventListener('click', reset)


// ---------------History script -----------------

let numberOfHistoryButton = 0;


const createDeleteAndEditBtn = (row) => {


    const td1 = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';

    const td2 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';

    td1.appendChild(deleteBtn);
    td2.appendChild(editBtn);

    row.appendChild(td1);
    row.appendChild(td2);

    deleteBtn.id = numberOfHistoryButton;
    editBtn.id = numberOfHistoryButton;
    deleteBtn.type = 'button';
    editBtn.type = 'button';

    deleteBtn.addEventListener('click', (e) => {
        const rowToDelete = e.target.closest('tr');  // Find the <tr> to delete
        const billNumber = Number(rowToDelete.children[0].innerText); // Get billNumber from first <td>
        console.log(rowToDelete.children[0])
        // Find the correct index in historyArray
        const index = historyArray.findIndex(item => item.billNumber === billNumber);

        if (index !== -1) {
            historyArray.splice(index, 1); // Remove from historyArray
        }

        rowToDelete.remove();  // Remove the row from the DOM
        console.log(historyArray);  // Log the updated history array
    });

    rowsHistory.buttonOne = numberOfHistoryButton;
    rowsHistory.buttonTwo = numberOfHistoryButton;
    numberOfHistoryButton++;

}

const createHistoryItems = (row) => {

    const td1 = document.createElement('td');
    td1.innerText = rowsHistory.billNumber;

    const td2 = document.createElement('td');
    td2.innerText = rowsHistory.tipProcent + ' %';

    const td3 = document.createElement('td');
    td3.innerText = rowsHistory.numberOfPeople;

    const td4 = document.createElement('td');
    td4.innerText = rowsHistory.actualDate;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
}


const updateBillHistory = () => {

    numberOfBill++;

    const tr = document.createElement('tr');
    tr.id = rowId;
    rowId++;
    historyTable.appendChild(tr);
    const tableRows = document.querySelectorAll('table tr');

    createHistoryItems(tableRows[tableRows.length - 1]);
    createDeleteAndEditBtn(tableRows[tableRows.length - 1]);

    const rowHistory = { ...rowsHistory };
    historyArray.push(rowHistory);



}

