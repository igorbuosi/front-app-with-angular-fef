import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../componentes/confirmation/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer', 'deleteCustomer'];
  ELEMENT_DATA: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    monthlyIncomeCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  firstNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  lastNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  cpfCustomer: FormControl = new FormControl(null, Validators.required);
  birthdateCustomer: FormControl = new FormControl(null, Validators.required);
  monthlyIncomeCustomer: FormControl = new FormControl(null, Validators.required);
  emailCustomer: FormControl = new FormControl(null, Validators.email);
  passwordCustomer: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: CustomerService,
    private toast: ToastrService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listCustomer();
  }

  createCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/yyyy');
    this.service.save(this.customer).subscribe({
      next: response => {
        this.listCustomer();
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: "Cadastro",
            message: "Cliente cadastrado com sucesso!",
            button2: "Confirmar"
          },
        });
        this.limparCampos();
      }, error: ex => {
        if (ex.error.errors) {
          this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: "Erro",
              message: "Erro ao cadastrar cliente: " + ex.error.errors,
              button2: "Voltar"
            },
          });
          ex.error.errors.forEach((element: any) => {
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
        }
      }
    })
  }

  listCustomer() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  verificaCpf(): void {
    this.service.findByCpf(this.cpfCustomer.value)
      .subscribe((response) => {
        if (response) {
          this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: "Erro",
              message: "CPF já cadastrado no banco de dados",
              button2: "Voltar"
            },
          });
          this.cpfCustomer.setValue("");
        }
      });
  }

  deleteCustomer(customer: Customer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Exclusão",
        message: "Deseja excluir o cliente " + customer.firstNameCustomer + " " + customer.lastNameCustomer + " ?",
        button1: "Sim",
        button2: "Não"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(customer).subscribe((response: any) => {
          this.listCustomer();
          this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: "Exclusão",
              message: "Cliente excluido com sucesso",
              button2: "Confirmar"
            },
          });
        })
      }
    });
  }

  validaCampos(): boolean {
    return this.firstNameCustomer.valid && this.lastNameCustomer.valid
      && this.birthdateCustomer.valid && this.cpfCustomer.valid && this.monthlyIncomeCustomer.valid
      && this.emailCustomer.valid && this.passwordCustomer.valid
  }

   limparCampos(): void {
    const form = document.querySelector('form');  
    if (form) {
      const inputs = form.querySelectorAll('input'); 
      inputs.forEach((input: HTMLInputElement) => {
        input.value = '';
      });
    }
  }




}