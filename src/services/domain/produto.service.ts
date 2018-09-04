import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {}

  // Busca por id
  findById(produto_id: string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  // Busca por categoria
  findByCategoria(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  // Traz a imagem pequena do S3
  getSmallImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;

    return this.http.get(url, {responseType: 'blob'}); // blob pois recebe uma imagem
  }

  // Traz a imagem do S3
  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;

    return this.http.get(url, {responseType: 'blob'}); // blob pois recebe uma imagem
  }
}
