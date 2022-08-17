import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { WordData, BASE_URL, ENDPOINTS } from 'src/app/models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  getData(group: number, page: number): Observable<WordData[]>{
    const params = new HttpParams()
      .set('group', `${group}`)
      .set('page', `${page}`)

      const options = {
        params: params
      }

    return this.http.get<WordData[]>(`${BASE_URL}/${ENDPOINTS.words}`, options)
  }
}
