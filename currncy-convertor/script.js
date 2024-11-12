async function fetchCurrencyDetails(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}


// Fetching currency details when the page loads
async function fetchCurrency() {
    const currencyDetailApi = `https://api.currencylayer.com/list?access_key=821522577294bb5f4e62a94aa90642b9`;
    const currencyName = await fetchCurrencyDetails(currencyDetailApi);
    if (currencyName && currencyName.currencies) {
        showCurrencyDetails(currencyName.currencies);
    } else {
        console.error("Failed to load currency list");
    }
}

    fetchCurrency();

function showCurrencyDetails(currencyCode) {
    const fromCurrency = document.querySelector("#from-currency");
    const toCurrency = document.querySelector("#to-currency");
    
    for (let key in currencyCode) {
        fromCurrency.innerHTML += `<option value="${key}">${key}</option>`;
        toCurrency.innerHTML += `<option value="${key}">${key}</option>`;
    }
}

const convertButton = document.querySelector("#convert");
convertButton.addEventListener("click", async () => {
    const fromCurrency = document.querySelector("#from-currency").value;
    const toCurrency = document.querySelector("#to-currency").value;
    const fromAmount = parseFloat(document.querySelector("#fromAmount").value);
    
    if (!fromAmount || isNaN(fromAmount)) {
        alert("Please enter a valid amount");
        return;
    }

    const currencyRate = await fetchCurrencyRate(fromCurrency);
    if (currencyRate && currencyRate.quotes) {
        // Calculate conversion using the fetched exchange rate
        const conversionKey = `${fromCurrency}${toCurrency}`;
        const rate = currencyRate.quotes[conversionKey];
        
        if (rate) {
            const convertedAmount = fromAmount * rate;
            document.querySelector("#toAmount").value = convertedAmount.toFixed(2);
        } else {
            alert("Conversion rate not available for the selected currencies.");
        }
    } else {
        console.error("Failed to fetch currency rate");
    }
});

async function fetchCurrencyRate(fromCurrency) {
    const currencyRateApi = `https://api.currencylayer.com/live?access_key=821522577294bb5f4e62a94aa90642b9&source=${fromCurrency}`;
    const currencyRate = await fetchCurrencyDetails(currencyRateApi);
    return currencyRate;
}
