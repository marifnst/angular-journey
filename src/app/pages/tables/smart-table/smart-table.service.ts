import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';

@Injectable()
export class SmartTableService {

  static DATA_SIZE = 500;

  constructor(private http:HttpClient) {}

  async templateInitialization(module:string, templateCode:string): Promise<any> {
    return await this.http.post("/api/template/init/" + module + "/" + templateCode, {responseType: 'json'}).toPromise();
  }

  getColumn(module:string, templateCode:string): Observable<any> {
    // if (templateCode == 'role_management') {
    //   return this.http.get("assets/data/role-management.json", {responseType: 'json'});
    // } else if (templateCode == 'user_management') {
    //   return this.http.get("assets/data/user-management.json", {responseType: 'json'});
    // } else if (templateCode == 'menu_management') {
    //   return this.http.get("assets/data/menu-management.json", {responseType: 'json'});
    // } else if (templateCode == 'sample_report_long') {
    //   return this.http.get("assets/data/sample-report-long.json", {responseType: 'json'});
    // } else {
    //   return this.http.get("assets/data/smart-table.json", {responseType: 'json'});
    // }
    return this.http.get("/template/init/" + module + "/" + templateCode, {responseType: 'json'});
  }

  // emulating request to the server
  // getData(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.generateData());
  //     }, 2000);
  //   });
  // }

  getData(templatePayload): Promise<any> {
    // if (templateCode == 'sample_report') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.generateData(templatePayload));
        }, 2000);
      });
    // } else {
    //   return null;
    // }
  }

  async createData(): Promise<any> {
    await this.http.get("https://3b8f920e-d189-427e-af94-ba6b0860c7db.mock.pstmn.io/sample_json_get", {responseType: 'json'}).toPromise().then(resp => {
      console.log(resp);
    });
    console.log('insert service');
  }

  editData(): void {
    this.http.post("https://3b8f920e-d189-427e-af94-ba6b0860c7db.mock.pstmn.io/sample_json_post", {responseType: 'json'}).subscribe((res)=> {
      console.log(res);
    });
    console.log('edit service');
  }

  deleteData(): void {
    console.log('delete service');
  }

  getNewExampleObj(n?: number): any {
    n = typeof n !== 'undefined' ? n : Math.random() * 1000;
    return {
      id: n,
      firstName: `First Name ${n}`,
      lastName: `Last Name ${n}`,
      username: `username_${n}`,
      email: `email_${n}@email.com`,
      age: `${n}`,
    };
  }

  async generateData(templatePayload): Promise<any> {
    let data = [];
    // for (let i = 0; i < SmartTableService.DATA_SIZE; i++) {
    //   let tmpData = this.getNewExampleObj(i);
    //   data.push(tmpData);
    // }
    // if (templateCode == "sample_report") {
      // await this.http.get("assets/data/" + module + "-" + templateCode + "-data.json", {responseType: 'json'}).toPromise().then(resp => {
      //   data = resp["data"];
      // });
      // console.log(templatePayload["data_endpoint"]);
      await this.http.post(templatePayload["data_endpoint"], {responseType: 'json'}).toPromise().then(resp => {
        data = resp["data"]["rdbms_data"];
      });
    // }
    return data;
  }

  async insertProcess(templatePayload, payload) : Promise<any> {
    return await this.http.post(templatePayload["insert_endpoint"], payload).toPromise();
  }

  async updateProcess(templatePayload, payload) : Promise<any> {
    return await this.http.post(templatePayload["update_endpoint"], payload).toPromise();
  }

  async deleteProcess(templatePayload, payload) : Promise<any> {
    return await this.http.post(templatePayload["delete_endpoint"], payload).toPromise();
  }

  importProcess(formData, templatePayload) : Promise<any> {
    return this.http.post(templatePayload["import_endpoint"], formData, {reportProgress: true, observe: 'events'}).toPromise();
  }

  /*protected generateData(): Array<any> {
    let data = [];
    // for (let i = 0; i < SmartTableService.DATA_SIZE; i++) {
    //   let tmpData = this.getNewExampleObj(i);
    //   data.push(tmpData);
    // }
    this.http.get("assets/data/sample_report-data.json", {responseType: 'json'}).subscribe(resp => {
      data = resp["data"];
    });    
    return data;
  }*/
}
