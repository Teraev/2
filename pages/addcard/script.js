const form  = document.forms.namedItem('addcard')
import { postData , getFixers } from "/lib/http.request";

let loc = JSON.parse(localStorage.getItem('user'))

const select = document.querySelector('#select')


getFixers('/symbols')
.then(symbols => {
  for (let key in symbols) {
      let opt = new Option(`${key} (${symbols[key]})`, key)
      select.append(opt)
  }
})



form.onsubmit = async (e) => {
  e.preventDefault();

  const fm = new FormData(e.target);

  let wallet = {
    id: crypto.randomUUID(),
    userId: loc.id,
    name: fm.get("name"),
    balance: fm.get("balance"),
    currency: fm.get("currency"),
    created: new Date().toLocaleDateString()
  };


  const res = await postData('/cards', wallet)

    if (res.status === 200 || res.status === 201) {
        alert('Карта создана');
        location.assign('/pages/allcard/')
        return;
    }

    console.log(wallet);
};