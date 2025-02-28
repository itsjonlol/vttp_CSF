import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-debounce',
  standalone: false,
  templateUrl: './debounce.component.html',
  styleUrl: './debounce.component.css'
})
export class DebounceComponent implements OnInit,OnDestroy {

  form!: FormGroup
  private fb = inject(FormBuilder)

  subscription !: Subscription

  ngOnInit(): void {
    this.form = this.createForm();
    this.subscription= this.form.valueChanges
      .pipe(debounceTime(3000))
      .subscribe(value => console.log(value))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm():FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('')
    })
  }
}
