import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from './utils/validation';
import { Router } from '@angular/router';
import { EmployeeModel } from './register.model';
import { ApiService } from '../shared/api.service';
import { style } from '@angular/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  router : any;
  employeeData!: any;
  url : any;
  msg ="";
  employeeModelObj : EmployeeModel = new EmployeeModel();

  constructor(private formBuilder : FormBuilder, private api : ApiService ) { router : Router}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber : ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.geAllEmployee();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  submit(){
    this.router.navigate(['/Login'])
  }

  postEmployeeDetails(){
    this.employeeModelObj.fullName = this.form.value.fullName;
    this.employeeModelObj.userName = this.form.value.userName;
    this.employeeModelObj.email = this.form.value.email;
    this.employeeModelObj.phoneNumber = this.form.value.phoneNumber;
    this.employeeModelObj.password = this.form.value.password;
    this.employeeModelObj.confirmPassword = this.form.value.confirmPassword;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
      alert("Employee Details added Successfully");
      this.form.reset();
    },
    err=>{
      alert("something went wrong");
    })
  }

  geAllEmployee(){
    this.api.getEmployee()
    .subscribe(res => {
      this.employeeData = res;
    })
  }
  
  onEdit(row : any){
    this.employeeModelObj.id = row.id;
    this.form.controls['fullName'].setValue(row.fullName);
    this.form.controls['userName'].setValue(row.userName);
    this.form.controls['email'].setValue(row.email);
    this.form.controls['phoneNumber'].setValue(row.phoneNumber);
    this.form.controls['password'].setValue(row.password);
    this.form.controls['confirmPassword'].setValue(row.confirmPassword);
  }

  updateEmployee(){
    this.employeeModelObj.fullName = this.form.value.fullName;
    this.employeeModelObj.userName = this.form.value.userName;
    this.employeeModelObj.email = this.form.value.email;
    this.employeeModelObj.phoneNumber = this.form.value.phoneNumber;
    this.employeeModelObj.password = this.form.value.password;
    this.employeeModelObj.confirmPassword = this.form.value.confirmPassword;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res => {
      alert("Update Successfully");
      this.geAllEmployee();
    })
  }
  

  deleteEmployee( row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res =>{
      alert("Successfully Deleted")
      this.geAllEmployee();
    })
  }

  selectFile(event : any){
    if(!event.target.files[0] || event.target.files[0].legnth==0){
      this.msg='You must select an image';
      return;
    }
    var mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/)==null){
      this.msg="Only images are Support";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      
      this.msg="";
      this.url = reader.result;
    }
     
  }
   
  
  
  

}


