export interface Translation {
    Translation: string;
}

export interface language {
    languageCode: string;
    name: string
}

export interface Dictionaries {
    dictionaryId:     number;
    dictionaryName:   string;
    language:         string;
    userId:           number;
    user:             User;
    userDictionaries: UserDictionary[];
}

export interface User {
    userId:       number;
    userName:     string;
    password:     string;
    dictionaries: string[];
}

export interface UserDictionary {
    entryId:      number;
    userEntry:    string;
    translation:  string;
    dictionaryId: number;
    dictionary:   string;
}

export interface TranslationRequest {
    textToTranslate: string;
    targetLanguageCode: string;
  }
  

