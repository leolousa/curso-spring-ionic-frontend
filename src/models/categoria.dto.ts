/** Interface que representa a entidade de Categoria da API
 *  Criamos os campos como string para facilitar uma possível migração para
 *  um Banco de dados que utilize string como chave (ex.: MongoDB)
 **/
export interface  CategoriaDTO {
  id: string;
  nome: string;
}
