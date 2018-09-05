import { FieldMessage } from './../models/fieldmessage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

/**
 * Classe de erro global
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {
          let errorObj = error;
          if(errorObj.error){
            errorObj = errorObj.error;
          }

          if(!errorObj.status) {
            errorObj = JSON.parse(errorObj);
          }

          console.log("Erro detectado pelo interceptor: ");
          console.log(errorObj);

          switch(errorObj.status) {

            case 401: // Erro de autenticação
              this.handle401();
              break;

            case 403: // Acesso negado - Autenticação falhou
              this.handle403();
              break;

            case 404: // Recurso não encontrado
              this.handle404();
              break;

            case 422: // Erro de validação
              this.handle422(errorObj);
              break;

            default:
              this.handleDefaultError(errorObj);
              break;
          }
          // propaga o erro para o controlador
          return Observable.throw(errorObj);
      }) as any;
  }

  handle401() {

    let alert = this.alertCtrl.create({
      title: 'Erro 401: Falha de autenticação!',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });

    alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle404() {
    let alert = this.alertCtrl.create({
      title: 'Erro 404: Recurso não disponível!',
      message: 'Não foi possível acessar o recurso neste momento',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });

    alert.present();
  }

  handle422(erroObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro 422: Erro de validação!',
      message: this.listErrors(erroObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });

    alert.present();
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    });

    alert.present();
  }

  listErrors(messages: FieldMessage[]): string {
    let s: string = '';
    for (var i=0; i<messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
    }

    return s;
  }


}





// Exigências para criação do Interceptor
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
