import { Component, ViewChildren, QueryList } from '@angular/core';
import { FormDynamicService } from './form-dynamic.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NbDatepickerComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-form-dynamic',
  styleUrls: ['./form-dynamic.component.scss'],
  templateUrl: './form-dynamic.component.html',
  providers: [FormDynamicService],
})
export class FormDynamicComponent {

  payload: {};
  profileForm = new FormGroup({});
  @ViewChildren('formpicker') components:QueryList<NbDatepickerComponent<any>>;

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
    this.payload["forms"].forEach(element => {
      // console.log(element.name);
      console.log('on click button ' + this.profileForm.controls[element.name].value);
    });
  }
}
