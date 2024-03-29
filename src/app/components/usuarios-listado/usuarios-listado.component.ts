import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

const elementosUsuarios: Usuario[] = [];

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrl: './usuarios-listado.component.css'
})
export class UsuariosListadoComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['userName', 'role', 'email', 'nombre', 'apellido', 'acciones'];
    dataSource = new MatTableDataSource<Usuario>(elementosUsuarios);
    loading = false;

    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _snackBar: MatSnackBar, private _usuarioService: UsuarioService, private auth:AuthenticationService, private router:Router) {
    }

    ngOnInit(): void {
        this.obtenerUsuarios();
    }

    ngAfterViewInit(): void {
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
            return data.nombre.toLowerCase().includes(filter) || data.nombre.toLowerCase().startsWith(filter);
        };
        this.dataSource.filter = filterValue;
    }

    obtenerUsuarios(){
        this.loading = true;
        this.dataSource.data = []; // Vaciar la matriz antes de agregar usuarios nuevos

        this._usuarioService.getUsuarios().subscribe({
            next: (data) => {
                console.log(data)
                data.forEach(dataelement => {
                    var nuevoUsuario : Usuario = {
                        nombre: "string",
                        apellido: "string",
                        username: "string",
                        email: "string",
                        role: "string"
                    };
                    nuevoUsuario.id = dataelement.id;
                    nuevoUsuario.apellido = dataelement.apellido;
                    nuevoUsuario.nombre = dataelement.nombre;
                    nuevoUsuario.username = dataelement.username;
                    nuevoUsuario.email = dataelement.email;
                    nuevoUsuario.role = dataelement.role;
                    this.dataSource.data.push(nuevoUsuario);
                });

                console.log(this.dataSource.data)
                this.loading = false;
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        }

        )
        
    }

    eliminarUsuario(id: string) {
        var message = "El usuario fue eliminado con exito";
        var action = '';
        var config = {duration: 4000};

        this.loading = true;

        this._usuarioService.deleteUsuario(id).subscribe(
            () => {
                this._snackBar.open(message, action, config);
                this.loading = false;
                this.obtenerUsuarios(); // Para que refresque la tabla luego de eliminar
            }
        );
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


