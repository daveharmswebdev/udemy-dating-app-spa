import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { ValueService } from './value/value.service';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ValueService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
