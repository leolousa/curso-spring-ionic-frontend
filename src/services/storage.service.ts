import { Cart } from './../models/cart';
import { Injectable } from "@angular/core";
import { LocalUser } from './../models/local_user';
import { STORAGE_KEYS } from "./../config/storage_keys.config";

@Injectable()
export class StorageService {

  // Pega o usuário no LocalStorage
  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if(usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  // Grava o usuário no LocalStorage
  setLocalUser(obj: LocalUser) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  // Pega o carrinho de compras no LocalStorage
  getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);
    if(cart == null) {
      return null;
    } else {
      return JSON.parse(cart);
    }
  }

  // Grava o carrinho de compras no LocalStorage
  setCart(obj: Cart) {
    if(obj == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }
  }


}
