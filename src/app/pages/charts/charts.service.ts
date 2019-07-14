import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ChartsService {

  constructor(private http : HttpClient) {

  }

  getPieChart() : Observable<any> {
    return this.http.get("assets/data/chartjs-dynamic/chartjs-dynamic-pie.json", {responseType: 'json'});
  }

  protected generateData(): Array<any> {
    return null;
  }
}

