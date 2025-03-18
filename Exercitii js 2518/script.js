// 3.5 JS in Browser
// DOM - Document Object Model

// Regula: fiecare element selectat il bagam intr-o constanta
// !IMPORTANT! cand selectorul nu este bun => constanta o sa fie egala cu null
const colors = ["#AD636C", "#009B72", "#6761AB", "#347E8D", "#798186"];
//                  0          1           2         3          4
const sectionContainer = document.querySelector(".color-switcher-container");
const switchColorButton = document.querySelector(
    ".click-me-button"
);
const colorHexcode = document.querySelector('.color-hexcode');
const showClickCount = document.querySelector('.show-click-count');
const resetButton = document.querySelector('.reset-button');
const showUsedColors = document.querySelector('.show-used-colors');
const changeColorButtons = document.querySelector('.change-color-buttons')
let previousButton = null;
let nextButton = null;
console.log(previousButton)


// variables

let clickCounter = 0
// 1) #AD636C
// 2) #009B72
// 3) #6761AB
// 4) #347E8D
// 5) #798186


let index = 1;
let indexValue = [1];

let usedColorsArray = [];

let isCreated = false;
// functions

const switchColor = () => {

    usedColorsArray = ['#AD636C']
    switchColorButton.style.display = 'none';
    createNextAndPreviousButtons(isCreated);
    clickCounter++
    showClickCount.innerHTML = clickCounter;

    console.log("start functie index", index);


};



const resetAll = () => {

    switchColorButton.style.display = '';

    if (clickCounter === 0) {
        alert('Nothing to reset')
        return;
    }
    clickCounter = 0
    index = 1;
    indexValue = [1];
    sectionContainer.style.backgroundColor = colors[0];
    colorHexcode.style.color = colors[0];
    colorHexcode.innerHTML = colors[0];
    showClickCount.innerHTML = clickCounter;
    usedColorsArray = [];


    removePreviousButton();


}


const createNextAndPreviousButtons = () => {
    console.log(isCreated)
    if (isCreated) return;

    // Create Previous Button
    previousButton = document.createElement('button');
    previousButton.classList.add('previous-button', 'switch-color-buttons');
    previousButton.innerHTML = 'PREVIOUS';
    changeColorButtons.appendChild(previousButton);
    // Create NEXT Button
    nextButton = document.createElement('button');
    nextButton.classList.add('next-button', 'switch-color-buttons');
    nextButton.innerHTML = 'NEXT';
    changeColorButtons.appendChild(nextButton);


    isCreated = true;
    console.log(isCreated)


    setTimeout(() => {
        previousButton.classList.add('show');
        nextButton.classList.add('show');
    }, 10);
    previousButton.addEventListener('click', goBackInColors);
    nextButton.addEventListener('click', nextColor);

}


const removePreviousButton = () => {
    if (previousButton && nextButton) {
        previousButton.remove();
        previousButton = null;

        nextButton.remove();
        nextButton = null;

        isCreated = false;
    }


};

// const goBackInColors = () => {

//     clickCounter++
//     showClickCount.innerHTML = clickCounter;
//     if (index === 1) {
//         sectionContainer.style.backgroundColor = colors[colors.length - 1];
//         colorHexcode.style.color = colors[colors.length - 1];
//         colorHexcode.innerHTML = colors[colors.length - 1];
//         index = 0
//         return;
//     }

//     if (index === 0) {
//         sectionContainer.style.backgroundColor = colors[colors.length - 2];
//         colorHexcode.style.color = colors[colors.length - 2];
//         colorHexcode.innerHTML = colors[colors.length - 2];
//         index = colors.length - 1;
//         return;
//     }

//     sectionContainer.style.backgroundColor = colors[index - 2];
//     colorHexcode.style.color = colors[index - 2];
//     colorHexcode.innerHTML = colors[index - 2];
//     index--
//     console.log('index ' + index)


// }

const goBackInColors = () => {

    if (usedColorsArray.length <= 1) {
        return;
    }

    let lastItem = usedColorsArray.length - 2
    sectionContainer.style.backgroundColor = usedColorsArray[lastItem]
    colorHexcode.style.color = usedColorsArray[lastItem]
    colorHexcode.innerHTML = usedColorsArray[lastItem]
    usedColorsArray.pop();

    console.log(index)

    indexValue.pop();



}

const nextColor = () => {

    index = indexValue[indexValue.length - 1];
    clickCounter++

    sectionContainer.style.backgroundColor = colors[index];
    sectionContainer.style.transition = 'background-color .8s';
    colorHexcode.style.color = colors[index];
    colorHexcode.innerHTML = colors[index];
    showClickCount.innerHTML = clickCounter;

    usedColorsArray.push(colors[index])
    console.log(usedColorsArray)

    index++;


    if (index === colors.length) {
        index = 0;
    }
    console.log("finish functie index", index);
    indexValue.push(index)
    console.log(indexValue)
}

// let counter = 0;

// const switchColor = () => {
//   counter++; // 1 2 3

//   if (counter === 1) {
//     // prima apasare
//     sectionContainer.style.backgroundColor = "#009B72";
//   } else if (counter === 2) {
//     sectionContainer.style.backgroundColor = "#6761AB";
//   } else if (counter === 3) {
//     sectionContainer.style.backgroundColor = "#347E8D";
//   } else if (counter === 4) {
//     sectionContainer.style.backgroundColor = "#798186";
//   } else {
//     counter = 0;
//     sectionContainer.style.backgroundColor = "#AD636C";
//   }
// };

switchColorButton.addEventListener("click", switchColor);
resetButton.addEventListener('click', resetAll);

showUsedColors.addEventListener('click', () => {
    if (usedColorsArray.length === 0) {
        alert("No colors used")
    } else
        alert(usedColorsArray)

});

