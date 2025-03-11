import { Injectable } from "@angular/core";
import { City } from "../models/upload-result";
import { ComponentStore } from "@ngrx/component-store";
import { from, Observable, switchMap, tap } from "rxjs";
import { liveQuery } from "dexie";
import { db } from "../shared/app.db";

export interface CityState {
    cities: City[];
    loading:boolean;
}
@Injectable({
    providedIn: 'root'  // Ensures it's available globally
  })
export class CityStore extends ComponentStore<CityState>{
    constructor(){
        super({cities:[], loading:false})
    }
    //selector
    readonly cities$ = this.select(state=> state.cities);
    readonly loading$ = this.select(state=> state.loading);//optional
    readonly setCities = this.updater((state,cities:City[])=>({...state,cities}));//needed
    readonly setLoading = this.updater((state,loading:boolean)=>({...state,loading}));//optional
    //effects
    // Effects -> changes to the state

    /*
    - liveQuery listens for changes in IndexedDB.
	•	If a new city is added, updated, or deleted, the effect automatically re-fetches the latest data.

    */

    readonly loadCities = this.effect((trigger$: Observable<void>) =>
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() => //can populate from liveQuery
                from(liveQuery(() => db.cities.reverse().toArray())).pipe(
                    tap({
                        next: (cities) => this.setCities(cities),
                        error: (error) => this.setLoading(false)
                    })
                )
            )
        )
    );
    //add new city
    readonly addNewCity = this.effect((city$: Observable<City>) =>
        city$.pipe(
            switchMap((city) =>
                from(db.addCity(city)).pipe(
                    //will query the indexdb
                    tap(() => this.loadCities())
                )
            )
        )
    );
}