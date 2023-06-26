import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  showForm = false;

  // dictionaryForm: FormGroup;

  languageChoice: string = '';
  selectedLanguage: Language | undefined;
  language: Language = {
    languageCode: '',
    name: ''
  }
  languageList: Language[] = [
    { languageCode:        "ar", name: "Arabic" },
    { languageCode:        "de", name: "German" },
    { languageCode:         "hi", name: "Hindi" },
    { languageCode:      "ja", name: "Japanese" },
    { languageCode: "tlh-Latn", name: "Klingon" }
    ];
  

  user: User = {
    userId:          0,
    userName:       '',
    password:       '',
    dictionaries:   []
  }  

  userDictionaryList: Dictionaries[] = []; 
  dictionaries: Dictionaries = {
    dictionaryId:         0,
    dictionaryName:      '',
    language: this.language,
    userId:               0,
    user:         this.user,
    userDictionaries:    []
  }

  userEntriesList: UserDictionary[] = [];
  userDictionary: UserDictionary = {
    entryId:        0,
    userEntry:     '',
    translation:   '',
    dictionaryId:   0,
    dictionary:    {}
  }
  
  
  
  constructor (private translateService: TranslateService, private router: Router, /*private formBuilder: FormBuilder*/){
    console.log(this.translateService);
    // this.dictionaryForm = this.formBuilder.group({
    //   dictionaryName:            [''],
    //   language: this.selectedLanguage,
    // });
  }

  userName: string = 'GWizner';

   async ngOnInit(): Promise<void> {
    
    this.translateService.getCurrentLanguages()
    .subscribe(result => {
      this.languageList = result;
      console.log(result);
    });

    
    this.translateService.getDictionariesByUserId(1)               //(this.userDictionaries.userId)
    .subscribe((result: Dictionaries[]) => {
      this.userDictionaryList = result;
      console.log(result);
    });
  
  }

  dictionarySelection(dictionaries: Dictionaries): void {
    this.translateService.getUserDictionary(dictionaries.dictionaryId)
    .subscribe((result: UserDictionary[]) => {
      this.userEntriesList = result;
      console.log(result);
    });
    this.router.navigate(['/user-translate']);
  }

  // switchLanguage(input: string): void {
  //   this.selectedLanguage = this.languageList.find(result => result.name === input);
  //   console.log(this.selectedLanguage);
  //   this.newDictionary();
  // }
  
  // onDictionaryCreated(newDictionary: Dictionaries): void {
  //   console.log('onDictionaryCreated function called');
  //   this.translateService.addDictionary(newDictionary)
  //     .subscribe(result => {
  //       this.dictionaries = result;
  //       console.log(result);
  //     });
  //     this.showForm = false;
  //     this.router.navigate(['/user-translate']);
  //   }
  
  
  // newDictionary(){
  //   const dictionaryName = this.dictionaryForm?.value.dictionaryName;
  //   const userId = this.user.userId;
  //   const userName = this.user.userName;

  //   if (dictionaryName && this.selectedLanguage) {
  //     const newDictionaries: Dictionaries = {
  //       dictionaryId: 0,
  //       dictionaryName: dictionaryName,
  //       language: this.selectedLanguage,
  //       userId: userId,
  //       user: {
  //         userId: userId,
  //         userName: userName,
  //         password: '',
  //         dictionaries: []
  //       },
  //       userDictionaries: []
  //     };
  //     this.translateService.addDictionary(newDictionaries)
  //       .subscribe(result => {
  //         this.dictionaries = result;
  //         console.log(result);
  //     });
  //   }
  // }
}