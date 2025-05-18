const searchImg = document.querySelector('.search-bar-section img');
let data;
let previousResultsSection;
const getDictionaryData = async (word) => {

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    data = await response.json()
    console.log(data.length)
}

const showSearchedWordResults = (definitions) => {

    if (previousResultsSection) {
        previousResultsSection.remove()
    }

    const section = document.createElement('section');
    previousResultsSection = section
    const divContainer = document.createElement('div')


    document.body.appendChild(section)
    section.appendChild(divContainer)


    definitions.forEach(definition => {

        // Word + phonetic-----------------
        const searchedWordDiv = document.createElement('div')
        searchedWordDiv.classList.add('searched-word-section', 'pd')
        searchedWordDiv.innerHTML =
            `<div class="searched-word">
                <h2>${definition.word}</h2>
                <p>${definition.phonetic}</p >
            </div >
            <img src="./assets/images/icon-play.svg" />
            `
        divContainer.appendChild(searchedWordDiv)

        // part of speech-----------------

        definition.meanings.forEach(meaning => {

            const partOfSpeechDiv = document.createElement('div')
            partOfSpeechDiv.classList.add('part-of-speech-section', 'pd');
            const ul = document.createElement('ul');
            ul.classList.add('word-meaning-list')
            const synonymsDiv = document.createElement('div')
            synonymsDiv.classList.add('synonyms')

            partOfSpeechDiv.innerHTML =
                `<div class="part-of-speech">
                    <p>${meaning.partOfSpeech}</p>
                    <div><hr /></div>
                </div>
                <p>Meaning</p>`

            meaning.definitions.forEach(wordDef => {

                const li = document.createElement('li')
                li.innerText = wordDef.definition
                ul.appendChild(li)
            })

            let synonyms = meaning.synonyms

            if (synonyms.length === 0) {
                synonymsDiv.innerHTML =
                    `<p>Synonyms:</p>
                    <p>-</p>`;
            } else {
                synonymsDiv.innerHTML =
                    `<p>Synonyms:</p>
                    <p>${meaning.synonyms}</p>`;
            }



            partOfSpeechDiv.appendChild(ul)
            partOfSpeechDiv.appendChild(synonymsDiv)
            divContainer.appendChild(partOfSpeechDiv)
        })


    })
}

const searchAndShowInputWord = async () => {

    const searchInput = document.querySelector('.search-bar-input');
    const searchedWord = searchInput.value

    await getDictionaryData(searchedWord)
    showSearchedWordResults(data)

}

searchImg.addEventListener('click', searchAndShowInputWord)
