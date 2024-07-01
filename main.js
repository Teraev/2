import { getData } from "./lib/http.request.js";
import { reloadHead, reloadWelcome, reloadCards } from "./modules/script.js";

let loc = JSON.parse(localStorage.getItem('user'));
const container = document.querySelector('.container')
const cardContainer = document.querySelector('.card-container')
container.innerHTML = "";

reloadHead(container);
reloadWelcome(container)

getData('/cards?userId=' + loc.id)
    .then(res => {
        reloadCards(res, cardContainer);
    });

