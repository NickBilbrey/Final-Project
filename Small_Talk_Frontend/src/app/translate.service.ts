import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Translation, language, Dictionaries, User, UserDictionary, TranslationRequest } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private url: string = 'https://localhost:7181/'

  languages: language[] = [
      { languageCode: "es", name: "Spanish" },
      { languageCode: "zh", name: "Chinese" },
      { languageCode: "hi", name: "Hindi" },
      { languageCode: "fr", name: "French" },
      { languageCode: "ar", name: "Arabic" },
    ];
    
  constructor(private http: HttpClient) { }

  getUserDictionariesByID(userId: number): Observable<Dictionaries>{
    return this.http.get<Dictionaries>(this.url + `api/Dictionaries/${userId}`);
  }

  postTranslate(userTranslation: TranslationRequest): Observable<Translation> {
    return this.http.post<Translation>(this.url + `api/Translation`, userTranslation);
  }

  getPopularLanguages(): Observable<language[]> {
    const popularLanguages: language[] = [
      { languageCode: "es", name: "Spanish" },
      { languageCode: "zh", name: "Chinese" },
      { languageCode: "hi", name: "Hindi" },
      { languageCode: "fr", name: "French" },
      { languageCode: "ar", name: "Arabic" }
    ];
    return of(popularLanguages);
  }



  
}
