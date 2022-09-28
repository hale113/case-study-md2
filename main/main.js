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
var price = 10;
var priceService = 0;
var currentDate = new Date();
var dailyIncome = new dailyIncome_1.DailyIncome();
dailyIncome.date = "".concat(currentDate.getDate(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getFullYear());
dailyIncome.income = 0;
function account() {
    var menu = "\n    ---Phan mem tinh tien---\n    1. Dang ky\n    2. Dang nhap\n    0. Dang xuat\n    ";
    var choice;
    do {
        console.log(menu);
        choice = +input.question("Lua chon cua ban: ");
        var name1 = input.question("Tao ten nguoi dung: ");
        var pass1 = input.question("Tao mat khau (2-5 ky tu chu va 2-5 ky tu so): ");
        switch (choice) {
            case 1:
                var id1 = +input.question("nhap id nguoi dung: ");
                var user = new account_1.Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                var userName = input.question("nhap ten nguoi dung: ");
                var userPass = input.question("nhap mat khau: ");
                if (userName == "ha" && userPass == "ha12345") {
                    adminMenu();
                }
                if (userName == name1 && userPass == pass1) {
                    adminMenu();
                }
                else {
                    console.log("id hoac ten dang nhap sai, nhap lai di!!");
                }
                break;
            case 0:
                break;
            default:
                console.log("sai roi nhap lai di");
                break;
        }
    } while (choice != 0);
}
function adminMenu() {
    var menu1 = "\n    ------Menu Quan Ly-------\n    1. Hien thi danh sach may co trong quan\n    2. Them mot may moi vao danh sach\n    3. Mo may va them dich vu\n    4. Dong may va tinh tien\n    5. Sua doi thong tin cua may\n    6. Xoa mot may khoi danh sach\n    7. Chinh sua gia tien \n    8. Quan li tai khoan dang nhap\n    9. Doanh thu\n    0. Thoat\n    ";
    var choice;
    do {
        console.log(menu1);
        choice = +input.question("nhap lua chon cua ban: ");
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
                console.log("sai rôi nhap lai di");
                break;
        }
    } while (choice != 0);
}
function showComputer() {
    console.log(listComputerManagement.show());
}
function addComputer() {
    var idAdd = +input.question("nhap id may moi: ");
    if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
        var nameAdd = input.question("nhap vao ten may: ");
        var statusAdd = input.question("nhap vao trang thai may: ");
        listComputerManagement.add(new computer_1.Computer(idAdd, nameAdd, statusAdd));
    }
    else if (idAdd >= 0) {
        console.log("id da ton tai vui long nhap lai!");
    }
    else {
        console.log("id khong thoa man, vui long nhap lai");
    }
}
function deleteComputer() {
    var idDelete = +input.question("nhap vao id may muon xoa: ");
    if (listComputerManagement.findById(idDelete) == -1) {
        console.log("id khong ton tai");
    }
    else {
        var menuDelete = "\n    Ban co muon xoa khong ?\n    1. xoa \n    0. thoat\n    ";
        var choice = void 0;
        do {
            console.log(menuDelete);
            choice = +input.question("nhap lua chon cua ban: ");
            switch (choice) {
                case 1:
                    listComputerManagement["delete"](idDelete);
                    showComputer();
                    console.log("Da xoa thanh cong");
                    break;
                case 0:
                    break;
            }
        } while (choice != 0);
    }
}
function editComputer() {
    var idEdit = +input.question("nhap vao id may muon sua: ");
    if (listComputerManagement.findById(idEdit) == -1) {
        console.log("id muon sua khong ton tai");
    }
    else {
        var nameEdit = input.question(" vao ten moi: ");
        var statusEdit = input.question("nhap trang thai moi: ");
        listComputerManagement.edit(idEdit, new computer_1.Computer(idEdit, nameEdit, statusEdit));
    }
}
function openComputer() {
    var menu = "\n    1. Mo may\n    2. Them dich vu\n    0. Thoat\n    ";
    var choice;
    do {
        console.log(menu);
        choice = +input.question("nhap lua chon cua ban");
        switch (choice) {
            case 1:
                var idOpen = +input.question("nhap vao id may muon mo");
                if (listComputerManagement.findById(idOpen) == -1) {
                    console.log("id khong ton tai!");
                }
                else {
                    var index = listComputerManagement.findById(idOpen);
                    if (listComputerManagement.listComputer[index].status == "off") {
                        listComputerManagement.listComputer[index].status = "on";
                        listComputerManagement.listComputer[index].time.startTime = Date.now();
                        showComputer();
                        console.log("da mo may");
                    }
                    else {
                        console.log("may dang hoat dong");
                    }
                }
                break;
            case 2:
                var idAdd = +input.question("nhap id may muon them dv: ");
                if (listComputerManagement.findById(idAdd) == -1) {
                    console.log("id khong ton tai!");
                }
                else {
                    var index1 = listComputerManagement.findById(idAdd);
                    if (listComputerManagement.listComputer[index1].status == "off") {
                        console.log("may khong hoat dong");
                    }
                    else if (listComputerManagement.listComputer[index1].status == "on") {
                        console.log(listServiceManagement);
                        var idService = +input.question("nhap id dv: ");
                        if (idService >= 1 && idService <= 4) {
                            var index2 = listServiceManagement.findById(idService);
                            listComputerManagement.listComputer[index1].service.push(listServiceManagement.listService[index2]);
                            for (var i = 0; i < listComputerManagement.listComputer.length; i++) {
                                if (i == index1) {
                                    console.log(listComputerManagement.listComputer[index1].service);
                                    for (var j = 0; j < listServiceManagement.listService.length; j++) {
                                        if (j == index2) {
                                            console.log(listServiceManagement.listService[index2].nameService + " gia:" + listServiceManagement.listService[index2].price);
                                            priceService += listServiceManagement.listService[index2].price;
                                            return priceService;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            console.log("id khong ton tai!");
                        }
                    }
                    return dailyIncome.income += priceService;
                }
                break;
            case 0:
                break;
            default:
                console.log("nhap sai roi nhap lai di");
                break;
        }
    } while (choice != 0);
}
function offComputer() {
    var totalMoney = 0;
    var idOff = +input.question("nhap vao id may muon dong: ");
    if (listComputerManagement.findById(idOff) == -1) {
        console.log("id khong ton tai! vui long nhap lai!!");
    }
    else {
        var index1 = listComputerManagement.findById(idOff);
        if (listComputerManagement.listComputer[index1].status == "off") {
            console.log("may chua hoat dong");
        }
        else if (listComputerManagement.listComputer[index1].status == "on") {
            listComputerManagement.listComputer[index1].status = "off";
            listComputerManagement.listComputer[index1].time.endTime = Date.now();
            showComputer();
            console.log("da dong may: " + (index1 + 1));
            var totalTime = (listComputerManagement.listComputer[index1].time.endTime - listComputerManagement.listComputer[index1].time.startTime) / 1000;
            var totalMoney_1 = totalTime * price + priceService;
            console.log("thoi gian sd: " + totalTime + " s ");
            console.log("tong tien: " + totalMoney_1 + "USD");
            return totalMoney_1;
        }
    }
    return dailyIncome.income += totalMoney;
}
function priceEdit() {
    var newPrice = +input.question("nhap gia theo giay: ");
    price = newPrice;
}
function addAccount() {
    var menuAccount = "\n    1. Them tai khoan\n    2. Sua tai khoan\n    3. Xoa tai khoan\n    4. Hien thi toan bo tai khoan quan ly\n    0. Thoat\n    ";
    var choice1;
    do {
        console.log(menuAccount);
        choice1 = +input.question("lua chon cua ban: ");
        switch (choice1) {
            case 1:
                var id1 = +input.question("nhap id nguoi dung: ");
                var name1 = input.question("Tao ten nguoi dung: ");
                var pass1 = input.question("Tao mat khau (2-5 ky tu chu va 2-5 ky tu so): ");
                var user = new account_1.Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                var id2 = +input.question("nhap id tk muon sua: ");
                var name2 = input.question("Ten moi: ");
                var pass2 = input.question("Mat khau moi: ");
                listAccountManagement.edit(id2, new account_1.Account(id2, name2, pass2));
                break;
            case 3:
                var id3 = +input.question("nhap id muon xoa: ");
                listAccountManagement["delete"](id3);
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
    console.log("thu nhap den thoi diem hien tai la: ");
    console.log("".concat(dailyIncome.date, ":$").concat(dailyIncome.income, " ") + "USD");
}
account();
