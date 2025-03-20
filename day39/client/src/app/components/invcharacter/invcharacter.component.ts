import { Component, inject, OnInit } from '@angular/core';
import { CharacterStore } from '../../store/character.store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../../model/models';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-invcharacter',
  standalone: false,
  templateUrl: './invcharacter.component.html',
  styleUrl: './invcharacter.component.css'
})
export class InvcharacterComponent implements OnInit {

  characterStore = inject(CharacterStore)
  
  activatedRoute = inject(ActivatedRoute)

  characterId!:number;

  characterFromId$!:Observable<Character | undefined>

  form!:FormGroup
  fb = inject(FormBuilder)

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }


  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
          this.characterId = parseInt(params['characterId'])

          this.form = this.createForm();
          
          this.characterFromId$ = this.characterStore.characterById$(this.characterId)

      })
  }

 

processForm():void {
  const query = this.form.value.query
  console.log(this.form.value)
  this.form = this.createForm();
  this.characterStore.loadCharactersFromQuery(query);
}

createForm():FormGroup {
  return this.fb.group({
    comment: this.fb.control<string>('')

  })
}
} 
