import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

const elementosUsuarios: Usuario[] = [
    { userName: 'User1', role: 'Admin', email: 'user1@gmail.com', nombre: 'User', apellido: 'One' },
    { userName: 'User2', role: 'User', email: 'user2@gmail.com', nombre: 'User', apellido: 'Two' },
];

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrl: './usuarios-listado.component.css'
})
export class UsuariosListadoComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['userName', 'role', 'email', 'nombre', 'apellido', 'acciones'];
    dataSource = new MatTableDataSource<Usuario>(elementosUsuarios);
    loading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _snackBar: MatSnackBar, private _usuarioService: UsuarioService) {

    }

    ngOnInit(): void {
        this.obtenerUsuarios();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        if(this.dataSource.data.length > 0){
            this.paginator._intl.itemsPerPageLabel = 'Items'
        }
        this.dataSource.sort = this.sort;
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    obtenerUsuarios(){
        this.loading = true;

        this._usuarioService.getUsuarios().subscribe({
            next: (data) => {
                this.dataSource.data = data;
                this.loading = false;
                console.log(data);
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        }

        )
        
    }

    eliminarUsuario(id: number) {
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

}


