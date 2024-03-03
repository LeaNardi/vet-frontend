import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    constructor(public auth:AuthenticationService, private router:Router) {
    }

    async logout(){
        const token = await this.auth.resetSession();
        this.router.navigate(['/login']); 
      }
    
    confirmarSalir() {
        if (confirm('¿Estás seguro que deseas salir?')) {
            this.logout(); // Llama a la función logout si se confirma la salida
        }
    }
}
