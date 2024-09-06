let input = document.querySelector(".input");
let options = document.querySelectorAll('.country-box select');
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let btn = document.querySelector(".btn");
let msg = document.querySelector(".msg");
let fromImg = document.querySelector('#fromImg');
let toImg = document.querySelector('#toImg');

let apiKey = "fca_live_opqO84mBL62zsawP5kCAnjE9zJiTc1VKurpZEQG5";
let baseUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

for (const curr in countryList) {
    options.forEach((option) => {
        let opt = document.createElement('option');
        opt.value = curr;
        opt.textContent = curr;
        option.appendChild(opt);
    });
}

fromCurr.value = "USD";
toCurr.value = "INR";

options.forEach((select) => {
    select.addEventListener('change', () => {
        updateFlags();
        getCurrencyRate();
    });
});

function updateFlags() {
    fromImg.src = `https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`;
    toImg.src = `https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;
}

async function getCurrencyRate() {
    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;
    let amount = parseFloat(input.value) || 1;
    if (amount === "" || amount < 1) {
        amount = 1;
        input.value = "1";
      }

    try {
        let response = await fetch(`${baseUrl}&currencies=${toCurrency}&base_currency=${fromCurrency}`);
        let data = await response.json();

        if (data.data[toCurrency]) {
            let rate = data.data[toCurrency];
            let convertedAmount = amount * rate;
            msg.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            throw new Error(`Exchange rate for ${toCurrency} not found.`);
        }

    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        msg.textContent = `Error: ${error.message}`;
    }
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    getCurrencyRate();
});

updateFlags();
getCurrencyRate();