import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-user-translate',
  templateUrl: './user-translate.component.html',
  styleUrls: ['./user-translate.component.css']
})
export class UserTranslateComponent implements OnInit {
  languages: language[] = [];
  translateForm!: FormGroup;
  translatedText: string = '';

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.translateService.getPopularLanguages().subscribe(languages => {
      this.languages = languages;
    });

    this.translateForm = this.formBuilder.group({
      selectedLanguage: [''],
      textInput: ['']
    });
  }

  onSubmit() {
    const textToTranslate: string = this.translateForm.value.textToTranslate;
    const selectedLanguage: string = this.translateForm.value.selectedLanguage;
  
    if (textToTranslate && selectedLanguage) {
      const translationRequest: TranslationRequest = {
        textToTranslate: textToTranslate,
        targetLanguageCode: selectedLanguage
      };
  
      this.translateService.postTranslate(translationRequest).subscribe({
        next: (translation: Translation) => {
          this.translatedText = translation.Translation;
        },
        error: (error: any) => {
          console.log('Error Translating:', error)
        }
    });
    }
  }
  
  
}
