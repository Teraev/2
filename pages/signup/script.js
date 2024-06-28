import { postData } from "../../lib/http.request"
import { getData } from "../../lib/http.request"
const form = document.forms.namedItem('signup')

let patterns = {
    name: /^[A-Za-z]{1,30}$/,
    surname: /^[A-Za-z]{1,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]|[_]).{8,}$/
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

    if (!patterns.password.test(user.password)) {
        alert('Пароль должен быть минимум 8 символов, содержать маленькую буквы заглавную букв  один номер и один символ');
        return;
    }

    const users = await getData('/users?email=' + user.email);

    if (users.status === 200 || users.status === 201) {
        const existingUser = users.data.find(i => i.email === user.email);
        if (existingUser) {
            alert('Такой пользователь существует');
            return;
        }
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