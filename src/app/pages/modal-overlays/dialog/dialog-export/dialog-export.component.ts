import { Component, Input } from '@angular/core';
import { NbDialogRef, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-export',
  templateUrl: 'dialog-export.component.html',
  styleUrls: ['dialog-export.component.scss'],
})
export class DialogExportComponent {

  buttonType: NbComponentStatus = 'primary';
  
  constructor(protected ref: NbDialogRef<DialogExportComponent>) {

  }

  exportProgress = 0;

  onClickProcess() {
    this.exportProgress += 10;
  }

  close() {
    this.ref.close();
  }

  dismiss() {
    let output = {"status" : "cancel"};
    this.ref.close(output);
  }
}
