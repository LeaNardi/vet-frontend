import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/User/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.myAppUrl + this.myApiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.myAppUrl + this.myApiUrl + id);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.myAppUrl + this.myApiUrl , usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<void> {
    console.log(this.myAppUrl + this.myApiUrl + id);
    console.log(usuario);
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, usuario);
  }
}

