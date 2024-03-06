import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota, MascotaResponse, Raza, Color } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RazaService } from '../../services/raza.service';
import { ColorService } from '../../services/color.service';


@Component({
    selector: 'app-agregar-editar-mascota',
    templateUrl: './agregar-editar-mascota.component.html',
    styleUrl: './agregar-editar-mascota.component.css'
})
export class AgregarEditarMascotaComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    id: number;
    operacion: string = "AGREGAR";
    mascotaResponse?: MascotaResponse;
    razas: Raza[] = [];
    colores: Color[] = [];


    constructor(private fb: FormBuilder,
        private _mascotaService: MascotaService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private aRoute: ActivatedRoute,
        private _razaService: RazaService,
        private _colorService: ColorService) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            raza: ['', Validators.required],
            color: ['', Validators.required],
            edad: ['', [Validators.required, Validators.min(0)]],
            peso: ['', [Validators.required, Validators.min(0)]],
        })

        this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
        console.log(this.id)
    }

    ngOnInit(): void {
        if (this.id != 0) {
            this.operacion = "EDITAR";
            this.obtenerMascota(this.id);
        }
        this.loadRazas();
        this.loadColores();
    }

    agregarEditarMascota() {
        const mascota: Mascota = {
            nombre: this.form.get('nombre')?.value,
            raza: this.form.get('raza')?.value,
            color: this.form.get('color')?.value,
            edad: this.form.get('edad')?.value,
            peso: this.form.get('peso')?.value,
        };

        if (this.id != 0) {
            mascota.id = this.id;
            this.editarMascota(this.id, mascota);
        } else {
            this.agregarMascota(mascota);
        }
    }

    agregarMascota(mascota: Mascota) {
        this.loading = true;
        var message = "La mascota fue creada con exito";
        var action = '';
        var config = { duration: 4000 };

        const razaObservable = this._razaService.getRazas();
        const colorObservable = this._colorService.getColores();
        forkJoin([razaObservable, colorObservable]).subscribe(
            ([raza, color]) => {
                this.mascotaResponse = {
                    ...mascota,
                    razaId: raza.filter(x => x.razaNombre == mascota.raza)[0].razaId,
                    colorId: color.filter(x => x.colorNombre == mascota.color)[0].colorId
                }

                this._mascotaService.addMascota(this.mascotaResponse).subscribe(() => {
                    this.loading = false;
                    this._snackBar.open(message, action, config);
                    this.router.navigate(['/listadoMascotas']);
                })
            }
        )
    }

    editarMascota(id: number, mascota: Mascota) {
        this.loading = true;
        var message = "La mascota fue modificada con exito";
        var action = '';
        var config = { duration: 4000 };

        const razaObservable = this._razaService.getRazas();
        const colorObservable = this._colorService.getColores();
        forkJoin([razaObservable, colorObservable]).subscribe(
            ([raza, color]) => {
                this.mascotaResponse = {
                    mascotaId: mascota.id,
                    nombre: mascota.nombre,
                    edad: mascota.edad,
                    peso: mascota.peso,
                    razaId: raza.filter(x => x.razaNombre == mascota.raza)[0].razaId,
                    colorId: color.filter(x => x.colorNombre == mascota.color)[0].colorId
                }
                console.log("!!!!", this.mascotaResponse);

                this._mascotaService.updateMascota(id, this.mascotaResponse).subscribe(() => {
                    this.loading = false;
                    this._snackBar.open(message, action, config);
                    this.router.navigate(['/listadoMascotas']);
                })
            }
        )
    }

    obtenerMascota(id: number) {
        var mascota: Mascota;
        this.loading = true;
        this._mascotaService.getMascota(this.id).subscribe({
            next: (data) => {
                const razaObservable = this._razaService.getRazas();
                const colorObservable = this._colorService.getColores();
                forkJoin([razaObservable, colorObservable]).subscribe(
                    ([raza, color]) => {
                        mascota = {
                            ...data,
                            raza: raza.filter(x => x.razaId == data.razaId)[0].razaNombre,
                            color: color.filter(x => x.colorId == data.colorId)[0].colorNombre
                        }
                        this.form.setValue({
                            nombre: mascota.nombre,
                            raza: mascota.raza,
                            color: mascota.color,
                            edad: mascota.edad,
                            peso: mascota.peso
                        })
                        console.log(mascota)
                    }
                )

                this.loading = false;
            },
            error: (e) => this.loading = false,
        })
    }

    loadRazas() {
        this._razaService.getRazas().subscribe((razas) => {
            this.razas = razas;
        });
    }

    loadColores() {
        this._colorService.getColores().subscribe((colores) => {
            this.colores = colores;
        });
    }
}
