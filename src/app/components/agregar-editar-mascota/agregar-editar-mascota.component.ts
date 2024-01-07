import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrl: './agregar-editar-mascota.component.css'
})
export class AgregarEditarMascotaComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup

    constructor(private fb: FormBuilder,
        private _mascotaService: MascotaService,
        private _snackBar: MatSnackBar){
        this.form = this.fb.group({
            nombre: ['',Validators.required],
            raza: ['',Validators.required],
            color: ['',Validators.required],
            edad: ['',Validators.required],
            peso: ['',Validators.required],
        })
    }

    ngOnInit(): void{

    }

    agregarMascota(){
        const mascota: Mascota = {
            nombre:  this.form.get('nombre')?.value,
            raza: this.form.get('raza')?.value,
            color: this.form.get('color')?.value,
            edad: this.form.get('edad')?.value,
            peso: this.form.get('peso')?.value,
        };
        var message = "La mascota fue creada con exito";
        var action = '';
        var config = {duration: 4000};


        this._mascotaService.addMascota(mascota).subscribe(data => {
            this._snackBar.open(message, action, config);
        })
    }
}
