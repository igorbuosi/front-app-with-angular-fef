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
    //customer.birthdateCustomer = this.datePipe.transform(customer.birthdateCustomer, 'dd/MM/yyyy');
    return this.http.post<Customer[]>(`${API_CONFIG.baseUrl}customer/insert`, customer);
  }

  findByCpf(cpfCustomer : String) : Observable<Boolean>{
    return this.http.get<Boolean>(`${API_CONFIG.baseUrl}customer/findCustomerByCpf/` + cpfCustomer);
  }

  list(): Observable<Customer[]>{
   // customer.birthdateCustomer = this.datePipe.transform(customer.birthdateCustomer, 'dd/MM/yyyy');
    return this.http.get<Customer[]>(`${API_CONFIG.baseUrl}customer/list`);
  }

  delete(customer : Customer):Observable<any>{
    return this.http.delete<Customer>(`${API_CONFIG.baseUrl}customer/delete/${customer.idCustomer}`);

  }


}







