import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDynamicService } from '../../../forms/form-dynamic/form-dynamic.service';

@Component({
  selector: 'ngx-dialog-form',
  templateUrl: 'dialog-form.component.html',
  styleUrls: ['dialog-form.component.scss'],
  providers: [FormDynamicService],
})
export class DialogFormComponent {
  @Input() title: string;
  @Input() dialogType: string;
  @Input() templatePayload: {};

  payload: {};
  profileForm = new FormGroup({});

  constructor(protected ref: NbDialogRef<DialogFormComponent>, protected formDynamicService:FormDynamicService) {    
    // formDynamicService.getForm().subscribe(resp => {
      // this.payload = resp;
      // resp["forms"].forEach(element => {
        // console.log(element.name);
        // this.profileForm.addControl(element.name, new FormControl(''));
      // });
      // console.log(this.payload);
    // });
  }

  ngOnInit() {
    console.log('ngOnInit : ' + this.templatePayload + ' '+ this.dialogType);
    this.templatePayload["insert_form_payload"].forEach(element => {
      // console.log(element.name);
      this.profileForm.addControl(element.name, new FormControl(''));
    });
  }

  onClickGeneral() {
    let output = {"status" : "insert"};
    if (this.dialogType == 'Create') {
      this.payload["forms"].forEach(element => {
        // console.log(element.name);
        console.log('on click button ' + this.profileForm.controls[element.name].value);
        output[element.name] = this.profileForm.controls[element.name].value;
      });
    } else {
      console.log('on click general other');
    }
    this.ref.close(output);
  }

  dismiss() {
    let output = {"status" : "cancel"};
    this.ref.close(output);
  }
}
