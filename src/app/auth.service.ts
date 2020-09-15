import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MessagingService } from './messaging.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    user: Observable<User>;

    constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore,
        private messagingService: MessagingService) {
        this.user = this.afAuth.authState.pipe(switchMap(user => {
            if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return of(null);
            }
        }));
    }

    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
            this.updateUserData(credential.user);
        const data: User = {
            uid: credential.user.uid,
            email: credential.user.email,
            photoURL: credential.user.photoURL,
            displayName: credential.user.displayName,
        };
            localStorage.setItem('timeUser', JSON.stringify(data));
            this.messagingService.requestPermission(data.uid);
            this.messagingService.receiveMessage();
            this.router.navigateByUrl('home');
        });
    }

    private updateUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
        };
       // localStorage.setItem('timeUser', JSON.stringify(data));

        return userRef.set(data, { merge: true });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('timeUser');
            this.router.navigateByUrl('/login');
        });
    }
}
