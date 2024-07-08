import VanillaTilt from "vanilla-tilt";
import {  getData, getFixers } from "../../lib/http.request";
import { reloadHead } from "../../modules/script";
import Chart from 'chart.js/auto';
import axios from "axios";

const header = document.querySelector('header')
const currency_container = document.querySelector('.my_wallets')
const exit = document.querySelector('.exit')
const convense = document.querySelector('#convense')
const curens = document.querySelector('#curens')
const totaly = document.querySelector('.totaly')
const convertBtn = document.querySelector('.convertBtn')
const summa = document.querySelector('.summa').value
const cards = document.querySelector('.cards')
const Chart_cont = document.querySelector('canvas ')
const form = document.forms.namedItem('convert')
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

    let clickedCard = id
    if (clickedCard === item.id) {
        div_card.classList.add('grey');
    }

    div_card.onclick = () => {
        const card = document.querySelectorAll('.card')
        card.forEach(card => card.classList.remove('grey'));
        div_card.classList.add('grey');


        location.assign('/pages/currency/?id=' + item.id);
        clickedCard = item.id;
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
            console.error("Error fetching transaction data:",);
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
            convense.append(opt.cloneNode(true));
            curens.append(opt);
        }
    })

 

Currency()

const id = location.search.split('=').at(-1);

Promise.all([getData('/cards/' + id), getData('/transaction?wallet_id' + id)])
    .then((array) => {

        const [{ data }, transaction] = array

   
        const wallet = document.createElement('div');
        wallet.classList.add('walletsa');

        const getColor = () => Math.floor(Math.random() * 256);

        wallet.style.background = `linear-gradient(90deg, rgb(${getColor()}, ${getColor()}, ${getColor()}), rgb(${getColor()}, ${getColor()}, ${getColor()}))`;

        const nameCard = document.createElement('p');
        nameCard.classList.add('name_cards');
        nameCard.innerText = data.name;

        const valute = document.createElement('p');
        valute.classList.add('valutes');
        valute.innerText = data.balance;

        wallet.onclick = () => {
            wallet.classList.add('flip');

            setTimeout(() => {
                wallet.classList.remove('flip');
            }, 500);
        }

        wallet.append(nameCard, valute);
        cards.append(wallet);

     initChart(transaction.data)
    })


function initChart(data) {

const spendings = []
const spendings_time = []

data.forEach(transaction => {
    spendings_time.push(transaction.time)
    spendings.push(transaction.amount)
})


    new Chart(Chart_cont, {
        type: 'line',
        data: {
            labels: spendings_time,
            datasets: [{
                label: 'My First Dataset',
                data: spendings,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    })
}

VanillaTilt.init(cards, {
    max: 15,
    speed: 200
});


form.onsubmit = (event) => {
    event.preventDefault();

  
    let fm = new FormData(event.target);
    let from = fm.get('curens');
    let to = fm.get('convense');
    let amount = fm.get('summa');

    
    const apiUrl = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`

  
    axios.get(apiUrl, {
        headers: {
            apikey: import.meta.env.VITE_API_KEY
        }
    })
    .then(res => {
        totaly.innerText = res.data.result; 
    })
  
};




  

