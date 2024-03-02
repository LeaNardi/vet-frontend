import { Component } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Color, Mascota, Raza } from '../../interfaces/mascota';
import { RazaService } from '../../services/raza.service';
import { ColorService } from '../../services/color.service';

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
        let razas: Raza[];
        let colores: Color[];

        this.loading = true;
        this._razaService.getRazas().subscribe({
            next: (data) => {
                razas = data;
                console.log(data);
            },
            error: (e) => this.loading = false,
        }
        )

        this._colorService.getColores().subscribe({
            next: (data) => {
                colores = data;
                console.log(data);
            },
            error: (e) => this.loading = false,
        }
        )


        this._mascotaService.getMascota(this.id).subscribe({
            next: (data) => {
                this.mascota = {
                    ...data,
                    raza: razas.filter(x => x.razaId == data.razaId)[0].razaNombre,
                    color: colores.filter(x => x.colorId == data.colorId)[0].colorNombre
                }



                // this.mascota = data;
                // this.loading = false;
            },
            error: (e) => this.loading = false,
            // complete: () => console.info('Complete')
        })
    }
}
