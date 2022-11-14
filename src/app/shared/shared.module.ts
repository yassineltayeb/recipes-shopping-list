import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
