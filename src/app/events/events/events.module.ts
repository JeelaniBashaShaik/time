import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {EventsRoutingModule } from './../events-routing.module';
import { EventsLandingComponent } from './../events-landing/events-landing.component';
import { MzIconMdiModule, MzTooltipModule, MzButtonModule, MzSelectModule , 
  MzCollapsibleModule, MzTimepickerModule, MzInputModule, MzTextareaModule, MzDatepickerModule, MzToastModule   } from 'ngx-materialize';
import { EventComponent } from '../event/event.component';
@NgModule({
  declarations: [
    EventsLandingComponent,
    EventComponent
  ],
  imports: [
    CommonModule, AngularFirestoreModule.enablePersistence(),
    EventsRoutingModule, FormsModule, MzTimepickerModule, MzSelectModule ,
    MzDatepickerModule, MzTooltipModule, MzIconMdiModule, MzTextareaModule,
    MzButtonModule, MzCollapsibleModule,
  MzInputModule, MzToastModule
  ]
})
export class EventsModule { }
