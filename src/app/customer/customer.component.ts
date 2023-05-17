import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';  
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit { 

  success: boolean = false;
  errors! : String[];

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

  /*createCustomer():void{
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
  }*/

  createCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');
    
    this.service.save(this.customer).subscribe({next: response => {
      this.success = true;
      this.errors = [];    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})
  }

  verificaCpf(): void{
    this.service.findByCpf(this.cpfCustomer.value)
      .subscribe((response) => {
        if (response){
          this.toast.error('CPF já cadastrado no banco','Erro');
          //alert("CPF já cadastrado no banco de dados !");
          this.cpfCustomer.setValue("");
          this.setFocusCampo("cpfCustomer");
        }else{
          console.log("Não existe");
        }
      });
  }

  setFocusCampo(nomeFormulario : String) {
    //console.log("teste");
    const input = document.querySelector('[formControlName="'+ nomeFormulario + '"]') as HTMLInputElement;
    input.focus;
  }

  validaCampos(): boolean {
    return this.firstNameCustomer.valid && this.lastNameCustomer.valid
        && this.birthdateCustomer.valid && this.cpfCustomer.valid && this.monthlyIncomeCustomer.valid
     && this.emailCustomer.valid && this.passwordCustomer.valid
  }

  
  
  }  









