import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  signupSuccess: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.log('Sign-up data: Passwords mismatch.');
      return; // Prevent submission if passwords don't match
    } // Simulate success

    this.signupSuccess = true;
    console.log('Sign-up data:', {
      username: this.username,
      email: this.email,
      password: this.password
    });
    // Later: Connect to backend
  }

  confirmSuccess() {
    this.router.navigate(['/login']);
  }
}
