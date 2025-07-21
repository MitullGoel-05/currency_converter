const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".mssg");


for (let select of dropdowns) {
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if (select.name=== "from" && currCode === "USD")
        {
            newOption.selected = "USD";
        }
        else if (select.name=== "to" && currCode === "INR")
        {
            newOption.selected = "INR";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
let currCode = element.value;
let countrycode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}


const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amt_val = amt.value;
    if(amt_val === "" || amt_val <1){
        amt_val = 1;
        amt.value = "1";
    }

    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
  updateExchangeRate();
});

