/**
 * Classe que representa uma moeda.
 */
export class Moeda {
  /**
   * @param sigla A sigla da moeda (ex.: "USD", "BRL").
   * @param descricao A descrição da moeda (ex.: "Dólar", "Real").
   */
  constructor(public sigla?: string, public descricao?: string) {
    if (sigla && sigla.length > 3) {
      throw new Error('A sigla deve ter no máximo 3 caracteres.');
    }
  }
}
