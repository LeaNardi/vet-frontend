import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-agregar-editar-usuario',
  templateUrl: './agregar-editar-usuario.component.html',
  styleUrl: './agregar-editar-usuario.component.css'
})
export class AgregarEditarUsuarioComponent implements OnInit{

  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = "AGREGAR";

  constructor(private fb: FormBuilder,
      private _usuarioService: UsuarioService,
      private _snackBar: MatSnackBar,
      private router: Router,
      private aRoute: ActivatedRoute){
      this.form = this.fb.group({
          nombre: ['',Validators.required],
          apellido: ['',Validators.required],
          usuario: ['',Validators.required],
          email: ['',Validators.required],
          rol: ['',Validators.required],
      })

      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
      console.log(this.id)
  }

  ngOnInit(): void{
      if(this.id != 0){
          this.operacion = "EDITAR";
          this.obtenerUsuario(this.id);
      }
  }

  agregarEditarUsuario(){
      const usuario: Usuario = {
          nombre:  this.form.get('nombre')?.value,
          apellido: this.form.get('apellido')?.value,
          usuario: this.form.get('usuario')?.value,
          email: this.form.get('email')?.value,
          rol: this.form.get('rol')?.value,
      };
      
      if(this.id != 0){
          usuario.id = this.id;
          this.editarUsuario(this.id, usuario);
      }else{
          this.agregarUsuario(usuario);
      }
  }

  agregarUsuario(usuario: Usuario){
      this.loading = true;
      var message = "El usuario fue creado con exito";
      var action = '';
      var config = {duration: 4000};

      this._usuarioService.addUsuario(usuario).subscribe(data => {
          this.loading = false;
          this._snackBar.open(message, action, config);
          this.router.navigate(['/listadoUsuarios']);
      })
  }

  editarUsuario(id: number, usuario: Usuario){
      this.loading = true;
      var message = "El usuario fue modificado con exito";
      var action = '';
      var config = {duration: 4000};

      this._usuarioService.updateUsuario(id, usuario).subscribe(() => {
          this.loading = false;
          this._snackBar.open(message, action, config);
          this.router.navigate(['/listadoUsuarios']);
      })
  }

  obtenerUsuario(id: number){
      this.loading = true;
      this._usuarioService.getUsuario(this.id).subscribe({
          next: (data) => {
              this.form.setValue({
                  nombre: data.nombre,
                  apellido: data.apellido,
                  usuario: data.usuario,
                  email: data.email,
                  rol: data.rol
              })
              this.loading = false;
          },
          error: (e) => this.loading = false,
      })
  }
}
