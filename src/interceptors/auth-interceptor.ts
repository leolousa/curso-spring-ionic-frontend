import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from '../services/storage.service';

/**
 * Classe que implementa o Interceptor de autenticação
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    // Variável para verificar se a requisição é de nossa API
    // se não, não enviamos o Token (ex.: Amazon S3)
    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;


    // verifica se tem o Token no localStorage e se a requisição é para nossa API
    if(localUser && requestToAPI) {
      // clonamos a requisição para então anexar o token de autenticação
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }


  }

}

// Exigências para criação do Interceptor - Este é o Provider do interceptor
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
