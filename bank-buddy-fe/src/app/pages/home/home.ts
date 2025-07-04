import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user') || '{}').username;
    if (!this.username) {
      // Redirect if not logged in
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
