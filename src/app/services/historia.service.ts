import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Historia } from '../interfaces/historia';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HistoriaService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Historia/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getHistorias(mascotaid: number): Observable<Historia[]> {
        return this.http.get<Historia[]>(
            this.myAppUrl + this.myApiUrl + mascotaid,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    addHistoria(mascotaid: number, historia: Historia): Observable<Historia> {
        return this.http.post<Historia>(
            this.myAppUrl + this.myApiUrl + mascotaid, historia,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }
}
