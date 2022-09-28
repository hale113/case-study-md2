import {Account} from "../model/account";
import {AccountManagement} from "../servike/accountManagement";
import {Computer} from "../model/computer";
import {ComputerManagement} from "../servike/computerManagement";
import {ServiceManagement} from "../servike/serviceManagement";
import {Service} from "../model/service";
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

function account() {
    let menu = `
    ---Phan mem tinh tien---
    1. Dang ky
    2. Dang nhap
    0. Dang xuat
    `

    let choice: number;
    do {
        console.log(menu)
        choice = +input.question("Lua chon cua ban: ");
        switch (choice) {
            case 1:
                let id1 = +input.question("nhap id nguoi dung: ")
                let name1 = input.question("Tao ten nguoi dung: ");
                let pass1 = input.question("Tao mat khau (2-5 ky tu chu va 2-5 ky tu so): ");
                let user = new Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                let userName = input.question("nhap ten nguoi dung: ");
                let userPass = input.question("nhap mat khau: ");
                if (userName == "ha" && userPass == "ha12345") {
                    adminMenu();
                }
                if (userName == name1 && userPass == pass1) {
                    adminMenu();
                } else {
                    console.log("id hoac ten dang nhap sai, nhap lai di!!")
                }
                break;
            case 0:
                break;
            default:
                console.log("sai roi nhap lai di")
                break;
        }
    } while (choice != 0);
}

function adminMenu() {
    let menu1 = `
    ------Menu Quan Ly-------
    1. Hien thi danh sach may co trong quan
    2. Them mot may moi vao danh sach
    3. Mo may va them dich vu
    4. Dong may va tinh tien
    5. Sua doi thong tin cua may
    6. Xoa mot may khoi danh sach
    7. Chinh sua gia tien 
    8. Quan li tai khoan dang nhap
    9. Doanh thu
    0. Thoat
    `
    let choice: number;
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
                offComputer();
                break;
            case 5:
                editComputer()
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
                console.log("sai rôi nhap lai di")
                break;
        }
    } while (choice != 0)
}

function showComputer() {
    console.log(listComputerManagement.show());
}

function addComputer() {
    let idAdd = +input.question("nhap id may moi: ");
    if (listComputerManagement.findById(idAdd) == -1 && idAdd >= 0) {
        let nameAdd = input.question("nhap vao ten may: ");
        let statusAdd = input.question("nhap vao trang thai may: ");
        listComputerManagement.add(new Computer(idAdd, nameAdd, statusAdd));
    } else if (idAdd >= 0) {
        console.log("id da ton tai vui long nhap lai!")
    } else {
        console.log("id khong thoa man, vui long nhap lai")
    }


}

function deleteComputer() {
    let idDelete = +input.question("nhap vao id may muon xoa: ");
    if (listComputerManagement.findById(idDelete) == -1) {
        console.log("id khong ton tai")
    } else {
        let menuDelete = `
    Ban co muon xoa khong ?
    1. xoa 
    0. thoat
    `
        let choice: number;
        do {
            console.log(menuDelete);
            choice = +input.question("nhap lua chon cua ban: ");
            switch (choice) {
                case 1:
                    listComputerManagement.delete(idDelete);
                    showComputer();
                    console.log("Da xoa thanh cong");
                    break;
                case 0:
                    break;
            }
        } while (choice != 0)
    }
}

function editComputer() {
    let idEdit = +input.question("nhap vao id may muon sua: ");
    if (listComputerManagement.findById(idEdit) == -1) {
        console.log("id muon sua khong ton tai")
    } else {
        let nameEdit = input.question(" vao ten moi: ");
        let statusEdit = input.question("nhap trang thai moi: ");
        listComputerManagement.edit(idEdit, new Computer(idEdit, nameEdit, statusEdit));
    }
}

