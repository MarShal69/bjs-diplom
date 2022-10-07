'use strict'

const userForm11 = new UserForm();
userForm11.loginFormCallback = data => {
    ApiConnector.login(data, (response) => {
        if (response.success == true) {
            location.reload();
        } else {
            userForm11.setLoginErrorMessage(response.error);
            // console.log(data);
            // console.log(response);
        };
    });
};

userForm11.registerFormCallback = data => {
    ApiConnector.register(data, (response) => {
        if (response.success == true) {
            location.reload();
        } else {
            userForm11.setRegisterErrorMessage(response.error);
        };
    });
}