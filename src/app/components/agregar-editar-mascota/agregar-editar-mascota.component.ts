import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


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

    constructor(private fb: FormBuilder,
        private _mascotaService: MascotaService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private aRoute: ActivatedRoute){
        this.form = this.fb.group({
            nombre: ['',Validators.required],
            raza: ['',Validators.required],
            color: ['',Validators.required],
            edad: ['',Validators.required],
            peso: ['',Validators.required],
        })

        this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
        console.log(this.id)
    }

    ngOnInit(): void{
        if(this.id != 0){
            this.operacion = "Editar";
            this.obtenerMascota(this.id);
        }
    }

    agregarEditarMascota(){
        const mascota: Mascota = {
            nombre:  this.form.get('nombre')?.value,
            raza: this.form.get('raza')?.value,
            color: this.form.get('color')?.value,
            edad: this.form.get('edad')?.value,
            peso: this.form.get('peso')?.value,
        };
        
        if(this.id != 0){
            mascota.id = this.id;
            this.editarMascota(this.id, mascota);
        }else{
            this.agregarMascota(mascota);
        }
    }

    agregarMascota(mascota: Mascota){
        this.loading = true;
        var message = "La mascota fue creada con exito";
        var action = '';
        var config = {duration: 4000};

        this._mascotaService.addMascota(mascota).subscribe(data => {
            this.loading = false;
            this._snackBar.open(message, action, config);
            this.router.navigate(['listMascotas']);
        })
    }

    editarMascota(id: number, mascota: Mascota){
        this.loading = true;
        var message = "La mascota fue modificada con exito";
        var action = '';
        var config = {duration: 4000};

        this._mascotaService.updateMascota(id, mascota).subscribe(() => {
            this.loading = false;
            this._snackBar.open(message, action, config);
            this.router.navigate(['listMascotas']);
        })
    }

    obtenerMascota(id: number){
        this.loading = true;
        this._mascotaService.getMascota(this.id).subscribe({
            next: (data) => {
                this.form.setValue({
                    nombre: data.nombre,
                    raza: data.raza,
                    color: data.raza,
                    edad: data.edad,
                    peso: data.peso
                })
                this.loading = false;
            },
            error: (e) => this.loading = false,
        })
    }
}
