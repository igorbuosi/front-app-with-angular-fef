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
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';



import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ConfirmationDialogComponent } from './componentes/confirmation/confirmation-dialog/confirmation-dialog.component'


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ConfirmationDialogComponent
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
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,   
    MatDividerModule, 
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
    MatSnackBarModule,
    NgxMaskDirective,
    NgxMaskPipe,
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
    DatePipe,
    provideNgxMask(),
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
