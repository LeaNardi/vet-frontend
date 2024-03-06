import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MiusuarioService } from '../../services/miusuario.service';


@Component({
  selector: 'app-miusuario',
  templateUrl: './miusuario.component.html',
  styleUrl: './miusuario.component.css'
})
export class MiusuarioComponent implements OnInit{

  loading: boolean = false;
  form: FormGroup;
  id: string | undefined;
  operacion: string = "AGREGAR";

  constructor(private fb: FormBuilder,
      private _usuarioService: UsuarioService,
      private _miUsuarioService: MiusuarioService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private aRoute: ActivatedRoute,
      private auth: AuthenticationService){
      this.form = this.fb.group({
          nombre: ['',Validators.required],
          apellido: ['',Validators.required],
          usuario: ['',Validators.required],
          email: ['',[Validators.required, Validators.email]],
          rol: ['',Validators.required],
          contrasena: ['',Validators.required],
      })
      this.id = this.auth.getUserId()?.toString();
      console.log(this.id)
  }

  ngOnInit(): void{
    this.obtenerUsuario();
  }

  editarUsuario(){
      this.loading = true;
      var message = "El usuario fue modificado con exito";
      var action = '';
      var config = {duration: 4000};

      let usuario: Usuario = {
        nombre:  this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        username: this.form.get('usuario')?.value,
        email: this.form.get('email')?.value,
        role: this.form.get('rol')?.value,
        password: this.form.get('contrasena')?.value,
    };
    usuario.id = this.id;


      if (usuario.password == "********"){
        usuario.password = "empty";
      }
      console.log("usuario luego de chequear password");
      console.log(usuario);
      this._miUsuarioService.updateUsuario(this.id, usuario).subscribe(() => {
          this.loading = false;
          this._snackBar.open(message, action, config);
            this.obtenerUsuario();

      })
  }

  obtenerUsuario(){
      this.loading = true;
      this._miUsuarioService.getUsuario(this.id).subscribe({
          next: (data) => {
              this.form.setValue({
                  nombre: data.nombre,
                  apellido: data.apellido,
                  usuario: data.username,
                  email: data.email,
                  rol: data.role,
                  contrasena: "********",
              })
              this.form.get('usuario')?.disable();
              this.form.get('rol')?.disable();
              this.loading = false;
          },
          error: (e) => this.loading = false,
      })
  }
}
