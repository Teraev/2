import { getData } from "./lib/http.request.js";
import { reloadHead, reloadWelcome, reloadCards ,reloadTransactions   } from "./modules/script.js";

let loc = JSON.parse(localStorage.getItem('user'));
const container = document.querySelector('.container')
const cardContainer = document.querySelector('.card-container')
const transaction_container = document.querySelector('.transaction_container')
container.innerHTML = "";

reloadHead(container);
reloadWelcome(container)

getData('/cards?userId=' + loc.id)
    .then(res => {
        reloadCards(res, cardContainer);
    });

    getData('/transaction?userId=' + loc.id)
    .then(res => {
        reloadTransactions(res, transaction_container);
    });