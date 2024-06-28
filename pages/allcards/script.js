import { reloadHead } from "/modules/script.js";
import { getData } from "/lib/http.request.js";


let loc = JSON.parse(localStorage.getItem('user'));

const container = document.querySelector('.container');
const view_cards = document.querySelector('.view_cards');

function RGB() {
    function random(up) {
        return Math.ceil(Math.random() * up)
    }

    let r = random(255)
    let g = random(255)
    let b = random(255)

    return `rgb(${r}, ${g}, ${b})`
}

 function reloadCard(item, place) { 
    const wallet = document.createElement('div');
    wallet.classList.add('wallet');

    wallet.style.background = `linear-gradient(90deg,${RGB()}, ${RGB()})`

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

async function reloadCards() {
    const div = document.createElement('div');
    div.classList.add('Cards');

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Мои кошельки';

    const a = document.createElement('a');
    a.textContent = loc.email;

    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = "add";

    button.onclick = () => {
        location.assign('/pages/addcard/');
    };

    div.append(h1, a, view_cards, button);
    container.append(div);

    try {
        const users = await getData('/cards?userId=' + loc.id);

        if (users.status === 200 || users.status === 201) {
            view_cards.innerHTML = ""; 

            
            users.data.forEach(card => { 
                reloadCard(card , view_cards);
            });
        } else {
            console.error("Error fetching card data:", users.status);
            
        }
    } catch (error) {
        console.error("Error fetching card data:", error);
       
    }
}

reloadHead();
reloadCards();