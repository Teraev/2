import { postData } from "../../lib/http.request"
import { getData } from "../../lib/http.request";

const forms = document.forms.namedItem('signin');
const sign_in_email = forms.querySelector('.sign_in_email');
const sign_in_pass = forms.querySelector('.sign_in_pass');
let patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]|[_]).{8,}$/
};

forms.onsubmit = async (e) => {
    e.preventDefault();

    const fm = new FormData(e.target);
    const user_val = {
        email: fm.get('email'),
        password: fm.get('password')
    };

 
    if (!patterns.password.test(user_val.password)) {
        alert('Пароль должен быть минимум 8 символов, содержать маленькую букву, заглавную букву, один номер и один символ');
        return;
    }

   
    if (!patterns.email.test(user_val.email)) {
        alert('Неправильный email адрес');
        return;
    }

    
        

    
    try {
      
        const user = await getData('/users?email=' + user_val.email);

       
        if (user.data.length === 0) {
            alert('Пользователь с таким email не найден');
            return;
        }

      
        let [data] = user.data;
        if (data.password === user_val.password) {
            localStorage.setItem('user', JSON.stringify(data));
            location.assign('/'); 
        } else {
            alert('Неверный пароль');
        }
    } catch (error) {
        
        alert('Произошла ошибка. Попробуйте позже.');
    }
};