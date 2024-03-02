import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MascotaResponse } from '../interfaces/mascota';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MascotaService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Mascota/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getMascotas(): Observable<MascotaResponse[]> {
        return this.http.get<MascotaResponse[]>(
            this.myAppUrl + this.myApiUrl,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    getMascota(id: number): Observable<MascotaResponse> {
        return this.http.get<MascotaResponse>(
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

    addMascota(mascota: MascotaResponse): Observable<MascotaResponse> {
        return this.http.post<MascotaResponse>(
            this.myAppUrl + this.myApiUrl, mascota,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    updateMascota(id: number, mascota: MascotaResponse): Observable<void> {
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
