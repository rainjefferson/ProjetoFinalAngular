/**
 * Classe que representa uma resposta de conversão de moeda do servidor.
 */
export class ConversaoResponse {
  /**
   * @param base A sigla da moeda que usou como referência para a conversão (ex.: "USD", "BRL").
   * @param date A data que a consulta foi realizada (ex.: "2020-06-01").
   * @param rates A conversão da moeda final (ex.: "BRL":5.00).
   */
  constructor(
    public base: string,
    public date: string,
    public rates: { [key: string]: number }) { }
}
