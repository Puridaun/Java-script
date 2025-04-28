
// DOM variables
const accordionBtn = document.querySelectorAll('.accordion-button')


const toggleAccordionBtn = (e) => {

    const button = e.target.closest('.accordion-button');

    if (!button) return;


    const container = button.parentElement;


    const accordionText = container.querySelector('.accordion-text');


    const icon = button.querySelector('img');

    accordionText.classList.toggle('hide');



    if (accordionText.classList.contains('hide')) {

        const imgSrc = icon.getAttribute('src');
        icon.setAttribute('src', imgSrc.replace("minus", 'plus'));
    } else {

        const imgSrc = icon.getAttribute('src');
        icon.setAttribute('src', imgSrc.replace("plus", 'minus'));
    }
}

accordionBtn.forEach(button => button.addEventListener('click', toggleAccordionBtn))