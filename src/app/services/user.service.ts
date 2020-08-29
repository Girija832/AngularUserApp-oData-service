import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn = false;
  private username;

  constructor(
    private http: HttpClient
  ) { 
    this.isUserLoggedIn = false;
  }


  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  getUserList() {
    return this.http.get('https://services.odata.org/TripPinRESTierService/People');
  }
}
