import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MzToastModule } from 'ngx-materialize';
import { NewsLandingComponent } from './../news-landing/news-landing.component';
import { NewsItemComponent } from './../news-item/news-item.component';
import { NewsRoutingModule } from './../news-routing.module';
import { MzSelectModule } from 'ngx-materialize';


@NgModule({
  declarations: [NewsLandingComponent, NewsItemComponent ],
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule,
    MzToastModule,
    MzSelectModule,
  ]
})
export class NewsModule { }
