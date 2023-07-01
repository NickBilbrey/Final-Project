import { Pipe, PipeTransform } from '@angular/core';
import { UserDictionary } from './translation';

@Pipe({
  name: 'sortEntries'
})
export class SortEntriesPipe implements PipeTransform {
  transform(userEntriesList: UserDictionary[]): UserDictionary[] {
    if (!userEntriesList) return [];
    return userEntriesList.sort((a, b) => {
      return a.userEntry.localeCompare(b.userEntry);
    });
  }
}
