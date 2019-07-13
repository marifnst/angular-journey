import { Component } from '@angular/core';
import { FormDynamicService } from './form-dynamic.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-form-dynamic',
  styleUrls: ['./form-dynamic.component.scss'],
  templateUrl: './form-dynamic.component.html',
  providers: [FormDynamicService],
})
export class FormDynamicComponent {

  payload: null;
  profileForm = new FormGroup({});

  constructor(protected formDynamicService : FormDynamicService) {
    this.formDynamicService.getForm().subscribe(resp => {
      this.payload = resp;
      resp["forms"].forEach(element => {
        // console.log(element.name);
        this.profileForm.addControl(element.name, new FormControl(''));
      });
      // console.log(this.payload);
    });    
  }

  onSubmit() {
    console.log('on click button ' + this.profileForm.controls["username"].value);
  }
}
