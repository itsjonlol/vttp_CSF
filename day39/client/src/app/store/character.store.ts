import { inject, Injectable } from "@angular/core";
import { Character } from "../model/models";
import { CharacterService } from "../service/character.service";
import { Router } from "@angular/router";
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export interface CharacterState {
   characters: Character[]
   error: string | null

}
//#2
const INIT_STATE = {
   characters:[],
   error:null
}
//#3
@Injectable({
    providedIn: 'root'
 })

export class CharacterStore extends ComponentStore<CharacterState> {


    characterService = inject(CharacterService);
    router = inject(Router);

    //#4
    constructor() {
        super(INIT_STATE)
    }



    //selectors

    readonly characters$:Observable<Character[]> = this.select((state) => state.characters)
    readonly error$:Observable<string | null> = this.select((state)=> state.error)
    readonly characterById$ = (id:number):Observable<Character | undefined> => this.select((state)=>{
        return state.characters.find(character => character.characterId === id)
    })

    //updaters  
    readonly setCharacters = this.updater((state,characters:Character[]) => ({
        ...state,
        characters: characters
        
    }))

    readonly setError = this.updater((state,error:string | null)=> ({
        ...state,
        error:error
    }))

    

    //effects
    readonly loadCharactersFromQuery = this.effect((trigger$:Observable<string>) => 
        trigger$.pipe(
            switchMap((query) => this.characterService.getCharacters(query).pipe(
                tap((response:Character[])=>{
                    this.setCharacters(response)
                    this.setError(null)

                }),
                catchError((error:HttpErrorResponse)=>{
                    this.setCharacters([])
                 this.setError(error.error.message)
                return EMPTY
                })

            ))
        )
    )

    // readonly loadEmployees = this.effect(trigger$ => {
    //     return trigger$.pipe(
    //         tap( () => this.setIsLoading(true)),
    //         switchMap(() => this.employeeService.getEmployees().pipe(
    //             tap( (employees) => {
    //                 this.setIsLoading(false)
    //                 this.setEmployees(employees)}),
    //             catchError((error:HttpErrorResponse) => {
    //                 this.setError(error)
    //                 return EMPTY
    //             })
    //         ))
    //     )
    // } )
}