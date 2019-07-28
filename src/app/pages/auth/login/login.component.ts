import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { userInfo } from 'os';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

  login() {
    console.log('login ' + this.user.email);
    this.router.navigate(['/pages/charts/chartjs-dynamic']);
  }
}