import { Component } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Router } from '@angular/router';
import { Translation, User } from '../translation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showForm = false;

  userList: User[] = [];
  currentUser: User = {
    userId:          0,
    userName:       '',
    password:       '',
    dictionaries:   []
  }  

   constructor(private router: Router, private translateService: TranslateService){}

   loginUser(userName: string, password: string): void {
    this.translateService.checkUser(userName, password).subscribe({
      next: (userId: number) => {
        if (userId) {
          this.translateService.currentUser = {
            userId: userId,
            userName: userName,
            password: password
          };
          console.log('User Logged in!');
          this.router.navigate(['/dictionary']);
        }
      },
      error: (error: any) => {
        console.log('Error retrieving users:', error);
      }
    });
  }
  
  onUserCreated(newUser: User): void {
    this.userList.push(newUser);
  }
}
