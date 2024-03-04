import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosListadoComponent } from './components/usuarios-listado/usuarios-listado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarEditarUsuarioComponent } from './components/agregar-editar-usuario/agregar-editar-usuario.component';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { administradorGuard } from './guards/administrador.guard';
import { userGuard } from './guards/user.guard';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard]},
    {path: 'listadoMascotas', component: ListadoMascotasComponent, canActivate: [userGuard]},
    {path: 'agregarMascota', component: AgregarEditarMascotaComponent, canActivate: [userGuard]},
    {path: 'verMascota/:id', component: VerMascotaComponent, canActivate: [userGuard]},
    {path: 'editarMascota/:id', component: AgregarEditarMascotaComponent, canActivate: [userGuard]},
    {path: 'listadoUsuarios', component: UsuariosListadoComponent, canActivate: [administradorGuard]},
    {path: 'agregarUsuario', component: AgregarEditarUsuarioComponent, canActivate: [administradorGuard]},
    {path: 'editarUsuario/:id', component: AgregarEditarUsuarioComponent, canActivate: [administradorGuard]},
    {path: 'verUsuario/:id', component: VerUsuarioComponent, canActivate: [administradorGuard]},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
