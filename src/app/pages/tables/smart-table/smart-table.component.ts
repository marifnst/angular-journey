import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from './smart-table.service';
import { HttpClient } from '@angular/common/http';

// import { SmartTableData } from '../../../@core/data/smart-table';
// import { SmartTableService } from '../../../@core/mock/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  providers: [SmartTableService],
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    actions:{
      add:true,
      edit:true,
      delete:true
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },    
    columns: {
    },
  };  

  source: LocalDataSource = new LocalDataSource();

  // constructor(private service: SmartTableData) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }

  constructor(protected globalService: SmartTableService, private http:HttpClient) {
    // const data = this.service.getData();
    // this.source.load(data);

    // this.settings.actions["add"] = false;
    this.globalService.getColumn().subscribe(resp => {
      this.settings = Object.assign({}, resp);
    });

    this.globalService.getData().then((data) => {
      this.source.load(data);
    });
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
      this.globalService.createData();
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit?')) {
      this.globalService.editData();
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.globalService.deleteData();
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
