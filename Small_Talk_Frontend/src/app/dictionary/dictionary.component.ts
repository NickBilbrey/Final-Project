import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  showForm = false;


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
  

  currentUser: User = {
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
    user:   this.currentUser,
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
  
  currentUserName?: string;
  currentUserId?: number;
  
  constructor (private translateService: TranslateService, private router: Router){}

  
   async ngOnInit(): Promise<void> {

    this.currentUserName = this.translateService.currentUser?.userName;
    const currentUserId = this.translateService.currentUser?.userId;
    
    console.log(this.currentUserName, currentUserId);

    this.translateService.getCurrentLanguages()
    .subscribe(result => {
      this.languageList = result;
      console.log(result);
    });

    if (currentUserId){
      this.translateService.getDictionariesByUserId(currentUserId)              
      .subscribe((result: Dictionaries[]) => {
        this.userDictionaryList = result;
        console.log(result);
      });
    }
  
  }

  dictionarySelection(dictionary: Dictionaries): void {
    this.translateService.userDictionary = dictionary;
    
    this.router.navigate(['/user-translate', dictionary.dictionaryId]);
  }
  

  
 
  onDictionaryCreated(newDictionary: Dictionaries): void {
    console.log('onDictionaryCreated function called');
    this.userDictionaryList.push(newDictionary);
  }
}