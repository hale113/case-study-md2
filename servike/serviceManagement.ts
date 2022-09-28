import {Service} from "../model/service";
import {Manager} from "./manager";

export class ServiceManagement implements Manager<Service>{
    listService:Service[] = [];
    constructor() {
        let service1 = new Service(1,"coca ", 10000);
        let service2 = new Service(2,"bim bim nho ", 15000);
        let service3 = new Service(3,"sting ",15000);
        let service4 = new Service(4,"bim bim co lon ",20000);
        this.listService.push(service1,service2,service3,service4);
    }
    add(t: Service): void {
      this.listService.push(t);
    }

    delete(id: number) {
    }

    edit(id: number, t: Service) {
    }

    findById(id: number) {
        for (let i = 0; i < this.listService.length; i++) {
            if (this.listService[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    show() {
    }

}