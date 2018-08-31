import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()// Decorator da página
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Controlador da View
  constructor(public navCtrl: NavController) {

  }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
