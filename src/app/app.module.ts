import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalInputComponent } from './shared/modal-input/modal-input.component';
import { ModalClearHistoryComponent } from './shared/modal-clear-history/modal-clear-history.component';
import { ModalConfirmComponent } from './shared/modal-confirm/modal-confirm.component';
import { DragDropModule } from '@angular/cdk/drag-drop';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ModalInputComponent,
    ModalClearHistoryComponent,
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas)
  }
}
