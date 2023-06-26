import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Translation, Language, Dictionaries, User, UserDictionary, TranslationRequest } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private url: string = 'https://localhost:7181/'

  languages: Language[] = [
    { languageCode:        "ar", name: "Arabic" },
    { languageCode:        "de", name: "German" },
    { languageCode:         "hi", name: "Hindi" },
    { languageCode:      "ja", name: "Japanese" },
    { languageCode: "tlh-Latn", name: "Klingon" }
    ];
    
  constructor(private http: HttpClient) { }

  getDictionariesByUserId(userId: number): Observable<Dictionaries[]>{
    return this.http.get<Dictionaries[]>(this.url + `api/Dictionaries/${userId}`);
  }

  postTranslate(userTranslation: TranslationRequest): Observable<Translation> {
    return this.http.post<Translation>(this.url + `api/Translation`, userTranslation);
  }

  addDictionary(dictionary: Dictionaries): Observable<Dictionaries>{
    return this.http.post<Dictionaries>(this.url + `api/Dictionaries`, dictionary);
  }

  getUserDictionary(dictionaryId: number): Observable<UserDictionary[]>{
    return this.http.get<UserDictionary[]>(this.url + `api/UserDictionaries/${dictionaryId}`)
  }

  getCurrentLanguages(): Observable<Language[]> {
    const currentLanguages: Language[] = [
      { languageCode:        "ar", name: "Arabic" },
      { languageCode:        "de", name: "German" },
      { languageCode:         "hi", name: "Hindi" },
      { languageCode:      "ja", name: "Japanese" },
      { languageCode: "tlh-Latn", name: "Klingon" }
    ];
    return of(currentLanguages);
  }



  
}
