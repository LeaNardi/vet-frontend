import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { UsuariosListadoComponent } from './components/usuarios-listado/usuarios-listado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerUsuarioComponent } from './components/ver-usuario/ver-usuario.component';
import { AgregarEditarUsuarioComponent } from './components/agregar-editar-usuario/agregar-editar-usuario.component';
import { MatSelectModule } from '@angular/material/select';
import {PermissionsService} from './guards/administrador.guard';
import { UserService } from './guards/user.guard';

@NgModule({
    declarations: [
        AppComponent,
        AgregarEditarMascotaComponent,
        ListadoMascotasComponent,
        VerMascotaComponent,
        LoginComponent,
        UsuariosListadoComponent,
        DashboardComponent,
        AgregarEditarUsuarioComponent,
        VerUsuarioComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
        MatSelectModule,
    ],
    providers: [PermissionsService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
