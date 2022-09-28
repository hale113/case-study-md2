import {Manager} from "./manager";
import {Computer} from "../model/computer";

export class ComputerManagement implements Manager<Computer> {
    listComputer: Computer[] = [];

    constructor() {
        let may1 = new Computer(1, "may 1", "off");
        let may2 = new Computer(2, "may 2", "off");
        let may3 = new Computer(3, "may 3", "off");
        let may4 = new Computer(4, "may 4", "off");
        let may5 = new Computer(5, "may 5", "off");
        let may6 = new Computer(6, "may 6", "off");
        let may7 = new Computer(7, "may 7", "off");
        let may8 = new Computer(8, "may 8", "off");
        let may9 = new Computer(9, "may 9", "off");
        let may10 = new Computer(10, "may 10", "off");
        this.listComputer.push(may1, may2, may3, may4, may5, may6, may7, may8, may9, may10);
    }

    add(t: Computer): void {
        this.listComputer.push(t);
    }

    delete(id: number) {
        let index = this.findById(id);
        this.listComputer.splice(index, 1)
    }

    edit(id: number, t: Computer) {
        let index = this.findById(id);
        this.listComputer[index] = t;
    }

    findById(id: number) {
        for (let i = 0; i < this.listComputer.length; i++) {
            if (this.listComputer[i].id == id) {
                return i;
            }
        }
        return -1;
    }


    show() {
        return this.listComputer;
    }
}