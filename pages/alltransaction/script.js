import { getData } from "../../lib/http.request";
import { reloadHead } from "../../modules/script";

const container = document.querySelector('.container')

reloadHead(container)

let transaction_container = document.querySelector('.transaction-container')
let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
let addTransactionBtn = document.querySelector('#add-transactions')

function createtransaction(item) {
    let transactionElement = document.createElement('div');
    let transactionId = document.createElement('span');
    let transactionType = document.createElement('span');
    let transactionCategory = document.createElement('span');
    let transactionAmount = document.createElement('span');
    let transactionTime = document.createElement('span');

    transactionElement.classList.add('transaction-row');
    transactionId.classList.add('transaction-card-id');
    transactionType.classList.add('transaction-card-type');
    transactionCategory.classList.add('transaction-category');
    transactionAmount.classList.add('transaction-amount');
    transactionTime.classList.add('transaction-time');

    transactionId.innerHTML = item.id;
    transactionType.innerHTML = item.type;
    transactionCategory.innerHTML = item.category;
    transactionAmount.innerHTML = item.amount;
    transactionTime.innerHTML = item.time;

    transactionElement.append(transactionId, transactionType, transactionCategory, transactionAmount, transactionTime);

    return transactionElement;
}

async function reloadTransactions() {
    try {
        const transactions = await getData(`/transaction?userId=${loc.id}`);

        if (transactions.status === 200) {
            transaction_container.innerHTML = "";

            transactions.data.forEach(transaction => {
                let transactionElement = createtransaction(transaction);
                transaction_container.append(transactionElement);
            });
        } else {
            console.error("Error fetching transaction data:", transactions.status);
        }
    } catch (error) {
        console.error("Error fetching transaction data:", error);
    }
}

reloadTransactions();

userEmail.innerHTML = loc.email

addTransactionBtn.onclick = () => {
    location.assign('/pages/addtransaction/')
}