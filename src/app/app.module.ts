import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdSelectModule, MdGridListModule, MdRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NvD3Module } from 'ng2-nvd3';

// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

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
    HttpModule,
    NvD3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
