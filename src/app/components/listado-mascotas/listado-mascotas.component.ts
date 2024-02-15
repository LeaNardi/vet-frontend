import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

const elementosMascotas: Mascota[] = [
    { nombre: 'Simon1', edad: 3, raza: 'Caniche', color: 'Dorado', peso: 5 },
    { nombre: 'Simon2', edad: 1, raza: 'Maltes', color: 'Blanco', peso: 1 },
    { nombre: 'Simon3', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28 },
    { nombre: 'Simon4', edad: 6, raza: 'Golden', color: 'Marron', peso: 23 },
    { nombre: 'Simon5', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28 },
    { nombre: 'Simon6', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28 },
    { nombre: 'Simon7', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28 },
];

@Component({
    selector: 'app-listado-mascotas',
    templateUrl: './listado-mascotas.component.html',
    styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
    dataSource = new MatTableDataSource<Mascota>(elementosMascotas);
    loading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService) {

    }

    ngOnInit(): void {
        this.obtenerMascotas();
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

    obtenerMascotas(){
        this.loading = true;

        this._mascotaService.getMascotas().subscribe({
            next: (data) => {
                this.dataSource.data = data;
                this.loading = false;
                console.log(data);
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        }

        )

        
        // this._mascotaService.getMascotas().subscribe(data => {
        //     this.dataSource.data = data;
        //     this.loading = false;
        // }, error => {
        //     this.loading = false
        //     alert('Ocurrio un error')
        // }
        // );
        
    }

    eliminarMascota(id: number) {
        var message = "La mascota fue eliminada con exito";
        var action = '';
        var config = {duration: 4000};

        this.loading = true;

        this._mascotaService.deleteMascota(id).subscribe(
            () => {
                this._snackBar.open(message, action, config);
                this.loading = false;
                this.obtenerMascotas(); // Para que refresque la tabla luego de eliminar
            }
        );
    }
}
