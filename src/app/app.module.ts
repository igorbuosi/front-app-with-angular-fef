import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Formularios
    FormsModule,
    ReactiveFormsModule,
    //Requisicoes
    HttpClientModule,
    //Angular Material
    MatSlideToggleModule,
    MatButtonModule,   
    MatDividerModule, 
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    DatePipe,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    CustomerService,
    DatePipe  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
