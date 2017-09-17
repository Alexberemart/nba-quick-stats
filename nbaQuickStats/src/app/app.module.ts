import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdSelectModule, MdGridListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    MdGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
