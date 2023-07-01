import { Pipe, PipeTransform } from '@angular/core';
import { Dictionaries } from './translation';


@Pipe({
  name: 'sortDictionaries'
})
export class SortDictionariesPipe implements PipeTransform {
  transform(userDictionaryList: Dictionaries[]): Dictionaries[] {
    if (!userDictionaryList) return [];
    return userDictionaryList.sort((a, b) => {
      return a.dictionaryName.localeCompare(b.dictionaryName);
    });
  }
}
