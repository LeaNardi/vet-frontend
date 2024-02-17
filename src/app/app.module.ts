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
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';




@NgModule({
    declarations: [
        AppComponent,
        AgregarEditarMascotaComponent,
        ListadoMascotasComponent,
        VerMascotaComponent,
        LoginComponent,
        UsuariosListadoComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
