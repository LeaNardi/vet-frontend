import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MiusuarioService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/MyUser/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getUsuario(id: String | undefined): Observable<Usuario> {
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

    updateUsuario(id: String | undefined, usuario: Usuario): Observable<void> {
        console.log(this.myAppUrl + this.myApiUrl + id);
        console.log(usuario);
        return this.http.put<void>(
            this.myAppUrl + this.myApiUrl + id, usuario, // VER
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }
}
