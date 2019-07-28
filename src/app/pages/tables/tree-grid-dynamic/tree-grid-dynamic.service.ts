import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TreeGridDynamicService {

  static DATA_SIZE = 500;

  constructor(private http:HttpClient) {}

  // getColumn(): Observable<any> {
  //   return this.http.get("assets/data/smart-table.json", {responseType: 'json'});
  // }

  async getColumn(module:string, templateCode:string): Promise<any> {
    console.log("get column tree");
    return await this.http.get("assets/data/tree-grid-dynamic.json", {responseType: 'json'}).toPromise();
  }
}
