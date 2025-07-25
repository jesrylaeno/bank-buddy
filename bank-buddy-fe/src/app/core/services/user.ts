import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signUp(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/user`, data);
  }

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/user/auth`, data);
  }
}
