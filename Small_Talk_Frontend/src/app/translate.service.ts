import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Translation, Language, Dictionaries, User, UserDictionary, TranslationRequest } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private url: string = 'https://smalltalk20230626202511.azurewebsites.net/'

  languages: Language[] = [
    { languageCode:        "ar", name: "Arabic" },
    { languageCode:        "de", name: "German" },
    { languageCode:         "hi", name: "Hindi" },
    { languageCode:      "ja", name: "Japanese" },
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
    return this.http.post<Translation>(this.url + `api/Translation`, userTranslation);
  }

  addDictionary(dictionary: Dictionaries): Observable<Dictionaries>{
    return this.http.post<Dictionaries>(this.url + `api/Dictionaries`, dictionary);
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'api/Users')
  }

  addUser(newUser: User): Observable<User>{
    return this.http.post<User>(this.url + `api/Users`, newUser);
  }

  checkUser(username: string, password: string): Observable<number> {
    const login = {
      username: username,
      password: password
    };

    return this.http.post<number>(`${this.url}api/Users/CheckUser`, login);
  }

}
