import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdSelectModule, MdGridListModule, MdRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MdSelectModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdRadioModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
