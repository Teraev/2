const container = document.querySelector('.container')
import { getData } from "../lib/http.request";
let loc = JSON.parse(localStorage.getItem('user'))




export function reloadHead() {

    const header = document.createElement('header');
    header.classList.add('header');

    const main = document.createElement('div');
    main.classList.add('main');

    const right = document.createElement('div');
    right.classList.add('right');

    const link1 = document.createElement('a');
    link1.href = '/';
    link1.textContent = 'Главная';

   
    const link2 = document.createElement('a');
    link2.href = '/pages/allcards/';
    link2.textContent = 'Мои Кошельки';



    const link3 = document.createElement('a');
    link3.href = '/pages/alltransaction/';
    link3.textContent = 'Мои транзакции';



    const left = document.createElement('div');

    const gmail = document.createElement('p');
    gmail.textContent = loc.email;

    const exit = document.createElement('img');
    exit.classList.add('exit');
    exit.src = '../../img/exit.svg';
    exit.alt = '';

    exit.onclick = () => {
        location.assign('/pages/signin/');
    }

    left.classList.add('left');
    right.append(link1, link2, link3);
    left.append(gmail, exit);
    main.append(right, left);
    header.append(main);
    container.append(header)
}

export function reloadWelcome() {
    const div = document.createElement('div');
    div.classList.add('welcome_hum');

    const welcomeText = document.createElement('p');
    welcomeText.classList.add('welcome');
    welcomeText.textContent = `Добро пожаловать ${loc.name} ${loc.surname}`;

    const link = document.createElement('a');
    link.href = '';
    link.textContent = loc.email;

    div.append(welcomeText, link);


    container.append(div);
}

function RGB() {
    function random(up) {
        return Math.ceil(Math.random() * up)
    }

    let r = random(255)
    let g = random(255)
    let b = random(255)

    return `rgb(${r}, ${g}, ${b})`
}




export async function reloadCard(item, place) {
    const wallet = document.createElement('div');
    wallet.classList.add('wallet');

    const getColor = () => Math.floor(Math.random() * 256);

    wallet.style.background = `linear-gradient(90deg, rgb(${getColor()}, ${getColor()}, ${getColor()}), rgb(${getColor()}, ${getColor()}, ${getColor()}))`;

    const nameCard = document.createElement('p');
    nameCard.classList.add('name_card');
    nameCard.innerText = item.name;

    const valute = document.createElement('p');
    valute.classList.add('valute');
    valute.innerText = item.currency;

    let balanceShown = false;

    valute.onclick = () => {
        if (balanceShown) {
            valute.innerText = item.currency;
            balanceShown = false;
        } else {
            valute.innerText = item.balance;
            balanceShown = true;
        }
    };

    wallet.append(nameCard, valute);
    place.append(wallet);
}

export async function reloadCards() {
    const loc = JSON.parse(localStorage.getItem('user'));
    const cardContainer = document.querySelector('.card-container');

    try {
        const users = await getData('/cards?userId=' + loc.id);

        if (users.status === 200 || users.status === 201) {
            cardContainer.innerHTML = "";

            users.data.forEach(card => {
                reloadCard(card, cardContainer);
            });
        } else {
            console.error("Error fetching card data:", users.status);
        }
    } catch (error) {
        console.error("Error fetching card data:", error);
    }
}
