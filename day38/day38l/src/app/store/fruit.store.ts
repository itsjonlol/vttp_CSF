import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

export interface Fruit{
    name:string;
}

export interface FruitState {
    fruits: Fruit[]
}

const INIT_STATE: FruitState = {
    fruits: []
}


@Injectable(
    {providedIn:'root'}
)

export class FruitStore extends ComponentStore<FruitState> {


    constructor() {
        super(INIT_STATE)
    }

    readonly getFruits:Observable<Fruit[]> = this.select((state)=>state.fruits)

    readonly getFruitByName = (name:string):Observable<Fruit | undefined> => this.select((state)=> {
        return state.fruits.find((fruit:Fruit)=>fruit.name ===name)
    })

 
    

    //addFruit(fruit:Fruit)
    readonly addFruit = this.updater<Fruit>((state,fruit)=>{
        return {
            ...state,
            fruits: [...state.fruits,fruit]
        }
    })

    readonly addFruit2 = this.updater<Fruit>((state,fruit:Fruit) => {
        const newFruitState = {
            fruits: [...state.fruits,fruit]
        }
        return newFruitState;
    } )

    readonly fruitsCartLength: Observable<number> = this.select((state)=>state.fruits.length)
    //deleteFruit(name:string)

    readonly deleteFruit = this.updater<string>((state,name:string)=> {
       return {
        ...state,
        fruits: state.fruits.filter( (fruit) => fruit.name !== name)
       }

    })

    readonly deleteFruit2 = this.updater<string>((state,name:string)=> {
        const newFruitState = {
            fruits: state.fruits.filter((fruit:Fruit)=> fruit.name !==name)
        }

        return newFruitState;
    })

    

    /// ...spread is to unroll

}