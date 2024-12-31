/**
 * Classe que representa uma conversão de moeda.
 */

export class Conversao {
  /**
   * @param moedaDe A sigla da moeda de origem da qual deseja converter (ex.: "USD", "BRL").
   * @param moedaPara A sigla da moeda de destino da qual deseja converter (ex.: "USD", "BRL").
   * @param valor O valor a ser convertido da moeda (ex.: 100,00).
   */
  constructor(
    public moedaDe?: string,
    public moedaPara?: string,
    public valor?: number) { }
}
