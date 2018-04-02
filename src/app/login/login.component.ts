import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private email: string = '';
  private password: string = '';

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit() {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (token: any) => {
        console.log(token);
        this.loginService.setToken(token.token);
        this.route.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
