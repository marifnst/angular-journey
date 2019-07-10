import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SmartTableService {

  static DATA_SIZE = 500;

  constructor(private http:HttpClient) {}

  getColumn(): Observable<any> {
    return this.http.get("assets/data/smart-table.json", {responseType: 'json'});
  }

  // emulating request to the server
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.generateData());
      }, 2000);
    });
  }

  createData(): void {
    this.http.get("https://3b8f920e-d189-427e-af94-ba6b0860c7db.mock.pstmn.io/sample_json_get", {responseType: 'json'}).subscribe((res)=> {
      console.log(res);
      console.log(res["data"]);
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

  protected generateData(): Array<any> {
    const data = [];
    for (let i = 0; i < SmartTableService.DATA_SIZE; i++) {
      data.push(this.getNewExampleObj(i));
    }
    return data;
  }
}
