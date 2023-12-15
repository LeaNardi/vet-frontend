import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

  const elementosMascotas: Mascota[] = [
    {nombre: 'Simon', edad: 3, raza: 'Caniche', color: 'Dorado', peso: 5},
    {nombre: 'Ronnie', edad: 1, raza: 'Maltes', color: 'Blanco', peso: 1},
    {nombre: 'Kume', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28},
    {nombre: 'Kume', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28},
    {nombre: 'Kume', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28},
    {nombre: 'Kume', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28},
    {nombre: 'Kume', edad: 6, raza: 'Labrador', color: 'Marron', peso: 28},
  ];

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso'];
    dataSource = new MatTableDataSource<Mascota>(elementosMascotas);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Items'
    }
}
