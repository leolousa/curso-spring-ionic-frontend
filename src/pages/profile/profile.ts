import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../../services/storage.service';
import { ClienteService } from "./../../services/domain/cliente.service";
import { ClienteDTO } from './../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      // busca por e-mail do cliente
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO; // Cast feito pois alteramos a tipagem do método findByEmail(cliente.service) retorno da resposta
          this.getImageIfExists();

        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage'); // Navega para a página principal
          }
        });
    } else {
      this.navCtrl.setRoot('HomePage'); // Navega para a página principal caso ocorra algum problema para obter o localUser
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
  }


}
