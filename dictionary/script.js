const buttonClick = document.getElementById("find");
const words = document.querySelector("#word");
const status = document.querySelector(".loading");

async function fetchDictionary(word) {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        status.innerText = "Loading...";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        status.innerText = "Success";
        return data;
    } catch (error) {
        console.error('Error:', error);
        status.innerText = "Can't find...";
        return null;
    }
}

buttonClick.addEventListener("click", async () => {
    const word = words.value.toLowerCase().trim();
    if (word) {
        const data = await fetchDictionary(word);
        if (data) {
            updateUi(data);
        }
        words.value = "";
    }
});

function updateUi(data) {
    const dictionaryUi = document.getElementById("dictionary");
    dictionaryUi.innerHTML = ""; // Clear previous results
    console.log(data);
    
    data.forEach((dataOne) => {
        const dictOneContainer = document.createElement("div");
        dictOneContainer.className = "dictContainer";
        const meanings = dataOne.meanings;
        meanings.forEach((meaning) => {
            console.log(meaning);
            
            const antonyms = meaning.antonyms || ["No Antonyms"];
            const synonyms = meaning.synonyms || ["No Synonyms"];
            const partOfSpeech = meaning.partOfSpeech || "N/A";
            const definitions = meaning.definitions || ["No Difinitions"];
            
            const antonymsDiv = document.createElement("div");
            antonymsDiv.className = "antonymsDiv";
             const antoSpan = document.createElement("span")
            antoSpan.classList = "antoSpan"
            antoSpan.innerText = "Antonyms"
            antonymsDiv.appendChild(antoSpan)
            antonyms.forEach((antonym) => {
                const antoDiv = document.createElement("div");
                antoDiv.className = "antonym";
                antoDiv.innerText = antonym;
                antonymsDiv.appendChild(antoDiv);
            });
            
            const synonymsDiv = document.createElement("div");
            synonymsDiv.className = "synonymsDiv";
            const synoSpan = document.createElement("span")
            synoSpan.classList = "synoSpan"
            synoSpan.innerText = "Synonyms"
            synonymsDiv.appendChild(synoSpan)
            synonyms.forEach((synonym) => {
                const synoDiv = document.createElement("div");
                synoDiv.className = "synonym";
                synoDiv.innerText = synonym;
                synonymsDiv.appendChild(synoDiv);
            });
            
            const partOfSpeechSpan = document.createElement("span");
            partOfSpeechSpan.className = "partOfSpeech";
            partOfSpeechSpan.innerHTML = `<p class="Key">Part Of Speech</p><p class"Value">${partOfSpeech}</p>`;

            const definitionContainer = document.createElement("div");
            definitionContainer.className = "definitionContainer";
                        const DifiSpan = document.createElement("span")
            DifiSpan.classList = "DifiSpan"
            DifiSpan.innerText = "Difinitions"
            definitionContainer.appendChild(DifiSpan)
            definitions.forEach((definition) => {
                const definitionTag = document.createElement("p");
                definitionTag.className = "definition";
                definitionTag.innerText = definition.definition;
                definitionContainer.appendChild(definitionTag);
            });
            const dictionaryContainer = document.createElement("div")
            dictionaryContainer.classList = "dictionaryContainer"
            dictionaryContainer.append(partOfSpeechSpan, antonymsDiv, synonymsDiv, definitionContainer)

            dictOneContainer.appendChild(dictionaryContainer);
        });

        dictionaryUi.appendChild(dictOneContainer);
    });

    status.style.display = "none";
}
