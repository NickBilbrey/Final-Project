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

   dictionaries?: Dictionaries //= {
  //   dictionaryId:         0,
  //   dictionaryName:      '',
  //   language: this.language,
  //   userId:               0,
  //   user:         this.user,
  //   userDictionaries:    []
  // }

  currentUserId?: number;

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private router: Router) {
    this.currentUserId = this.translateService.currentUser?.userId;
    this.dictionaryForm = this.formBuilder.group({
      dictionaryName: ['', Validators.required],
      language: ['', Validators.required],
      userId: this.currentUserId
    });
  }



  onSubmit() {
    if (this.dictionaryForm.valid) {
      const newDictionary: Dictionaries = this.dictionaryForm.value;
      
      this.translateService.addDictionary(newDictionary)
        .subscribe(result => {
          this.dictionaries = result;
          console.log(newDictionary);
          
          newDictionary.dictionaryId = result.dictionaryId;

          this.translateService.userDictionary = newDictionary;

          this.dictionaryCreated.emit(newDictionary);
  
          // Navigates to the 'user-translate' route with the dictionaryId as a parameter
          this.router.navigate(['/user-translate', newDictionary.dictionaryId]);
        });
  
      this.dictionaryForm.reset();
    }
  }
}

