export class Service{
    private _id:number;
    private _nameService: string;
    private _price: number;

    constructor(id: number, nameService: string, price: number) {
        this._id = id;
        this._nameService = nameService;
        this._price = price;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nameService(): string {
        return this._nameService;
    }

    set nameService(value: string) {
        this._nameService = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}