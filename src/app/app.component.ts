import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works 2!';
  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loginService.isAuth();
  }
}
