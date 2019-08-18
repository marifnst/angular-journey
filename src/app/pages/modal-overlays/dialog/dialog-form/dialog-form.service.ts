import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DialogFormService {

  static DATA_SIZE = 500;

  constructor(private http:HttpClient) {}

  getCreateForm():Observable<any> {
    console.log('get form');
    return this.http.get("./assets/data/form-dynamic.json", {responseType: 'json'});
  }

  exportProcess(exportType, templatePayload):Promise<any> {
    // console.log("templatePayload.export_endpoint[exportType] : " + templatePayload.export_endpoint[exportType]);
    return this.http.post(templatePayload.export_endpoint[exportType], {}).toPromise();
  }

}
