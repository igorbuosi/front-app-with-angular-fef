import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http:HttpClient
    ) { }

  save(customer: Customer): Observable<Customer[]>{
    return this.http.post<Customer[]>(`${API_CONFIG.baseUrl}customer/insert`, customer);
  }

  update(customer: Customer): Observable<Customer[]>{
    return this.http.put<Customer[]>(`${API_CONFIG.baseUrl}customer/update`, customer);
  }

  findByCpf(cpfCustomer : String) : Observable<Boolean>{
    return this.http.get<Boolean>(`${API_CONFIG.baseUrl}customer/findCustomerByCpf/${cpfCustomer}`);
  }

  list(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${API_CONFIG.baseUrl}customer/list`);
  }

  delete(customer : Customer):Observable<any>{
    return this.http.delete<Customer>(`${API_CONFIG.baseUrl}customer/delete/${customer.idCustomer}`);
  }

  findById(idCustomer: any): Observable<Customer> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}customer/findCustomer/${idCustomer}`);
  }

}







