import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  signupSuccess = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService
      .signUp({
        username: this.username,
        email: this.email,
        password: this.password
      })
      .subscribe({
        next: () => {
          this.signupSuccess = true;

          this.cdRef.detectChanges(); // Force update
          // Delay before navigating to login
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000); // 2 seconds
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Signup failed.';
          console.error('Signup error:', err);
        }
      });
  }

  confirmSuccess() {
    this.router.navigate(['/login']);
  }
}
