import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'listadoMascotas', component: ListadoMascotasComponent},
    {path: 'agregarMascota', component: AgregarEditarMascotaComponent},
    {path: 'verMascota/:id', component: VerMascotaComponent},
    {path: 'editarMascota/:id', component: AgregarEditarMascotaComponent},
    {path: 'listadoUsuarios', component: UsuariosListadoComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
