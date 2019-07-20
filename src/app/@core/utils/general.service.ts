import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeneralService {
  constructor(private httpClient:HttpClient) {
    
  }

  async getMenu():Promise<any> {
    console.log('get menu GeneralService');
    let output = [];
    await this.httpClient.get("assets/data/menu.json", {responseType: 'json'}).toPromise().then(resp => {
      output = resp["menu"];
    });
    return output;
  }
}
