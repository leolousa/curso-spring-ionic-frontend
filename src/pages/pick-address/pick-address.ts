import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

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
          this.items = response['enderecos']; // Entre colchetes para não dar erro de compilação
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

}
