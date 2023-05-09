import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';  
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit { 
  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer:'',
    monthlyIncomeCustomer:'',
    emailCustomer:'',
    passwordCustomer:'',
    statusCustomer: true
  }

  firstNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  lastNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  cpfCustomer:FormControl =new FormControl(null, Validators.required);
  birthdateCustomer:FormControl = new FormControl(null, Validators.required);
  monthlyIncomeCustomer:FormControl = new FormControl(null, Validators.required);
  emailCustomer:FormControl = new FormControl(null, Validators.email);
  passwordCustomer:FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: CustomerService,
    private toast:    ToastrService,
    private router:Router

  ){}
  
  ngOnInit(): void {}

  createCustomer():void{
    this.service.save(this.customer).subscribe(()=>{
      this.toast.success('Cliente cadastrado com sucesso','Cadastro');
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validaCampos(): boolean {
    return this.firstNameCustomer.valid && this.lastNameCustomer.valid
        && this.birthdateCustomer.valid && this.cpfCustomer.valid && this.monthlyIncomeCustomer.valid
     && this.emailCustomer.valid && this.passwordCustomer.valid
  }

  
  
  }  









