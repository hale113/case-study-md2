export class Account {
    private _idUser: number;
    private _name:string;
    private _pass: number;



    constructor(id: number, name: string, pass: number) {
        this._idUser = id;
        this._name = name;
        this._pass = pass;

    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get pass(): number {
        return this._pass;
    }

    set pass(value: number) {
        this._pass = value;
    }

    get idUser(): number {
        return this._idUser;
    }

    set idUser(value: number) {
        this._idUser = value;
    }

}