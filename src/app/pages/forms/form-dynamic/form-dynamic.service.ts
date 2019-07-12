import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FormDynamicService {
  
  constructor(private http:HttpClient) {}

  getForm():Observable<any> {
    console.log('get form');
    return this.http.get("./assets/data/form-dynamic.json", {responseType: 'json'});
  }
}
