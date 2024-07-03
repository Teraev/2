import { postData, getData, patchData } from "/lib/http.request";

let form = document.forms.namedItem('addtransaction');
const select = document.querySelector('#select');
const money_inp = document.querySelector('.money_inp');
let loc = JSON.parse(localStorage.getItem('user'));
let cards = [];
let select_cards;

getData('/cards?user_id=' + loc.id)
  .then(res => {
    for (let item of res.data) {
      let idx = res.data.indexOf(item);
      let opt = new Option(item.name, item.id);

      if (idx === 0) {
        opt.selected = true;
        select_cards = item;
      }
      select.append(opt);
    }
    cards = res.data;
  });

select.onchange = (e) => {
  const id = e.target.value;
  const card = cards.find(el => el.id === id);

  if (card) {
    select_cards = card;
  } else {
    select_cards = null;
  }
};

form.onsubmit = async (e) => {
  e.preventDefault();

  let fm = new FormData(e.target);

  let transaction = {
    id: crypto.randomUUID(),
    userId: loc.id,
    amount: fm.get('amount'),
    category: fm.get('category'),
    time: new Date().toLocaleDateString(),
  };

  fm.forEach((val, key) => transaction[key] = val);

  const amount = parseFloat(money_inp.value);

  if (amount > select_cards.balance) {
    alert('Недостаточно средств');
    return; 
  }

 

  const res = await patchData('/cards/' + select_cards.id, { balance: select_cards.balance - amount });

  delete select_cards.id;
  delete select_cards.userId;

  transaction.walletId = select_cards;

  const post_res = await postData('/transaction', transaction);

  if (post_res.status !== 200 && post_res.status !== 201) {
    alert('Error adding transaction!');
    return;
  }

  location.assign('/pages/alltransaction/');
};
 


 