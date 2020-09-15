import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PeopleLandingComponent} from './../people-landing/people-landing.component';
import { PeopleRoutingModule } from './../people-routing.module';
import { MzToastModule } from 'ngx-materialize';

@NgModule({
  declarations: [PeopleLandingComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    PeopleRoutingModule,
    MzToastModule
  ]
})
export class PeopleModule { }
