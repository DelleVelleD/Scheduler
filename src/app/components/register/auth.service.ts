    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Router } from '@angular/router';
    import { getToken } from '@angular/router/src/utils/preactivation';

    @Injectable()
    export class AuthService {

        private _registerUrl = "http://localhost:4200/api/register";
        private _loginUrl = "http://localhost:4200/api/login";

        constructor(private http: HttpClient,
            private _router: Router){}

        registerUser(users){
            return this.http.post<any>(this._registerUrl,users)
        }

        loginUser(users){
            return this.http.post<any>(this._loginUrl,users)
        }

        logoutUser(){
            localStorage.removeItem('token')
            this._router.navigate(['/events'])
        }

        getToken(){
            return localStorage.getItem('token')
        }
        loggedIn(){
            return !!localStorage.getItem('token')
        }
   }

