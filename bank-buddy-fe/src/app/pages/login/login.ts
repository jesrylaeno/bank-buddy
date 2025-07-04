import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.loginError = '';

    this.userService
      .login({
        username: this.username,
        password: this.password
      })
      .subscribe({
        next: (user: any) => {
          // Save user in localStorage or a global state store
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loginError = err?.error?.message || 'Invalid username or password';
          this.cdRef.detectChanges();
        }
      });
  }
}
