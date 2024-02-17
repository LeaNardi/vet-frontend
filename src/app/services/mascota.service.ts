import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../interfaces/mascota';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MascotaService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Mascota/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getMascotas(): Observable<Mascota[]> {
        return this.http.get<Mascota[]>(
            this.myAppUrl + this.myApiUrl,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    getMascota(id: number): Observable<Mascota> {
        return this.http.get<Mascota>(
            this.myAppUrl + this.myApiUrl + id,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    deleteMascota(id: number): Observable<void> {
        return this.http.delete<void>(
            this.myAppUrl + this.myApiUrl + id,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    addMascota(mascota: Mascota): Observable<Mascota> {
        return this.http.post<Mascota>(
            this.myAppUrl + this.myApiUrl, mascota,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    updateMascota(id: number, mascota: Mascota): Observable<void> {
        return this.http.put<void>(
            this.myAppUrl + this.myApiUrl + id, mascota,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }
}
