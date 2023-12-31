import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { UserTranslateComponent } from './user-translate/user-translate.component';
import { NewDictionaryComponent } from './new-dictionary/new-dictionary.component';
import { LoginComponent } from './login/login.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';


const routes: Routes = [{ path: '', component: LoginComponent},
{ path: 'dictionary', component: DictionaryComponent},
{ path: 'new-dictionary', component: NewDictionaryComponent},
{ path: 'user-translate/:dictionaryId', component: UserTranslateComponent },
{ path: 'edit-entry', component: EditEntryComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

