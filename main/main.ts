import {Account} from "../model/account";
import {AccountManagement} from "../servike/accountManagement";
import {Computer} from "../model/computer";
import {ComputerManagement} from "../servike/computerManagement";
import {ServiceManagement} from "../servike/serviceManagement";
import {DailyIncome} from "../model/dailyIncome";
let listAccountManagement: AccountManagement = new AccountManagement();
let listComputerManagement: ComputerManagement = new ComputerManagement();
let listServiceManagement: ServiceManagement = new ServiceManagement();
let input = require('readline-sync');
let price = 10;
let priceService = 0;
let currentDate = new Date();
let dailyIncome = new DailyIncome();
dailyIncome.date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
dailyIncome.income = 0;

function account() {
    let menu = `
    ====Billing Software====
    1. Register
    2. Login
    0. Log out
    `
    let choice: number;
    do {
        console.log(menu)
        choice = +input.question("Enter selection: ");
        switch (choice) {
            case 1:
                let id1 = +input.question("Enter new user id: ");
                let name1 = input.question("Enter new user name: ");
                let pass1 = input.question("Enter new user pass: ");
                let user = new Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                let userName = input.question("Enter user name: ");
                let userPass = input.question("Enter user pass: ");
                if (userName == "ha" && userPass == "ha12345") {
                    adminMenu();
                }
                if (userName == name1 && userPass == pass1) {
                    adminMenu();
                } else {
                    console.log("Wrong username or id, re-enter!!");
                }
                break;
            case 0:
                break;
            default:
                console.log("Wrong, please re-enter");
                break;
        }
    } while (choice != 0);
}

function adminMenu() {
    let menu1 = `
    ------Management menu------
    1. Show list of computers
    2. Add a new machine
    3. Turn on the machine and Add a service
    4. Close the machine and Pay
    5. Edit machine information
    6. Remove a machine from the list
    7. Edit price 
    8. Account Management
    9. Turnover
    0. Exit
    `
    let choice: number;
    do {
        console.log(menu1);
        choice = +input.question("Enter selection: ");
        switch (choice) {
            case 1:
                showComputer();
                break;
            case 2:
                addComputer();
                break;
            case 3:
                openComputer();
                break;
            case 4:
                dailyIncome.income += offComputer();
                break;
            case 5:
                editComputer();
                break;
            case 6:
                deleteComputer();
                break;
            case 7:
                priceEdit();
                break;
            case 8:
                addAccount();
                break;
            case 9:
                turnover();
                break;
            case 0:
                break;
            default:
                console.log("Wrong then re-enter");
                break;
        }
    } while (choice != 0)
}

function showComputer() {
    console.log(listComputerManagement.show());
}

function addComputer() {
    let idAdd = +input.question("Enter new device id: ");
    if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
        let nameAdd = input.question("Enter new device name: ");
        let statusAdd = input.question("Enter machine status: ");
        listComputerManagement.add(new Computer(idAdd, nameAdd, statusAdd));
    } else if (idAdd >= 0) {
        console.log("Id already exists, please re-enter!");
    } else {
        console.log("Id is not satisfied, please re-enter!");
    }


}

function deleteComputer() {
    let idDelete = +input.question("Enter the id you want to delete: ");
    if (listComputerManagement.findById(idDelete) == -1) {
        console.log("Id does not exist");
    } else {
        let menuDelete = `
    You may want to delete ?
    1. Delete
    0. Exit
    `
        let choice: number;
        do {
            console.log(menuDelete);
            choice = +input.question("Enter selection: ");
            switch (choice) {
                case 1:
                    listComputerManagement.delete(idDelete);
                    showComputer();
                    console.log("Deleted successfully!");
                    break;
                case 0:
                    break;
            }
        } while (choice != 0);
    }
}

function editComputer() {
    let idEdit = +input.question("Enter the id you want to edit: ");
    if (listComputerManagement.findById(idEdit) == -1) {
        console.log("The id you want to fix does not exist!");
    } else {
        let nameEdit = input.question(" Enter a new name: ");
        let statusEdit = input.question("Enter a new status: ");
        listComputerManagement.edit(idEdit, new Computer(idEdit, nameEdit, statusEdit));
    }
}

