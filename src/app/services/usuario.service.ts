import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/UserASP/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(
            this.myAppUrl + this.myApiUrl,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    getUsuario(id: String | null): Observable<Usuario> {
        return this.http.get<Usuario>(
            this.myAppUrl + this.myApiUrl + id,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    deleteUsuario(id: String | null): Observable<void> {
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

    addUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(
            this.myAppUrl + this.myApiUrl +"?role="+usuario.role, usuario,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    updateUsuario(id: String | null, usuario: Usuario): Observable<void> {
        console.log(this.myAppUrl + this.myApiUrl + id);
        console.log(usuario);
        return this.http.put<void>(
            this.myAppUrl + this.myApiUrl + id +"?role="+usuario.role, usuario, // VER
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }
}

