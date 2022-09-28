export class DailyIncome{
    private _date: string;
    private _income: number = 0;


    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get income(): number {
        return this._income;
    }

    set income(value: number) {
        this._income = value;
    }
}