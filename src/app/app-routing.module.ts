import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
  children: [
    { path: '', component: MenuComponent },
    { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
    { path: 'events', loadChildren: './events/events/events.module#EventsModule' },
    { path: 'news', loadChildren: './news/news/news.module#NewsModule' },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
