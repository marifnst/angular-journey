import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  module = "";
  templateCode = "";
  source: LocalDataSource = new LocalDataSource();
  buttonType: NbComponentStatus = 'primary';
  buttonList = ['Create', 'Export', 'Import'];
  message: string;
  @ViewChild("file", {static : true}) importFile : ElementRef;
  importData: File = null;

  // constructor(private service: SmartTableData) {
  //   const data = this.service.getData();
  //   this.source.load(data);
  // }

  constructor(
    protected globalService: SmartTableService, 
    private dialogService: NbDialogService,
    router : Router,
    activatedRoute : ActivatedRoute
    ) {
    // const data = this.service.getData();
    // this.source.load(data);

    router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
    activatedRoute.paramMap.subscribe(params => {
      console.log(params.get("templateCode"));
      this.module = params.get("module");
      this.templateCode = params.get("templateCode");
    });

    // this.globalService.getColumn().subscribe(resp => {
    //   this.settings = Object.assign({}, resp);
    // });
    this.globalService.getColumn(this.module, this.templateCode).subscribe(resp => {
      this.settings = Object.assign({}, resp);
    });

    // this.globalService.getData().then((data) => {
    //   this.source.load(data);
    // });
    // this.globalService.getData(this.module, this.templateCode).then((data) => {
    //   this.source.load(data);
    // });
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

    switch (buttonType) {
      case "Create": {
        this.openDialog(buttonType);
        break;
      }
      case "Import": {
        this.importFile.nativeElement.click();
        break;
      }
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

  importProcess(fileInput: any) {
    this.importData = <File> fileInput.target.files[0];

    const formData = new FormData();
    formData.append('files', this.importData);
    console.log('import process : ' + this.importData.name);

    // https://w3path.com/new-angular-8-file-upload-or-image-upload/
    // this.fileUploadProgress = '0%';
    // this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
    //   reportProgress: true,
    //   observe: 'events'   
    // })
    // .subscribe(events => {
    //   if(events.type === HttpEventType.UploadProgress) {
    //     this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
    //     console.log(this.fileUploadProgress);
    //   } else if(events.type === HttpEventType.Response) {
    //     this.fileUploadProgress = '';
    //     console.log(events.body);          
    //     alert('SUCCESS !!');
    //   }
    // }
  }
}
