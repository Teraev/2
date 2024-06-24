const sign_in_email = document.querySelector('.sign_in_email')
const sign_in_pass = document.querySelector('.sign_in_pass')
const sign_in_btn = document.querySelector('.sign_in_btn')


const userJSON = localStorage.getItem('user');


const user = JSON.parse(userJSON);

sign_in_email.value = user.email;

sign_in_btn.onclick = () => {
    if (sign_in_pass.value === user.password) {
        window.location.href = '/pages/main/';
    } else {
        alert('Неверный пароль');
    }
}
