import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../translation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  @Output() userCreated = new EventEmitter<User>();

  userForm: FormGroup;

  user: User = {
    userId:          0,
    userName:       '',
    password:       '',
    dictionaries:   []
  }  

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      
      this.translateService.addUser(newUser)
        .subscribe(result => {
          this.user = result;
          console.log(newUser);
          
          newUser.userId = result.userId;

          this.translateService.currentUser = newUser;

          this.userCreated.emit(newUser);
  
          this.router.navigate(['/dictionary']);
        });
  
      this.userForm.reset();
    }
  }

}
