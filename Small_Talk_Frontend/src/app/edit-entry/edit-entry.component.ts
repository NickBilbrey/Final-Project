import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries, Language, UserDictionary } from '../translation';
import { TranslateService } from '../translate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit{
  editForm: FormGroup;

  languages: Language[] = [];
  currentUserDictionary?: Dictionaries;
  entry?: UserDictionary;
  currentUserEntries: UserDictionary[] = []
  userLanguage?: Language;
  
  constructor(private translateService: TranslateService, private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute) { 
    this.editForm = this.formBuilder.group({
      userEntry: ['', Validators.required],
      translation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const entryId = Number(params['entryId']);
      this.translateService.editEntry(entryId).subscribe(entry => {
        this.entry = entry;
        this.editForm.patchValue({
          userEntry: entry.userEntry,
          translation: entry.translation
        });
      });
    });
  }

  saveEntry(entryId: number) {
    if (this.editForm.valid) {
      const editEntry: UserDictionary = this.editForm.value;
  
      this.translateService.editEntry(entryId).subscribe(result => {
        console.log(editEntry);
      });
  
      this.router.navigate(['/user-translate']);
    }
  }
  
}
