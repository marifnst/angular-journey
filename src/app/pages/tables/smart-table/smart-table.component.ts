import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from './smart-table.service';
import { NbComponentStatus, NbDialogService, NbWindowService } from '@nebular/theme';
import { DialogFormComponent } from '../../modal-overlays/dialog/dialog-form/dialog-form.component';
import { DialogExportComponent } from '../../modal-overlays/dialog/dialog-export/dialog-export.component';

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
  templatePayload = {};
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
    private windowService: NbWindowService,
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
    this.globalService.templateInitialization(this.module, this.templateCode).then(resp => {
      this.templatePayload = Object.assign({}, resp["data"]);
      this.settings = Object.assign({}, resp["data"]["payload"]);
      this.globalService.getData(this.templatePayload).then((data) => {
        if (data != null) {
          this.source.load(data);
        }      
      });
    });

    // this.globalService.getData().then((data) => {
    //   this.source.load(data);
    // });
    // this.globalService.getData(this.module, this.templateCode).then((data) => {
    //   if (data != null) {
    //     this.source.load(data["data"]);
    //   }      
    // });
    // this.globalService.getData(this.templatePayload).then((data) => {
    //   if (data != null) {
    //     this.source.load(data["data"]);
    //   }      
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
    switch (buttonType) {
      case "Create": {
        this.openDialog(buttonType);
        break;
      }
      case "Export": {
        // this.windowService.open(WindowFormDynamicComponent, { title: `Export` }).onClose.subscribe(resp => {
        //   console.log('on close window');
        //   this.windowService = null;
        // });
        this.openExportDialog();
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
      if (resp["status"] == "insert") {
        console.log('dari on clos subscribe ' + resp["username"]);
      }      
    });
  }

  openExportDialog() {
    this.dialogService
    .open(DialogExportComponent, {
      context: {}
    }).onClose.subscribe(resp => {
      console.log('on close open export dialog');
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
