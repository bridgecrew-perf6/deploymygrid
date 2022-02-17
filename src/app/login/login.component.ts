import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form !: FormGroup;
  submitted = false;
  constructor( private formBuilder : FormBuilder) { }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName : ['', Validators.required],
      password : ['', Validators.required],
      acceptTerms : [false, Validators.requiredTrue]
    })
  }
  get f(): {[key : string]:AbstractControl}{
    return this.form.controls;
  }
  onSubmit(): void{
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  

}
