const container = document.querySelector('.container')
let loc = JSON.parse(localStorage.getItem('user'))

function reloadHead() {

    const header = document.createElement('header');
    header.classList.add('header');

    const main = document.createElement('div');
    main.classList.add('main');

    const right = document.createElement('div');
    right.classList.add('right');

    const link1 = document.createElement('a');
    link1.href = '';
    link1.textContent = 'Главная';

    const link2 = document.createElement('a');
    link2.href = '';
    link2.textContent = 'Мои Кошельки';

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

    left.classList.add('left');
    right.append(link1, link2, link3);
    left.append(gmail, exit);
    main.append(right, left);
    header.append(main);
    container.append(header)
}

function reloadWelcome() {
    const div = document.createElement('div');
    div.classList.add('welcome_hum');

    const welcomeText = document.createElement('p');
    welcomeText.classList.add('welcome');
    welcomeText.textContent = `Добро пожаловать ${loc.name} ${loc.surname}`;

    const link = document.createElement('a');
    link.href = '';
    link.textContent = loc.email;

    div.append(welcomeText, link);


    // Добавление созданных элементов на страницу
    container.append(div);
}


function reloadWallets() {
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
    viewAll.href = '';
    viewAll.innerText = 'Смотреть все кошельки';

    walletsAll.append(myWallets, wallets, viewAll);
    container.append(walletsAll);
}

function reloadTransactions() {
    const transaction = document.createElement('div')
    transaction.classList.add('transaction')

    const last_transaction = document.createElement('p')
    last_transaction.textContent = "Последние транзации"
    const table = document.createElement('table')

    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const th1 = document.createElement('th')
    const th2 = document.createElement('th')
    const th3 = document.createElement('th')
    const th4 = document.createElement('th')
    const th5 = document.createElement('th')

    th1.textContent = "ID"
    th2.textContent = "Отправлено с кошелька"
    th3.textContent = "Категория"
    th4.textContent = "Сумма транзакции"
    th5.textContent = "Когда"

    tr.append(th1, th2, th3, th4, th5)
    thead.append(tr)

    const tbody = document.createElement('tbody')

    for (let i = 0; i < 7; i++) {
        const tr = document.createElement('tr')

        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const td5 = document.createElement('td')

        td1.textContent = "1232312"
        td2.textContent = "Visa"
        td3.textContent = "Автомобиль"
        td4.textContent = "414,000,000"
        td5.textContent = "4 дня назад"

        tr.append(td1, td2, td3, td4, td5)
        tbody.append(tr)
    }
    table.append(thead, tbody)

    const a = document.createElement('a')
    a.textContent = "Смотреть все оплаты"

    transaction.append(last_transaction, table, a)
    container.append(transaction)
}

reloadHead()
reloadWelcome()
reloadWallets()
reloadTransactions()