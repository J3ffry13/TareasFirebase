import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private afAuth: AngularFireAuth,
    private localStorage: LocalStorageService,
    private router: Router) { }


  logOut() {
    this.localStorage.EliminarItemDelLocalStorage('idUser')
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
