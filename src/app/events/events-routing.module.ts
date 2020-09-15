import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsLandingComponent } from './events-landing/events-landing.component';

const routes: Routes = [
  { path: '', component: EventsLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
