import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  showForm = false;

  deleteForm: FormGroup;


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
  currentdictionaryId?: number;
  
  constructor (private translateService: TranslateService, private formBuilder: FormBuilder, private router: Router){
    this.deleteForm = this.formBuilder.group({
      dictionaryName: ['', Validators.required],
      dictionaryId: this.currentdictionaryId
    });
  }

  
   async ngOnInit(): Promise<void> {

    this.currentUserName = this.translateService.currentUser?.userName;
    const currentUserId = this.translateService.currentUser?.userId;
    const currentdictionaryId = this.translateService.userDictionary?.dictionaryId;

    console.log(this.currentUserName, currentUserId, currentdictionaryId);

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


  removeDictionary(dictionary: Dictionaries) {
    if (this.deleteForm.valid) {
      const index = this.userDictionaryList.findIndex(result => {
        result.dictionaryId === dictionary.dictionaryId
        });
  
      if (index !== -1) {
        this.userDictionaryList.splice(index, 1);
        
        this.translateService.deleteDictionary(dictionary.dictionaryId).subscribe(() => {
          console.log('Entry deleted successfully.');
        });
      }   
    }
  }
}