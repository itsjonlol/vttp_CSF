import { Component, inject, OnInit } from '@angular/core';
import * as jsonData from '../../../../public/countries.json';
import { Country } from '../../model/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jsonexample',
  standalone: false,
  templateUrl: './jsonexample.component.html',
  styleUrl: './jsonexample.component.css'
})
export class JsonexampleComponent implements OnInit{
  data:any = jsonData

  countryData: Country[] = this.data.default

  form!:FormGroup

  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm():FormGroup {
    return this.fb.group({
      city: this.fb.control<string>('')
    })
  }
}
