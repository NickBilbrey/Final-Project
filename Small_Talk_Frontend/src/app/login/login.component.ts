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
   constructor(private router: Router, private translateService: TranslateService){}
  loginUser(userName: string, password: string): void {
    this.translateService.getUsers().subscribe({
      next: (users: User[]) => {
        const user = users.find(u => u.userName === userName && u.password === password);
        if (user) {
          this.translateService.currentUser = user; // Assign currentUser value
          console.log('User logged in:', user);
          this.router.navigate(['/dictionary']); 
      }
      //  else {
      //      this.translateService.addUser(userName, password).subscribe({
      //        next: (addUser: Translation) => {
      //          this.translateService.addUser = addUser;
      //          console.log('New user created:', addUser);
      //          this.router.navigate(['/dictionary']); 
      //        },
      //        error: (error: any) => {
      //          console.log('Error creating user:', error);
      //        }
      //      });
      //    }
        },
      error: (error: any) => {
        console.log('Error retrieving users:', error);
      }
    });
  }
}
