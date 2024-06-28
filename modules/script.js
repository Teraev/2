const container = document.querySelector('.container')
let loc = JSON.parse(localStorage.getItem('user'))




export function reloadHead() {

    const header = document.createElement('header');
    header.classList.add('header');

    const main = document.createElement('div');
    main.classList.add('main');

    const right = document.createElement('div');
    right.classList.add('right');

    const link1 = document.createElement('a');
    link1.href = '';
    link1.textContent = 'Главная';

    link1.onclick = () => {
        location.assign('/')
    }

    const link2 = document.createElement('a');
    link2.href = '';
    link2.textContent = 'Мои Кошельки';

    link2.onclick = () => {
        location.assign('/pages/allcards/')
    }

    const link3 = document.createElement('a');
    link3.href = '';
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
 


export function reloadWallets() {
    const walletsAll = document.createElement('div');
    walletsAll.classList.add('wallets_all');

    const myWallets = document.createElement('p');
    myWallets.classList.add('my_wallets');
    myWallets.innerText = 'Мои кошельки';

    const wallets = document.createElement('div');
    wallets.classList.add('wallets');

    for (let i = 0; i < 4; i++) {
        const wallet = document.createElement('div');
        wallet.classList.add('wallet');

        wallet.style.background = `linear-gradient(90deg,${RGB()}, ${RGB()})`

        const nameCard = document.createElement('p');
        nameCard.classList.add('name_card');
        nameCard.innerText = 'Visa';

        const valute = document.createElement('p');
        valute.classList.add('valute');
        valute.innerText = 'RUB';

        wallet.append(nameCard, valute);
        wallets.append(wallet);
    }

    const viewAll = document.createElement('a');
    viewAll.href = '/pages/allcards/';
    viewAll.innerText = 'Смотреть все кошельки';

   

    walletsAll.append(myWallets, wallets, viewAll);
    container.append(walletsAll);
}

