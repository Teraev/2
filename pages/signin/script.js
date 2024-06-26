import { postData } from "../../lib/http.request"
let loc = JSON.parse(localStorage.getItem('user'))

const forms = document.forms.namedItem('signin')
const sign_in_email = forms.querySelector('.sign_in_email')
const sign_in_pass = forms.querySelector('.sign_in_pass')
let patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

forms.onsubmit = (e) => {
    e.preventDefault()

    const email = sign_in_email.value
    const password = sign_in_pass.value
    
    if(email === loc.email && password === loc.password && patterns.email.test(email) ) {
        alert('Welcome')
        location.assign('/pages/main/')
    } else {
        alert('Проверьте данные пароль должен содержать 6 символов')
    }
}