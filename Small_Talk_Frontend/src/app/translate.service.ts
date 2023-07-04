import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Translation, Language, Dictionaries, User, UserDictionary, TranslationRequest, TransliterationRequest, TransliterationResult } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private url: string = 'https://smalltalk20230626202511.azurewebsites.net/'

  languages: Language[] = [
    { languageCode:        "ar", name: "Arabic", fromScript: "Arab" },
    { languageCode:        "de", name: "German" },
    { languageCode:         "hi", name: "Hindi" , fromScript: "Deva"},
    { languageCode:      "ja", name: "Japanese", fromScript: "Jpan" },
    { languageCode: "tlh-Latn", name: "Klingon" }
    ];


    currentUser?: User;
    userDictionary?: Dictionaries;
    entry?: UserDictionary;
    
    
  constructor(private http: HttpClient) { }

  getDictionariesByUserId(userId: number): Observable<Dictionaries[]>{
    return this.http.get<Dictionaries[]>(this.url + `api/Dictionaries/${userId}`);
  }

  postTranslate(userTranslation: TranslationRequest): Observable<Translation> {
    return this.http.post<Translation>(this.url + `api/Translation/Translate`, userTranslation);
  }

  transliterateText(transliterationRequest: TransliterationRequest): Observable<TransliterationResult[]> {
    return this.http.post<TransliterationResult[]>(this.url + 'api/Translation/Transliterate', transliterationRequest);
  }
  

  addDictionary(dictionary: Dictionaries): Observable<Dictionaries>{
    return this.http.post<Dictionaries>(this.url + `api/Dictionaries`, dictionary);
  }

  deleteDictionary(dictionaryId: number): Observable<Dictionaries>{
    return this.http.delete<Dictionaries>(this.url + `api/Dictionaries/${dictionaryId}`);
  }

  getUserDictionary(dictionaryId: number): Observable<UserDictionary[]>{
    return this.http.get<UserDictionary[]>(this.url + `api/UserDictionaries/${dictionaryId}`)
  }

  addEntry(newEntry: UserDictionary): Observable<UserDictionary>{
    return this.http.post<UserDictionary>(this.url + `api/UserDictionaries`, newEntry);
  }

  editEntry(entryId: number): Observable<UserDictionary>{
    return this.http.put<UserDictionary>(this.url + `api/UserDictionaries/${entryId}`, this.entry);
  }

  deleteEntry(entryId: number): Observable<UserDictionary>{
    return this.http.delete<UserDictionary>(this.url + `api/UserDictionaries/${entryId}`);
  }

  getCurrentLanguages(): Observable<Language[]> {
    const currentLanguages: Language[] = [
      { languageCode:        "ar", name: "Arabic", fromScript: "Arab" },
      { languageCode:        "de", name: "German" },
      { languageCode:         "hi", name: "Hindi" , fromScript: "Deva"},
      { languageCode:      "ja", name: "Japanese", fromScript: "Jpan" },
      { languageCode: "tlh-Latn", name: "Klingon" }
    ];
    return of(currentLanguages);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'api/Users')
  }

  checkUser(username: string, password: string): Observable<number> {
    const login = {
      username: username,
      password: password
    };

    return this.http.post<number>(`${this.url}api/Users/CheckUser`, login);
  }

}
