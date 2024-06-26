import { postData } from "../../lib/http.request"
const form = document.forms.namedItem('signup')

let patterns = {
    name: /^[A-Za-z]{1,30}$/,
    surname: /^[A-Za-z]{1,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

form.onsubmit = async (e) => {
    e.preventDefault();
    
    const fm = new FormData(e.target)
    const user = {
        id: crypto.randomUUID(),
        name: fm.get('name'),
        surname: fm.get('surname'),
        email: fm.get('email'),
        password: fm.get('password')
    }

    if (!patterns.email.test(user.email)) {
        alert('Неправильный email адрес');
        return;
    }

    if (!patterns.name.test(user.name)) {
        alert('Неправильное Имя');
        return;
    }

    if (!patterns.surname.test(user.surname)) {
        alert('Неправильная Фамилия');
        return;
    }

    if (user.password.length < 6) {
        alert('Пароль должен содержать 6 символов');
        return;
    }

    const res = await postData('/users', user)

    if (res.status === 200 || res.status === 201) {
        alert('Пользователь создан');
        localStorage.setItem('user', JSON.stringify(user));
        location.assign('/pages/signin/');
        return;
    }

    console.log(res);
    alert(res?.error?.message);
}