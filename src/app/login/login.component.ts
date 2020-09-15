import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthenticationService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private _auth: AuthenticationService, private router: Router, private db: AngularFirestore) {
  }
  login() {
    /* this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(data => {
      this.router.navigateByUrl('home');
    }); */
    this._auth.googleLogin();
  }
  logout() {
    /* this.afAuth.auth.signOut().then(data => {
      this.router.navigateByUrl('home');
    }); */
    this._auth.signOut();
  }

  ngOnInit() {
  }

}
