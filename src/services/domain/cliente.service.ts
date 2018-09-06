
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) { }

  /*  findByEmail(email: string): Observable<ClienteDTO> {

    // Não precisamos mais deste código pois inserimos o token
    // de autorização pelo Interceptor (AuthInterceptor)
    // let token = this.storage.getLocalUser().token;
    // let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    //    return this.http.get<ClienteDTO>(
    //  `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
    //  { 'headers': authHeader });

    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }*/

  // Removendo a tipagem do ClienteDTO
  findByEmail(email: string){
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj,
      {
        observe: 'response',
        responseType: 'text' // o corpo vem vazio, então retornamos texto para não dar o erro de JSON
      }
    );
  }
}
