import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    userName: String;
    password: String;
    hidePassword: boolean = true;

    constructor(private auth:AuthenticationService, private router:Router) {
        this.userName ="";
        this.password = "";

     }
    ngOnInit(): void {
        if (this.auth.isLoggedIn()){
            console.log("User is logged in");
            this.router.navigate(['/dashboard']);
        }
    }
  
    async login(form:NgForm){
        console.log(form.value);
        const token = await this.auth.login(form.value);
        if(token) this.router.navigate(['/dashboard']); 
      }
      
    togglePasswordVisibility(): void {
      this.hidePassword = !this.hidePassword; // Cambiar el valor de la variable para ocultar o mostrar la contraseña
    }
}