function openComputer() {

    let menu = `
    1. Open machine
    2. More services
    0. Exit
    `
    let choice: number;
    do {
        console.log(menu);
        choice = +input.question("Enter selection: ");
        switch (choice) {
            case 1:
                let idOpen = +input.question("Enter the device id you want to open: ");
                if (listComputerManagement.findById(idOpen) == -1) {
                    console.log("Id does not exist!");
                } else {
                    let index = listComputerManagement.findById(idOpen);
                    if (listComputerManagement.listComputer[index].status == "off") {
                        listComputerManagement.listComputer[index].status = "on";
                        listComputerManagement.listComputer[index].time.startTime = Date.now();
                        showComputer();
                        console.log("The device has been opened!");
                    } else {
                        console.log("Machine is working!");
                    }
                }
                break;
            case 2:
                let idAdd = +input.question("Machine id add service: ");
                if (listComputerManagement.findById(idAdd) == -1) {
                    console.log("Id does not exist!");
                } else {
                    let index1 = listComputerManagement.findById(idAdd);
                    if (listComputerManagement.listComputer[index1].status == "off") {
                        console.log("Machine not working!");
                    } else if (listComputerManagement.listComputer[index1].status == "on") {
                        console.log(listServiceManagement);
                        let idService = +input.question("Enter service id: ");
                        if (idService >= 1 && idService <= 4) {
                            let index2 = listServiceManagement.findById(idService);
                            listComputerManagement.listComputer[index1].service.push(listServiceManagement.listService[index2]);
                            for (let i = 0; i < listComputerManagement.listComputer.length; i++) {
                                if (i == index1) {
                                    console.log(listComputerManagement.listComputer[index1].service);
                                    for (let j = 0; j < listServiceManagement.listService.length; j++) {
                                        if (j == index2) {
                                            console.log(listServiceManagement.listService[index2].nameService + " Price:" + listServiceManagement.listService[index2].price);
                                            priceService += listServiceManagement.listService[index2].price;
                                            return priceService;
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log("Id does not exist!");
                        }
                    }
                    return dailyIncome.income += priceService;
                }
                break;
            case 0:
                break;
            default:
                console.log("Entered wrong, enter again");
                break;
        }
    } while (choice != 0);
}

function offComputer() {
    let totalMoney = 0;
    let idOff = +input.question("Enter the id of the device you want to close: ");
    if (listComputerManagement.findById(idOff) == -1) {
        console.log("Id does not exist, please re-enter!!");
    } else {
        let index1 = listComputerManagement.findById(idOff);
        if (listComputerManagement.listComputer[index1].status == "off") {
            console.log("Machine not working!");
        } else if (listComputerManagement.listComputer[index1].status == "on") {
            listComputerManagement.listComputer[index1].status = "off";
            listComputerManagement.listComputer[index1].time.endTime = Date.now();
            showComputer();
            console.log("Closed the second machine: " + (index1 + 1));
            let totalTime = (listComputerManagement.listComputer[index1].time.endTime - listComputerManagement.listComputer[index1].time.startTime) / 1000;
            let totalMoney = totalTime * price + priceService;
            console.log("Used Time: " + totalTime + " s ");
            console.log("Total amount: " + totalMoney + "USD");
            return totalMoney;
        }
    }
    return dailyIncome.income += totalMoney;

}

function priceEdit() {
    let newPrice = +input.question("New price: ");
    price = newPrice;
}

function addAccount() {
    let menuAccount = `
    ------Account-----
    1. Add account
    2. Edit account
    3. Delete account
    4. Show list of accounts
    0. Exit
    `
    let choice1: number;
    do {
        console.log(menuAccount);
        choice1 = +input.question("Enter selection: ");
        switch (choice1) {
            case 1:
                let id1 = +input.question("Enter user id: ")
                let name1 = input.question("Enter user name: ");
                let pass1 = input.question("Enter user pass: ");
                let user = new Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                let id2 = +input.question("The account id you want to edit: ");
                let name2 = input.question("New name: ");
                let pass2 = input.question("New pass: ");
                listAccountManagement.edit(id2, new Account(id2, name2, pass2));
                break;
            case 3:
                let id3 = +input.question("The account id you want to delete: ");
                listAccountManagement.delete(id3);
                break;
            case 4:
                listAccountManagement.show();
                break;
            case 0:
                break;
        }
    } while (choice1 != 0);
}

function turnover() {
    console.log("Revenue up to now: ");
    console.log(`${dailyIncome.date}:$${dailyIncome.income} `+"USD");
}

account();

