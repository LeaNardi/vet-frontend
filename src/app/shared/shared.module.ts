import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressComponent } from './progress/progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
    declarations: [
        ProgressComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatGridListModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        ProgressComponent,
        MatProgressBarModule,
        MatGridListModule
    ]
})
export class SharedModule { }
