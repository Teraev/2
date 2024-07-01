import {  postData } from "../../lib/http.request"

let form = document.forms.namedItem('addtransaction')


let loc = JSON.parse(localStorage.getItem('user'))


form.onsubmit = async (e) => {
    e.preventDefault()

    let fm = new FormData(e.target)

   let transaction = {
        id: crypto.randomUUID(),
        userId: loc.id,
        walletId: fm.get('wallet'),
        amount: fm.get('amount'),
        category: fm.get('category'),
        time: new Date().toLocaleDateString(),
    }

    const res = await postData('/transaction', transaction)

    if (res.status === 200 || res.status === 201) {
        alert('Транзакция успешна');
        location.assign('/pages/alltransaction/')
        return;
    }

   

}
 