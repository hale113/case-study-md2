"use strict";
exports.__esModule = true;
var account_1 = require("../model/account");
var accountManagement_1 = require("../servike/accountManagement");
var computer_1 = require("../model/computer");
var computerManagement_1 = require("../servike/computerManagement");
var serviceManagement_1 = require("../servike/serviceManagement");
var dailyIncome_1 = require("../model/dailyIncome");
var listAccountManagement = new accountManagement_1.AccountManagement();
var listComputerManagement = new computerManagement_1.ComputerManagement();
var listServiceManagement = new serviceManagement_1.ServiceManagement();
var input = require('readline-sync');
var price = 250;
var priceService = 0;
var currentDate = new Date();
var dailyIncome = new dailyIncome_1.DailyIncome();
dailyIncome.date = "".concat(currentDate.getDate(), "/").concat(currentDate.getMonth() + 1, "/").concat(currentDate.getFullYear());
dailyIncome.income = 0;
function account() {
    var menu = "\n    ====Billing Software====\n    1. Register\n    2. Login\n    0. Log out\n    ";
    var choice;
    do {
        console.log(menu);
        choice = input.question("Enter selection: ");
        switch (choice) {
            case "1":
                var id1 = +input.question("Enter new user id:   ");
                var name1 = input.question("Enter new user name:   ");
                var pass1 = input.question("Enter new user pass:   ");
                var user = new account_1.Account(id1, name1, pass1);
                listAccountManagement.add(user);
                console.log("added account! ");
                break;
            case "2":
                var userName = input.question("Enter user name:   ");
                var userPass = input.question("Enter user pass:   ");
                if (userName == "ha" && userPass == "ha12345") {
                    adminMenu();
                }
                if (userName == name1 && userPass == pass1) {
                    adminMenu();
                }
                else {
                    console.log("Wrong username or pass, re-enter!!");
                }
                break;
            case "0":
                break;
            default:
                console.log("Wrong, please re-enter");
                break;
        }
    } while (choice != "0");
}
function adminMenu() {
    var menu1 = "\n    ------Net shop management menu------\n    1. Show list of computers\n    2. Add a new machine\n    3. Turn on the machine and Add a service\n    4. Close the machine and Pay\n    5. Edit machine information\n    6. Remove a machine from the list\n    7. Edit price \n    8. Account Management\n    9. Turnover\n    0. Exit\n    ";
    var choice;
    do {
        console.log(menu1);
        choice = input.question("Enter selection:   ");
        switch (choice) {
            case "1":
                showComputer();
                break;
            case "2":
                addComputer();
                break;
            case "3":
                openComputer();
                break;
            case "4":
                dailyIncome.income += offComputer();
                break;
            case "5":
                editComputer();
                break;
            case "6":
                deleteComputer();
                break;
            case '7':
                priceEdit();
                break;
            case '8':
                addAccount();
                break;
            case "9":
                turnover();
                break;
            case "0":
                break;
            default:
                console.log("Wrong then re-enter");
                break;
        }
    } while (choice != "0");
}
function showComputer() {
    console.log(listComputerManagement.show());
}
function addComputer() {
    var idAdd = +input.question("Enter new device id:   ");
    if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
        var nameAdd = input.question("Enter new device name:   ");
        var statusAdd = input.question("Enter machine status:   ");
        if (statusAdd == "off") {
            listComputerManagement.add(new computer_1.Computer(idAdd, nameAdd, statusAdd));
            var index1 = listComputerManagement.findById(idAdd);
            if (listComputerManagement.listComputer[index1].status == "on") {
                listComputerManagement.listComputer[index1].time.startTime = Date.now();
                showComputer();
            }
        }
        else if (statusAdd == "on") {
            listComputerManagement.add(new computer_1.Computer(idAdd, nameAdd, statusAdd));
            var index2 = listComputerManagement.findById(idAdd);
            listComputerManagement.listComputer[index2].time.startTime = Date.now();
            showComputer();
        }
        else {
            console.log("Machine state can only be \"on\" or \"off\", re-enter");
        }
    }
    else if (idAdd >= 0) {
        console.log("Id already exists, please re-enter!");
    }
    else {
        console.log("Id is not satisfied, please re-enter!");
    }
}
function deleteComputer() {
    var idDelete = +input.question("Enter the id you want to delete:  ");
    if (listComputerManagement.findById(idDelete) == -1 && idDelete >= 0) {
        console.log("Id does not exist");
    }
    else {
        var menuDelete = "\n    You may want to delete ?\n    1. Delete\n    0. Exit\n    ";
        var choice = void 0;
        do {
            console.log(menuDelete);
            choice = input.question("Enter selection:   ");
            switch (choice) {
                case "1":
                    listComputerManagement["delete"](idDelete);
                    showComputer();
                    console.log("Deleted successfully!");
                    break;
                case "0":
                    break;
            }
        } while (choice != "0");
    }
}
function editComputer() {
    var idEdit = +input.question("Enter the id you want to edit:   ");
    if (listComputerManagement.findById(idEdit) == -1 && idEdit > 0) {
        console.log("The id you want to fix does not exist!");
    }
    else {
        var nameEdit = input.question(" Enter a new name:   ");
        var statusEdit = input.question("Enter a new status:   ");
        var index3 = listComputerManagement.findById(idEdit);
        if (statusEdit == "on") {
            if (listComputerManagement.listComputer[index3].status == "on") {
                console.log("machine is online!!");
            }
            else if (listComputerManagement.listComputer[index3].status == "off") {
                listComputerManagement.listComputer[index3].status = "on";
                listComputerManagement.edit(idEdit, new computer_1.Computer(idEdit, nameEdit, statusEdit));
                listComputerManagement.listComputer[index3].time.startTime = Date.now();
                // showComputer();
                return Date.now();
                return showComputer();
            }
        }
        else if (statusEdit == "off") {
            if (listComputerManagement.listComputer[index3].status == "on") {
                listComputerManagement.listComputer[index3].status = "off";
                listComputerManagement.edit(idEdit, new computer_1.Computer(idEdit, nameEdit, statusEdit));
                listComputerManagement.listComputer[index3].time.endTime = Date.now();
                showComputer();
                console.log("Closed the second machine:   " + (index3 + 1));
                var totalTime = (listComputerManagement.listComputer[index3].time.endTime - listComputerManagement.listComputer[index3].time.startTime) / 60000;
                var totalMoney = totalTime * price + priceService;
                console.log("Used Time:   " + totalTime + " minute ");
                console.log("Total amount:   " + totalMoney + "USD");
                return totalMoney;
            }
        }
        else {
            console.log("Machine state can only be \"on\" or \"off\", re-enter");
        }
    }
}
function openComputer() {
    var menu = "\n    1. Open machine\n    2. More services\n    0. Exit\n    ";
    var choice;
    do {
        console.log(menu);
        choice = input.question("Enter selection:   ");
        switch (choice) {
            case "1":
                var idOpen = +input.question("Enter the device id you want to open:   ");
                if (listComputerManagement.findById(idOpen) == -1 && idOpen >= 0) {
                    console.log("Id does not exist!");
                }
                else {
                    var index = listComputerManagement.findById(idOpen);
                    if (listComputerManagement.listComputer[index].status == "off") {
                        listComputerManagement.listComputer[index].status = "on";
                        listComputerManagement.listComputer[index].time.startTime = Date.now();
                        showComputer();
                        console.log("The device has been opened!");
                    }
                    else {
                        console.log("Machine is working!");
                    }
                }
                break;
            case "2":
                var idAdd = +input.question("Machine id add service:   ");
                if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
                    console.log("Id does not exist!");
                }
                else {
                    var index1 = listComputerManagement.findById(idAdd);
                    if (listComputerManagement.listComputer[index1].status == "off") {
                        console.log("Machine not working!");
                    }
                    else if (listComputerManagement.listComputer[index1].status == "on") {
                        console.log(listServiceManagement);
                        var idService = +input.question("Enter service id:   ");
                        if (idService >= 1 && idService <= 4) {
                            var index2 = listServiceManagement.findById(idService);
                            listComputerManagement.listComputer[index1].service.push(listServiceManagement.listService[index2]);
                            for (var i = 0; i < listComputerManagement.listComputer.length; i++) {
                                if (i == index1) {
                                    console.log(listComputerManagement.listComputer[index1].service);
                                    for (var j = 0; j < listServiceManagement.listService.length; j++) {
                                        if (j == index2) {
                                            console.log(listServiceManagement.listService[index2].nameService + " Price:  " + listServiceManagement.listService[index2].price);
                                            priceService += listServiceManagement.listService[index2].price;
                                            return priceService;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            console.log("Id does not exist!");
                        }
                    }
                    return dailyIncome.income += priceService;
                }
                break;
            case "0":
                break;
            default:
                console.log("Entered wrong, enter again");
                break;
        }
    } while (choice != "0");
}
function offComputer() {
    var totalMoney = 0;
    var idOff = +input.question("Enter the id of the device you want to close:   ");
    if (listComputerManagement.findById(idOff) == -1 && idOff >= 0) {
        console.log("Id does not exist, please re-enter!!");
    }
    else {
        var index1 = listComputerManagement.findById(idOff);
        if (listComputerManagement.listComputer[index1].status == "off") {
            console.log("Machine not working!");
        }
        else if (listComputerManagement.listComputer[index1].status == "on") {
            listComputerManagement.listComputer[index1].status = "off";
            listComputerManagement.listComputer[index1].time.endTime = Date.now();
            showComputer();
            console.log("Closed the second machine:   " + (index1 + 1));
            var totalTime = (listComputerManagement.listComputer[index1].time.endTime - listComputerManagement.listComputer[index1].time.startTime) / 60000;
            var totalMoney_1 = totalTime * price + priceService;
            console.log("Used Time:   " + totalTime + " minute ");
            console.log("Total amount:   " + totalMoney_1 + "USD");
            return totalMoney_1;
        }
    }
    return dailyIncome.income += totalMoney;
}
function priceEdit() {
    var newPrice = +input.question("New price: ");
    price = newPrice;
}
function addAccount() {
    var menuAccount = "\n    ------Account-----\n    1. Add account\n    2. Edit account\n    3. Delete account\n    4. Show list of accounts\n    0. Exit\n    ";
    var choice1;
    do {
        console.log(menuAccount);
        choice1 = input.question("Enter selection:   ");
        switch (choice1) {
            case "1":
                var id1 = +input.question("Enter user id:   ");
                if (listAccountManagement.findById(id1) == -1 && id1 >= 0) {
                    var name1 = input.question("Enter user name:   ");
                    var pass1 = input.question("Enter user pass:   ");
                    var user = new account_1.Account(id1, name1, pass1);
                    listAccountManagement.add(user);
                }
                else {
                    console.log("id already exists, please re-enter");
                }
                break;
            case "2":
                var id2 = +input.question("The account id you want to edit:   ");
                if (listAccountManagement.findById(id2) == -1 && id2 >= 0) {
                    console.log("id does not exist, please re-enter");
                }
                else {
                    var name2 = input.question("New name: ");
                    var pass2 = input.question("New pass: ");
                    listAccountManagement.edit(id2, new account_1.Account(id2, name2, pass2));
                }
                break;
            case "3":
                var id3 = +input.question("The account id you want to delete: ");
                if (listAccountManagement.findById(id3) == -1 && id3 >= 0) {
                    console.log("id does not exist, please re-enter");
                }
                else {
                    listAccountManagement["delete"](id3);
                }
                break;
            case "4":
                listAccountManagement.show();
                break;
            case "0":
                break;
        }
    } while (choice1 != "0");
}
function turnover() {
    console.log("Revenue up to now: ");
    console.log("".concat(dailyIncome.date, ":$").concat(dailyIncome.income, " ") + "USD");
}
account();
