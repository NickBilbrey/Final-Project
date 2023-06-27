export interface Translation {
    translation: string;
}

export interface Language {
    languageCode: string;
    name:         string;
}

export interface Dictionaries {
    dictionaryId:               number;
    dictionaryName:             string;
    language:                 Language;
    userId:                     number;
    user:                         User;
    userDictionaries: UserDictionary[];
}

export interface User {
    userId:         number;
    userName:       string;
    password:       string;
    dictionaries: string[];
}

export interface UserDictionary {
    entryId:                    number;
    userEntry:                  string;
    translation:                string;
    dictionaryId:               number;
    dictionary?: Partial<Dictionaries>;
}

export interface TranslationRequest {
    textToTranslate:    string;
    targetLanguageCode: string;
  }
  

