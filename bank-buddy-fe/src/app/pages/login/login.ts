import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login attempted with:', this.username, this.password);
    // Later: Connect to backend
    const STATIC_USERS = [
      { username: 'testuser', password: 'testpass' },
      { username: 'alice', password: 'alice123' },
      { username: 'bob', password: 'bob456' }
    ];

    const matchedUser = STATIC_USERS.find(
      (user) => user.username === this.username && user.password === this.password
    );

    if (matchedUser) {
      localStorage.setItem('username', matchedUser.username);
      this.router.navigate(['/home']);
    } else {
      console.log('Invalid username or password.');
      this.loginError = 'Invalid username or password.';
    }
  }
}
