import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries, Language, User } from '../translation';
import { Router } from '@angular/router';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-new-dictionary',
  templateUrl: './new-dictionary.component.html',
  styleUrls: ['./new-dictionary.component.css']
})
export class NewDictionaryComponent {
  @Output() dictionaryCreated = new EventEmitter<Dictionaries>();

  dictionaryForm: FormGroup;
  
  language: Language = {
    languageCode: '',
    name: ''
  }
  languageList: Language[] = [
    { languageCode: 'ar', name: 'Arabic' },
    { languageCode: 'de', name: 'German' },
    { languageCode: 'hi', name: 'Hindi' },
    { languageCode: 'ja', name: 'Japanese' },
    { languageCode: 'tlh-Latn', name: 'Klingon' }
  ];

  user: User = {
    userId:          0,
    userName:       '',
    password:       '',
    dictionaries:   []
  }  

  dictionaries: Dictionaries = {
    dictionaryId:         0,
    dictionaryName:      '',
    language: this.language,
    userId:               0,
    user:         this.user,
    userDictionaries:    []
  }

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private router: Router) {
    this.dictionaryForm = this.formBuilder.group({
      dictionaryName: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.dictionaryForm.valid) {
      const dictionaryName = this.dictionaryForm.value.dictionaryName;
      const language = this.dictionaryForm.value.language;
      const newDictionary: Dictionaries = {
        dictionaryId: 0,
        dictionaryName: dictionaryName,
        language: language,
        userId: 0,
        user: {
          userId: 0,
          userName: '',
          password: '',
          dictionaries: []
        },
        userDictionaries: []
      };
      //this.dictionaryCreated.emit(newDictionary);
      this.translateService.addDictionary(newDictionary)
      .subscribe(result => {
        this.dictionaries = result;
        console.log(result);
      });
      //this.showForm = false;
      console.log(newDictionary);
      this.dictionaryForm.reset();
      this.router.navigate(['/user-translate']);
    
    }
  }
}
