'use strict'

const userForm11 = new UserForm();
userForm11.loginFormCallback = data => {
    let login = data.login;
    let password = data.password;
    ApiConnector.login({ login, password }, data => {
        if (data.success == true) {
            location.reload();
        } else {
            userForm11.setLoginErrorMessage(`Пользователь c логином ${login} и указанным паролем не найден`);
        };
    });
}

userForm11.registerFormCallback = data => {
    let login = data.login;
    let password = data.password;
    ApiConnector.register({ login, password }, data => {
        if (data.success == true) {
            location.reload();
        } else {
            userForm11.setregisterErrorMessage('Пользователь не авторизован');
        };
    });
}