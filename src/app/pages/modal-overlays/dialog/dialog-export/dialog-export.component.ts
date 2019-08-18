import { Component, Input } from '@angular/core';
import { NbDialogRef, NbComponentStatus } from '@nebular/theme';
import { DialogFormService } from '../dialog-form/dialog-form.service';

@Component({
  selector: 'ngx-dialog-export',
  templateUrl: 'dialog-export.component.html',
  styleUrls: ['dialog-export.component.scss'],
  providers: [DialogFormService],
})
export class DialogExportComponent {

  @Input() templatePayload: {};
  selectedOption: string;
  buttonType: NbComponentStatus = 'primary';
  selectedItem = "export_type";
  
  constructor(protected ref: NbDialogRef<DialogExportComponent>, protected dialogFormService : DialogFormService) {

  }

  exportProgress = 0;

  onChange(event) {
    console.log("event : " + event);
    this.selectedItem = event;
  }

  onClickProcess() {
    if (this.selectedItem != "export_type") {
      console.log(this.templatePayload["export_endpoint"] + " : " + this.selectedItem);
      this.dialogFormService.exportProcess(this.selectedItem, this.templatePayload).then(resp => {
        if (!!resp.metadata.stacktrace) {
          alert(resp.metadata.stacktrace);
        } else {
          alert("Your execution id : " + resp.data.execution_id);
        }
      });    
      this.exportProgress += 10;
    } else {
      alert("Please select export type !!!");
    }
  }

  close() {
    this.ref.close();
  }

  dismiss() {
    let output = {"status" : "cancel"};
    this.ref.close(output);
  }
}
