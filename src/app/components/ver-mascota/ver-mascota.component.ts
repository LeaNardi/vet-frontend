import { Component } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Color, Mascota, Raza } from '../../interfaces/mascota';
import { RazaService } from '../../services/raza.service';
import { ColorService } from '../../services/color.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Historia } from '../../interfaces/historia';
import { HistoriaService } from '../../services/historia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-ver-mascota',
    templateUrl: './ver-mascota.component.html',
    styleUrl: './ver-mascota.component.css',
})
export class VerMascotaComponent {
    id: number;
    mascota: Mascota | undefined;
    loading = false;
    displayedColumns: string[] = ['fecha', 'veterinario', 'detalle'];
    dataSource = new MatTableDataSource<Historia>();
    formHist: FormGroup;


    constructor(private _mascotaService: MascotaService,
        private aRoute: ActivatedRoute,
        private _razaService: RazaService,
        private _colorService: ColorService,
        private _historiaService: HistoriaService,
        private fb: FormBuilder) {
        this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
        this.formHist = this.fb.group({
            fecha: ['',Validators.required],
            veterinario: ['',Validators.required],
            detalle: ['',Validators.required],
        })
    }

    ngOnInit(): void { 
        this.obtenerMascota();
        this.obtenerHistorias();
        this.formHist.get('fecha')?.patchValue(formatDate(new Date(),'yyyy-MM-dd HH:mm','en-US'))

        
    }

    ngAfterViewInit(): void {

    }


    obtenerMascota() {
        this.loading = true;

        this._mascotaService.getMascota(this.id).subscribe({
            next: (data) => {
                const razaObservable = this._razaService.getRazas();
                const colorObservable = this._colorService.getColores();

                forkJoin([razaObservable, colorObservable]).subscribe(
                    ([raza, color]) => {
                        this.mascota = {
                            ...data,
                            raza: raza.filter(x => x.razaId == data.razaId)[0].razaNombre,
                            color: color.filter(x => x.colorId == data.colorId)[0].colorNombre
                        }
                    }
                )
                this.loading = false;
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        })
    }

    obtenerHistorias() {
        this._historiaService.getHistorias(this.id).subscribe({
            next: (data) => {
                this.dataSource.data = data;
            },
            // error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        })

    }

    agregarHistoria(){
        const historia: Historia = {
            fecha:  new Date(),
            veterinario: this.formHist.get('veterinario')?.value,
            detalle: this.formHist.get('detalle')?.value,
            mascotaid: this.id,
        };
        this._historiaService.addHistoria(this.id, historia).subscribe(() => {
            this.obtenerHistorias();
        })
    }
}
