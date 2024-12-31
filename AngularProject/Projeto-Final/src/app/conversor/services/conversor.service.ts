import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  Conversao,
  ConversaoResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  constructor(private http: HttpClient) { }

  /**
   * Realiza a chamada para a API de conversão de moedas.
   *
   * @param conversao Conversao
   * @return Observable<ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<ConversaoResponse> {
    const params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http
      .get<ConversaoResponse>(this.BASE_URL + params)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erro na API de conversão:', error.message);
          return throwError(() => error);
        })
      );
  }

  /**
   * Retorna a cotação para dado uma response.
   *
   * @param conversaoResponse ConversaoResponse
   * @param conversao Conversao
   * @return number
   */
  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (!conversaoResponse || !conversaoResponse.rates) {
      return 0;
    }

    const rate = conversaoResponse.rates[conversao.moedaPara as keyof typeof conversaoResponse.rates];
    return rate || 0;
  }


  /**
   * Retorna a cotação de dado uma response.
   *
   * @param conversaoResponse ConversaoResponse
   * @param conversao Conversao
   * @return string
   */
  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (!conversaoResponse || !conversaoResponse.rates) {
      return '0';
    }

    const rate = conversaoResponse.rates[conversao.moedaPara as keyof typeof conversaoResponse.rates];
    return rate ? (1 / rate).toFixed(4) : '0';
  }


  /**
   * Retorna a data da cotação dado uma response.
   *
   * @param conversaoResponse ConversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (!conversaoResponse) {
      return '';
    }
    return conversaoResponse.date;
  }
}
