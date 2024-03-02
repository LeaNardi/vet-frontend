import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Raza } from '../interfaces/mascota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazaService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Raza/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getRazas(): Observable<Raza[]> {
        return this.http.get<Raza[]>(
            this.myAppUrl + this.myApiUrl,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }
}
