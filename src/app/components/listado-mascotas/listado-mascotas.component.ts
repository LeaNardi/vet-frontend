import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Color, Mascota, MascotaResponse, Raza } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { RazaService } from '../../services/raza.service';
import { ColorService } from '../../services/color.service';
import { forkJoin, map } from 'rxjs';

// const elementosMascotas: Mascota[] = [];

@Component({
    selector: 'app-listado-mascotas',
    templateUrl: './listado-mascotas.component.html',
    styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
    dataSource = new MatTableDataSource<Mascota>();
    loading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private _snackBar: MatSnackBar,
        private _mascotaService: MascotaService,
        private auth: AuthenticationService,
        private router: Router,
        private _razaService: RazaService,
        private _colorService: ColorService) {

    }

    ngOnInit(): void {
        this.obtenerMascotas();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        // if (this.dataSource.data.length > 0) {
        //     this.paginator._intl.itemsPerPageLabel = 'Items'
        // }
        this.paginator._intl.itemsPerPageLabel = 'Items'
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    obtenerMascotas() {
        // let razas: Raza[];
        // let colores: Color[];

        this.loading = true;

        // this._razaService.getRazas().subscribe({
        //     next: (data) => {
        //         razas = data;
        //         console.log(data);
        //     },
        //     error: (e) => this.loading = false,
        // }
        // )

        // this._colorService.getColores().subscribe({
        //     next: (data) => {
        //         colores = data;
        //         console.log(data);
        //     },
        //     error: (e) => this.loading = false,
        // }
        // )

        this._mascotaService.getMascotas().subscribe({
            next: (data: MascotaResponse[]) => {
                const razaObservable = this._razaService.getRazas();
                const colorObservable = this._colorService.getColores();


                forkJoin([razaObservable, colorObservable]).subscribe(
                    ([raza, color]) => {
                        this.dataSource.data = data.map((mascota) => {
                            console.log(raza)
                            return {
                                ...mascota,
                                raza: raza.filter(x => x.razaId == mascota.razaId)[0].razaNombre,
                                color: color.filter(x => x.colorId == mascota.colorId)[0].colorNombre
                            }
                        }
                        )
                        console.log("!!!!",this.dataSource.data)
                    }
                );


                // this.dataSource.data = data.map((mascota) => {
                //     return {
                //         ...mascota,
                //         raza: razas.filter(x => x.razaid == mascota.razaId)[0].razanombre,
                //         color: colores.filter(x => x.colorid == mascota.colorId)[0].colornombre
                //     }
                // })

                this.loading = false;
                console.log(data);
            },
            error: (e) => this.loading = false,
        }

        )
    }

    eliminarMascota(id: number) {
        var message = "La mascota fue eliminada con exito";
        var action = '';
        var config = { duration: 4000 };

        this.loading = true;

        this._mascotaService.deleteMascota(id).subscribe(
            () => {
                this._snackBar.open(message, action, config);
                this.loading = false;
                this.obtenerMascotas(); // Para que refresque la tabla luego de eliminar
            }
        );
    }

    async logout() {
        const token = await this.auth.resetSession();
        this.router.navigate(['/login']); 
      }
    
      confirmarSalir() {
        if (confirm('¿Estás seguro que deseas salir?')) {
            this.logout(); // Llama a la función logout si se confirma la salida
        }
    }
}
