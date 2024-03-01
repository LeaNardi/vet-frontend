import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
    selector: 'app-ver-usuario',
    templateUrl: './ver-usuario.component.html',
    styleUrl: './ver-usuario.component.css'
})
export class VerUsuarioComponent {
    id: String;
    usuario: Usuario;
    loading = false;

    constructor(private _usuarioService: UsuarioService,
        private aRoute: ActivatedRoute) {
        this.id = (this.aRoute.snapshot.paramMap.get('id')!);
        this.usuario = {
            nombre: "string",
            apellido: "string",
            username: "string",
            email: "string",
            role: "string"
        };
    }

    ngOnInit(): void {
        this.obtenerUsuario();
    }

    obtenerUsuario() {
        this.loading = true;
        this._usuarioService.getUsuario(this.id).subscribe({
            next: (data) => {
                this.usuario.apellido = data.apellido;
                this.usuario.nombre = data.nombre;
                this.usuario.username = data.username;
                this.usuario.email = data.email;
                this.usuario.role = data.role;

                this.loading = false;
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        })
    }
}
