import { Component } from '@angular/core';
import { FormDynamicService } from './form-dynamic.service';

@Component({
  selector: 'ngx-form-dynamic',
  styleUrls: ['./form-dynamic.component.scss'],
  templateUrl: './form-dynamic.component.html',
  providers: [FormDynamicService],
})
export class FormDynamicComponent {

  payload: null;

  constructor(protected formDynamicService : FormDynamicService) {
    this.formDynamicService.getForm().subscribe(resp => {
      this.payload = resp;
      console.log(this.payload);
    });    
  }

  onClickButton() {
    console.log('on click button');
  }
}
