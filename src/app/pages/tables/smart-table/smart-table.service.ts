import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  static DATA_SIZE = 500;

  // emulating request to the server
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.generateData());
      }, 2000);
    });
  }

  createData(): void {
    console.log('insert service');
  }

  editData(): void {
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
