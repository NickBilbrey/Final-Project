import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { language, TranslationRequest, Translation, Dictionaries, User, UserDictionary } from '../translation';}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  languageList: language[] = [];

  constructor (private translateService: TranslateService){}

  async ngOnInit(): Promise<void> {
    
    this.translateService.getPopularLanguages()
    .subscribe(result => {
      this.languageList = result;
      console.log(result);
    });
  }
}
