const form  = document.forms.namedItem('addcard')
import { postData } from "../../lib/http.request";

let loc = JSON.parse(localStorage.getItem('user'))


form.onsubmit = async (e) => {
  e.preventDefault();

  const fm = new FormData(e.target);

  let wallet = {
    id: crypto.randomUUID(),
    userId: loc.id,
    name: fm.get("name"),
    balance: fm.get("balance"),
    currency: fm.get("currency"),
  };


  const res = await postData('/cards', wallet)

    if (res.status === 200 || res.status === 201) {
        alert('Карта создана');
        location.assign('/pages/allcard/')
        return;
    }

    console.log(wallet);
};