import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DialogFormService {

  static DATA_SIZE = 500;

  constructor(private http:HttpClient) {}

  getCreateForm(): Observable<any> {
    return this.http.get("assets/data/smart-table.json", {responseType: 'json'});
  }

}
