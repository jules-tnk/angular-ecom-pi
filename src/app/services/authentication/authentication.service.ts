import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../../models/user";
import {LoginRequest} from "../../models/loginRequest";
import {Observable} from "rxjs";
import {LoginResponse} from "../../models/loginResponse";
import {UserInfo} from "../../models/userInfo";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userInfoNullState: UserInfo = {email: "", id: 10021, isLoggedIn: false};

  private userInfo: UserInfo = this.userInfoNullState;

  constructor(private http: HttpClient,
              private router: Router) {
    this.loadUserInfoFromLocalStorage();
  }

  register(user:User):Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>('http://localhost:8080/api/register', user);
  }

  login(loginRequest: LoginRequest) {
    this.http.post<LoginResponse>('http://localhost:8080/auth/login',loginRequest, {observe: "response"}).subscribe(
      (response) => {
        if (response.status === 200) {
          let loginResponse: LoginResponse = {email: "", id: 0};

          if (response.body) {
            loginResponse = response.body;
          }

          this.userInfo = {
            email: loginResponse.email,
            id: loginResponse.id,
            isLoggedIn: true
          }
          this.saveUserInfoInLocalStorage();
          alert("Login successful!")
          this.router.navigate(['/products']);
        } else {
          alert("Login failed! Please try again!")
        }
      }
    );
  }

  logout(){
    this.userInfo = this.userInfoNullState;
    localStorage.removeItem('userInfo');
    alert("You have been logged out successfully!")
  }

  updateUserInfo(userInfo: UserInfo){
    this.userInfo = userInfo;
    this.saveUserInfoInLocalStorage();
  }

  saveUserInfoInLocalStorage(){
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  loadUserInfoFromLocalStorage(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

  isUserLoggedIn() {
    this.loadUserInfoFromLocalStorage();
    return this.userInfo.isLoggedIn;
  }

  getUserId() {
    this.loadUserInfoFromLocalStorage();
    return this.userInfo.id;
  }

  getUserEmail() {
    this.loadUserInfoFromLocalStorage();
    return this.userInfo.email;
  }
}
