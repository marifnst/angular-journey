import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-form',
  templateUrl: 'dialog-form.component.html',
  styleUrls: ['dialog-form.component.scss'],
})
export class DialogFormComponent {
  @Input() title: string;
  @Input() dialogType: string;

  constructor(protected ref: NbDialogRef<DialogFormComponent>) {
    console.log('dialog type ' + this.dialogType);
  }

  onClickGeneral() {
    if (this.dialogType == 'Create') {
      console.log('on click general ' + this.dialogType);
    } else {
      console.log('on click general other');
    }
    this.ref.close();
  }

  dismiss() {
    this.ref.close();
  }
}
