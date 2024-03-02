import { Component } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Color, Mascota, Raza } from '../../interfaces/mascota';
import { RazaService } from '../../services/raza.service';
import { ColorService } from '../../services/color.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-ver-mascota',
    templateUrl: './ver-mascota.component.html',
    styleUrl: './ver-mascota.component.css'
})
export class VerMascotaComponent {
    id: number;
    mascota: Mascota | undefined;
    loading = false;

    constructor(private _mascotaService: MascotaService,
        private aRoute: ActivatedRoute,
        private _razaService: RazaService,
        private _colorService: ColorService) {
        this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
    }

    ngOnInit(): void { 
        this.obtenerMascota();
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
}
