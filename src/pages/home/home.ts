import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { AuthService } from './../../services/auth.service';

@IonicPage()// Decorator da página
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  }

  // Controlador da View
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) { }

  // Antes de entrar na página
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  // Deixou a página
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  // entrou na página
  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization')); // Chama método que armazena o Token
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization')); // Chama método que armazena o Token
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});
  }

}
