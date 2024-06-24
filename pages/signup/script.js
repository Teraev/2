const signupButton = document.querySelector('.sign_up_btn');

const email = document.querySelector('.sign_up_email');
const name = document.querySelector('.sign_up_name');
const surname = document.querySelector('.sign_up_surname');
const password = document.querySelector('.sign_up_pass');

signupButton.onclick = () => {
    const email_val  = email.value
    const name_val = name.value
    const surname_val = surname.value
    const password_val = password.value

    let user = {
        email: email_val,
        name: name_val,
        surname: surname_val,
        password: password_val
    };

    
    localStorage.setItem('user', JSON.stringify(user));
   
};