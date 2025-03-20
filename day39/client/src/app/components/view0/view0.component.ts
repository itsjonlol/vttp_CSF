import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterStore } from '../../store/character.store';
import { Observable } from 'rxjs';
import { Character } from '../../model/models';

@Component({
  selector: 'app-view0',
  standalone: false,
  templateUrl: './view0.component.html',
  styleUrl: './view0.component.css'
})
export class View0Component  implements OnInit{

    protected form!:FormGroup

    private fb = inject(FormBuilder);

    characterStore = inject(CharacterStore);
    characters$ : Observable<Character[]> = this.characterStore.characters$
    error$: Observable<string | null> = this.characterStore.error$


    ngOnInit(): void {
        this.form = this.createForm()
        this.characterStore.setCharacters([])
    }

    processForm():void {
      const query = this.form.value.query
      console.log(this.form.value)
      this.form = this.createForm();
      this.characterStore.loadCharactersFromQuery(query);
    }

    createForm():FormGroup {
      return this.fb.group({
        query: this.fb.control<string>('')

      })
    }



}
