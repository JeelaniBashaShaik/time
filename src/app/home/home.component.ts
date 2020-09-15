import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;
  message;
  detailsOpen = false;
  constructor(private _auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('timeUser'));
  }

  logout() {
    this._auth.signOut();
  }

  gotologin() {
    this.router.navigateByUrl('login')
  }

}
