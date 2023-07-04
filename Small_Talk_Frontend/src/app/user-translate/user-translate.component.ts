import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-translate',
  templateUrl: './user-translate.component.html',
  styleUrls: ['./user-translate.component.css']
})
export class UserTranslateComponent implements OnInit {
  entryForm: FormGroup;

  translateForm: FormGroup;
  translatedText: string = '';
  
  languages: Language[] = [];
  currentUserDictionary?: Dictionaries;
  entry?: UserDictionary;
  currentUserEntries: UserDictionary[] = []
  userLanguage?: Language;
  
  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { 
    this.translateForm = this.formBuilder.group({
      selectedLanguage: ['', Validators.required],
      textToTranslate: ['', Validators.required]
    });
    this.entryForm = this.formBuilder.group({
      userEntry: ['', Validators.required],
      translation: ['', Validators.required],
    });
  }

  
   ngOnInit() {
    this.translateService.getCurrentLanguages().subscribe(languages => {
      this.languages = languages;
    });

    this.translateForm = this.formBuilder.group({
      selectedLanguage: [''],
      textToTranslate: ['']
    });

    const dictionaryId = this.route.snapshot.paramMap.get('dictionaryId');
    if (dictionaryId) {
      this.translateService.getUserDictionary(parseInt(dictionaryId, 10)).subscribe((result: UserDictionary[]) => {
        this.currentUserEntries = result;
        console.log('User Entries Received', this.currentUserEntries);
      });
    }

    console.log(this.translateService.userDictionary);
    this.currentUserDictionary = this.translateService.userDictionary;

    console.log(this.currentUserDictionary?.language)
    this.userLanguage = this.languages.find(language => language.name === this.currentUserDictionary?.language.toString());
    console.log(this.userLanguage);
  }

  onSubmit() {
    console.log('Form submitted');
    const textToTranslate: string = this.translateForm.value.textToTranslate;
    if(this.userLanguage){
      const selectedLanguage: string = this.userLanguage?.languageCode

      console.log(textToTranslate);
      console.log(selectedLanguage);
    
      if (textToTranslate && selectedLanguage) {
        const translationRequest: TranslationRequest = {
          textToTranslate: textToTranslate,
          targetLanguageCode: selectedLanguage
        };
    
        this.translateService.postTranslate(translationRequest).subscribe({
          next: (response: Translation) => {
            const translationResponse = JSON.parse(response.translation);
            const translations = translationResponse[0].translations;
            if (translations.length > 0) {
              const translatedText = translations[0].text;
              this.translatedText = translatedText;
              console.log(translatedText);
            }
          },
          error: (error: any) => {
            console.log('Error Translating:', error);
          }
        });
      }
    }  
  }

  newEntry() {
    if (this.entryForm.valid) {
      const newEntry: UserDictionary = this.entryForm.value;
      if (this.currentUserDictionary){
        newEntry.dictionaryId = this.currentUserDictionary?.dictionaryId
        
        this.translateService.addEntry(newEntry)
          .subscribe(result => {
            this.entry = result;
            console.log(newEntry);
            

            newEntry.entryId = result.entryId;
            
            this.translateService.entry = newEntry;
            
            this.currentUserEntries.push(newEntry);
            
          });
    
        this.entryForm.reset();
      }
    }  
  }

  routeToEditEntry(editId: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        entryId: editId
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['/edit-entry'], navigationExtras);
  }
  
  removeEntry(entryId: number) {
    const index = this.currentUserEntries.findIndex(entry => entry.entryId === entryId);
    if (index !== -1) {
      this.currentUserEntries.splice(index, 1);
      this.translateService.deleteEntry(entryId).subscribe();
    }
  }

  
  getCurrentDictionary(): void {
    this.currentUserDictionary = this.translateService.userDictionary;
  
    if (this.currentUserDictionary) {
      this.dictionarySelection();
    } else {
      console.log('currentUserDictionary is undefined');
    }
  }
  


  dictionarySelection(): void {
    if (this.currentUserDictionary) {
      this.translateService.getUserDictionary(this.currentUserDictionary.dictionaryId)
        .subscribe((result: UserDictionary[]) => {
          this.currentUserEntries = result;
          console.log('User Entries Received', this.currentUserEntries);
        });
    } else {
      // Handle the case when currentUserDictionary is undefined
      console.log('currentUserDictionary is undefined');
    }
  }
 
}
