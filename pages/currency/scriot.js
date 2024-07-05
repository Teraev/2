import { getData, getFixers } from "../../lib/http.request";
import { reloadHead } from "../../modules/script";

const header = document.querySelector('header')
const currency_container = document.querySelector('.my_wallets')
const exit = document.querySelector('.exit')
const currency_valute = document.querySelector('#currency')
const convense = document.querySelector('#convense')
const curens = document.querySelector('#curens')
let loc = JSON.parse(localStorage.getItem('user'))
reloadHead(header)




function reloadCurrency(item) {
    const div_card = document.createElement('div');
    const div_names = document.createElement('div');
    const div_wal = document.createElement('div');

    const img = document.createElement('img');
    const p = document.createElement('p');
    const time = document.createElement('p');

    div_card.classList.add('card');
    div_names.classList.add('names');
    div_wal.classList.add('wal');
    p.classList.add('name_card');
    time.classList.add('time_card');

    p.innerHTML = item.name;
    time.innerHTML = `Created: ${item.created}`;

    div_wal.append(img, p);
    div_names.append(div_wal, time);
    div_card.append(div_names);

    img.src = '/img/card.svg';

    let clickedCard = localStorage.getItem('selectedWalletId');
    if (clickedCard  === item.id) {
        div_card.classList.add('grey');
    }

    div_card.onclick = () => {
       const card = document.querySelectorAll('.card') 
       card.forEach(card => card.classList.remove('grey'));
        div_card.classList.add('grey');

        
        localStorage.setItem('selectedWalletId', item.id);
        clickedCard  = item.id; 
    };

    return div_card;
}
export async function Currency() {
    try {
        const currency_data = await getData(`/cards?userId=${loc.id}`);
       
        if (currency_data.status === 200) {
            currency_container.innerHTML = "";

            currency_data.data.forEach(currency => {
                let currencyElement = reloadCurrency(currency);
                currency_container.append(currencyElement);
            });
        } else {
            console.error("Error fetching transaction data:", );
        }
    } catch (error) {
        console.error("Error fetching transaction data:", error);
    }
}




exit.onclick = () => {
    location.assign('/')
}

getFixers('/symbols')
.then(symbols => {
  for (let key in symbols) {
      let opt = new Option(`${key} (${symbols[key]})`, key)
      currency_valute.append(opt.cloneNode(true)); 
      convense.append(opt.cloneNode(true));       
      curens.append(opt);      
  }
})

Currency()