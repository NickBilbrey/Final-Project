import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTranslateComponent } from './user-translate/user-translate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NewDictionaryComponent } from './new-dictionary/new-dictionary.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    UserTranslateComponent,
    DictionaryComponent,
    NewDictionaryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
