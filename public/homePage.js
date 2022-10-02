const logoutButton = new LogoutButton();
logoutButton.action = function logout() {
    ApiConnector.logout((response) => {
        if (response.success == true) {
            location.reload();
        };
    });
};

ApiConnector.current(({ data, success }) => {
    if (success === true) {
        // console.log(data);
        ProfileWidget.showProfile(data);
    };
});

const ratesBoard = new RatesBoard;
setInterval((ApiConnector.getStocks(({ data, success }) => {
    if (success === true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(data);
    };
})),
    1000);

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        // console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешное пополнение баланса");
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Операция успешно завершена");
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
        // console.log(response);
    });
};

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        // console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Операция успешно завершена");
            console.log(response.success);
        } else {
            moneyManager.setMessage(response.success, response.error);
            // console.log(response.error);
        };
    });
};

favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites((response) => {
    if (response.success == true) {
        // console.log(response);
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        // console.log(response);
        if (response.success == true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        };
    });
};

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        // console.log(response);
        if (response.success == true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(response.success, response.error);;
        };
    });
}