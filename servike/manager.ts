export interface Manager<T>{
    add(t: T):void;

    show();

    edit(id:number,t:T);

    delete(id:number);

    findById(id:number);
}