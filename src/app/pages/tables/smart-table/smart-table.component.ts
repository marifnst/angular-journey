import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from './smart-table.service';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { DialogFormComponent } from '../../modal-overlays/dialog/dialog-form/dialog-form.component';

@Component({
  selector: 'ngx-smart-table',
  providers: [SmartTableService],
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    actions:{
      add:false,
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
  buttonType: NbComponentStatus = 'primary';
  buttonList = ['Create', 'Export', 'Import'];
  message: string;

  // constructor(private service: SmartTableData) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }

  constructor(protected globalService: SmartTableService, private dialogService: NbDialogService) {
    // const data = this.service.getData();
    // this.source.load(data);

    this.globalService.getColumn().subscribe(resp => {
      this.settings = Object.assign({}, resp);
    });

    this.globalService.getData().then((data) => {
      this.source.load(data);
    });
  }
  
  async onCreateConfirm(event): Promise<any> {
    if (window.confirm('Are you sure you want to create?')) {
      await this.globalService.createData();
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

  onClickButton(buttonType): void {
    console.log('on click ' + buttonType);
    if (buttonType == 'Create') {
      // let tmpDataCreate = {id:'',firstName:'firstName onclick',lastName:'lastName onclick',username:'username onclick',email:'email onclick',age:'age onclick'};
      // this.source.append(tmpDataCreate);
      this.openDialog(buttonType);
    }
  }

  openDialog(buttonType:string) {
    this.dialogService
    .open(DialogFormComponent, {
      context: {
        title: 'Dari Table Component',
        dialogType: buttonType
      }
    }).onClose.subscribe(resp => {
      console.log('dari on clos subscribe ' + resp["username"]);
    });
  }
}
