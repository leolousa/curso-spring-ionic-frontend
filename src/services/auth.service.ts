import { StorageService } from './storage.service';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { API_CONFIG } from './../config/api.config';
import { LocalUser } from './../models/local_user';

@Injectable()
export class AuthService {

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) { }

  // Verifica login do usuário na API
  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
        creds,
        {
          observe: 'response',
          responseType: 'text'
      });
  }

  // Remove o Bearer_ (Recorta a string à partir do 7o caractere) e guarda o token no LocalStorage
  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);
  }

  //Método de logout - remover o usuário do LocalStorage
  logout() {
    this.storage.setLocalUser(null);
  }

}
