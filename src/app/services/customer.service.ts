import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { API_CONFIG } from '../config/api.config';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http:HttpClient,
    private datePipe:DatePipe
    ) { }

  save(customer: Customer): Observable<Customer[]>{
    customer.birthdateCustomer = this.datePipe.transform(customer.birthdateCustomer, 'dd/MM/yyyy');
    return this.http.post<Customer[]>(`${API_CONFIG.baseUrl}customer/insert`, customer);
  }

}







