import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: '1',
        nome: 'mouse',
        preco: 80.99
      },
      {
        id: '2',
        nome: 'Teclado',
        preco: 100.00
      },
      {
        id: '3',
        nome: 'Monitor',
        preco: 1180.59
      }
    ]
  }

}
