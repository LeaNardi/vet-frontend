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
  id: number;
  usuario: Usuario | undefined;
  loading = false;

  constructor(private _usuarioService: UsuarioService,
      private aRoute: ActivatedRoute) {
      this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void { 
      this.obtenerUsuario();
  }

  obtenerUsuario() {
      this.loading = true;
      this._usuarioService.getUsuario(this.id).subscribe({
          next: (data) => {
              this.usuario = data;
              this.loading = false;
          },
          error: (e) => this.loading = false,
          // complete: () => console.info('Complete')
      })
  }
}
