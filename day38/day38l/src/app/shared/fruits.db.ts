import { Injectable } from "@angular/core";
import Dexie from "dexie";

import { Fruit } from "../store/fruit.store";
import { from, Observable } from "rxjs";

@Injectable(
    { providedIn: "root" }
)

export class FruitDb extends Dexie {
    fruits: Dexie.Table<Fruit, string>;

    constructor() {
        super("FruitDb");
        this.version(1).stores({
            fruits: "name"
        });
        this.fruits = this.table("fruits");

    }


    removeFruit(name: string):Promise<string>{ // returns name of deleted string
        return this.fruits.delete(name).then(() => name);
    }
    async removeFruit2(name:string) {
        await this.fruits.delete(name);
    }

    removeFruit3(name:string):Observable<void> {
        return from(this.fruits.delete(name));
    }

    saveFruit(fruit: Fruit): Promise<Fruit> {
        return this.fruits.put(fruit).then(() => fruit);
    }
    
    async saveFruit2(fruit:Fruit):Promise<void> {
        await this.fruits.put(fruit);
    }

    

    getAllFruits(): Promise<Fruit[]> {
        return this.fruits.toArray();
    }

    async getAllFruits2():Promise<Fruit[]> {
       return await this.fruits.toArray(); 
    }

    getAllFruits3():Observable<Fruit[]> {
        return from(this.fruits.toArray());
    }
}