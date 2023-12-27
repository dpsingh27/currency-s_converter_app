// Set the base URL for fetching currency exchange rate data
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// Select all dropdowns and the submit button
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

// Select currency dropdowns and message element
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Loop through each dropdown
for (let select of dropdowns) {
  // Loop through currency codes in the 'countryList'
  for (currCode in countryList) {
    // Create a new option element for each currency code
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Set default selected options for 'from' and 'to' dropdowns
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    // Append the new option to the current dropdown
    select.append(newOption);
  }

  // Add event listener for 'change' event to update flag when dropdown value changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update the exchange rate and display the result
const updateExchangeRate = async () => {
  // Get the amount input element and its value
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  // Set default amount to 1 if empty or less than 1
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Construct the URL for fetching exchange rate data
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  // Fetch data from the API
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  // Calculate the final amount
  let finalAmount = amtVal * rate;

  // Display the result message
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Function to update the flag image based on the selected currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Add event listener for the submit button to prevent default form submission and update exchange rate
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Add event listener for the 'load' event to update exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate();
});
