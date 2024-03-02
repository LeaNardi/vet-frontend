import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Color } from '../interfaces/mascota';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Color/';

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    getColores(): Observable<Color[]> {
        return this.http.get<Color[]>(
            this.myAppUrl + this.myApiUrl,
            {
                headers: new HttpHeaders({
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${this.auth.getSession().token!}`,
                })
            }
        );
    }

    // getColorById(colorId: number): string {
    //     var colores : Color[];
    //     this.getColores().subscribe({
    //         next: (data) => {
    //             colores = data
    //         }
    //     });
        
    //     return colores.filter(x => x.colorid == colorId)[0].colornombre;
    // }
}