function openComputer() {

    let menu = `
    1. Mo may
    2. Them dich vu
    0. Thoat
    `
    let choice: number;
    do {
        console.log(menu);
        choice = +input.question("nhap lua chon cua ban");
        switch (choice) {
            case 1:
                let idOpen = +input.question("nhap vao id may muon mo");
                if (listComputerManagement.findById(idOpen) == -1) {
                    console.log("id khong ton tai!");
                } else {
                    let index = listComputerManagement.findById(idOpen);
                    if (listComputerManagement.listComputer[index].status == "off"){
                        listComputerManagement.listComputer[index].status = "on";
                        listComputerManagement.listComputer[index].time.startTime = Date.now();
                        showComputer();
                        console.log("da mo may");
                    }else {
                        console.log("may dang hoat dong")
                    }
                }
                break;
            case 2:
                let idAdd = +input.question("nhap id may muon them dv: ");
                if (listComputerManagement.findById(idAdd) == -1) {
                    console.log("id khong ton tai!");
                } else {
                    let index1 = listComputerManagement.findById(idAdd);
                    if (listComputerManagement.listComputer[index1].status == "off") {
                        console.log("may khong hoat dong");
                    } else if (listComputerManagement.listComputer[index1].status == "on") {
                        console.log(listServiceManagement);
                        let idService = +input.question("nhap id dv: ");
                        if (idService >= 1 && idService <= 4) {
                            let index2 = listServiceManagement.findById(idService);
                            listComputerManagement.listComputer[index1].service.push(listServiceManagement.listService[index2]);
                            for (let i = 0; i < listComputerManagement.listComputer.length; i++) {
                                if (i == index1) {
                                    console.log(listComputerManagement.listComputer[index1].service);
                                    for (let j = 0; j < listServiceManagement.listService.length; j++) {
                                        if (j == index2) {
                                            console.log(listServiceManagement.listService[index2].nameService + " gia:" + listServiceManagement.listService[index2].price);
                                            priceService += listServiceManagement.listService[index2].price;
                                            return priceService;
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log("id khong ton tai!")
                        }
                    }
                    return dailyIncome.income += priceService;
                }
                break;
            case 0:
                break;
            default:
                console.log("nhap sai roi nhap lai di")
                break;
        }
    } while (choice != 0)
}

function offComputer() {
    let totalMoney = 0;
    let idOff = +input.question("nhap vao id may muon dong: ");
    if (listComputerManagement.findById(idOff) == -1) {
        console.log("id khong ton tai! vui long nhap lai!!")
    } else {
        let index1 = listComputerManagement.findById(idOff);
        if (listComputerManagement.listComputer[index1].status == "off") {
            console.log("may chua hoat dong");
        } else if (listComputerManagement.listComputer[index1].status == "on") {
            listComputerManagement.listComputer[index1].status = "off";
            listComputerManagement.listComputer[index1].time.endTime = Date.now();
            showComputer();
            console.log("da dong may: " + (index1 + 1));
            let totalTime = (listComputerManagement.listComputer[index1].time.endTime - listComputerManagement.listComputer[index1].time.startTime) / 1000;
            let totalMoney = totalTime * price + priceService;
            console.log("thoi gian sd: " + totalTime + " s ");
            console.log("tong tien: " + totalMoney +  "USD");
        }
    }
  return  dailyIncome.income += totalMoney;

}


function priceEdit() {
    let newPrice = +input.question("nhap gia theo giay: ");
    price = newPrice;
}

function addAccount() {
    let menuAccount = `
    1. Them tai khoan
    2. Sua tai khoan
    3. Xoa tai khoan
    4. Hien thi toan bo tai khoan quan ly
    0. Thoat
    `
    let choice1: number;
    do {
        console.log(menuAccount);
        choice1 = +input.question("lua chon cua ban: ");
        switch (choice1) {
            case 1:
                let id1 = +input.question("nhap id nguoi dung: ")
                let name1 = input.question("Tao ten nguoi dung: ");
                let pass1 = input.question("Tao mat khau (2-5 ky tu chu va 2-5 ky tu so): ");
                let user = new Account(id1, name1, pass1);
                listAccountManagement.add(user);
                break;
            case 2:
                let id2 = +input.question("nhap id tk muon sua: ");
                let name2 = input.question("Ten moi: ");
                let pass2 = input.question("Mat khau moi: ")
                listAccountManagement.edit(id2, new Account(id2, name2, pass2));
                break;
            case 3:
                let id3 = +input.question("nhap id muon xoa: ")
                listAccountManagement.delete(id3);
                break;
            case 4:
                listAccountManagement.show();
                break;
            case 0:
                break;
        }
    } while (choice1 != 0)
}

function turnover() {
    console.log("thu nhap den thoi diem hien tai la: ");
    console.log(`${dailyIncome.date}:$${dailyIncome.income}`)
}

 account();

