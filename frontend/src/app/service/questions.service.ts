import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

import {
  Question
} from '../model/Questions';

import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private _url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  GetQuestions(queryObj: any): Observable < Question[] > {
    return this.http.post < Question[] > (`${this._url}/questions/query`, queryObj)
      .map(x => {
        console.log('GetQuestions: ', x);
        return x;
      });
  }

  GetQuestion(id: string): Observable < Question > {
    return this.http.get < Question[] > (`${this._url}/questions/${id}`)
      .map(x => {
        console.log('GetQuestion: ', x);
        return x[0];
      });
  }

  AddQuestion(Question: Question): Observable < Question > {
    return this.http.post < Question > (`${this._url}/questions/`, Question)
      .map(x => {
        console.log('AddQuestion: ', x);
        return x;
      });
  }

  UpdateQuestion(Question: Question): Observable < void > {
    return this.http.put < void > (`${this._url}/questions/${Question._id}`, Question)
      .map(x => {
        console.log('UpdateQuestion: ', x);
        return x;
      });
  }

  DeleteQuestion(id: string) {
    return this.http.delete(`${this._url}/questions/${id}`)
      .map(x => {
        console.log('DeleteQuestion: ', x);
        return x;
      });
  }
  upload(file:any){
    return this.http.post(`${this._url}/questions/upload`,file, {
      reportProgress: true,
      observe: 'events'}).map(x => {
      console.log('upload: ', x);
      return x;
    });
  }
  download(queryObj: any): Observable<Blob> {
    return this.http.post <Blob> (`${this._url}/questions/query`, queryObj)
      .map(x => {
        console.log('GetQuestions: ', x);
        return x;
      });
  }
}