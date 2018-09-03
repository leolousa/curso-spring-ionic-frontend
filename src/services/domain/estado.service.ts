import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from '../../config/api.config';
import { EstadoDTO } from "../../models/estado.dto";

/**
 * Classe de serviço para os Estados
 */


@Injectable()
export class EstadoService {

  constructor(public http: HttpClient) {}

  findAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }
}
