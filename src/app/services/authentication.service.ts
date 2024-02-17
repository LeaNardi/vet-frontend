import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Session } from '../interfaces/session';
import { iAuthRequest } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private myAppUrl: string = environment.endpoint;


  constructor() { }

  private loggedIn: boolean = false;

  async login(authentication:iAuthRequest): Promise<boolean> {
    const res = await fetch(this.myAppUrl + 'api/authentication/authenticate', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authentication),
    });
    if(!res.ok) return false
    const token = await res.text();
    console.log(token)

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const sub = decodedToken.sub;
    console.log(sub);

    if (!token) return false;
    this.setSession(token);
    this.setUserId(sub);
    return true;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  getSession(): Session {
    const item: string = localStorage.getItem('session') || 'invalid';
    if (item !== 'invalid') {
      this.loggedIn = true;
      return JSON.parse(item);
    }
    return { expiresIn: '', token: '' };
  }


  setUserId(id : string){
    localStorage.setItem('Id', id);
  }

  setSession(token: any, expiresTimeHours: number = 1) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeHours);

    const session: Session = {
      expiresIn: new Date(date).toISOString(),
      token,
    };

    this.loggedIn = true;
    localStorage.setItem('session', JSON.stringify(session));
  }

  async getMe() {
    const res = await fetch('', {
      headers: {
        Authorization: this.getSession().token!,
      },
    });
    return await res.json();
  }

  resetSession() {
    localStorage.removeItem('session');
    localStorage.removeItem('Id');
    this.loggedIn = false;
  }

}
