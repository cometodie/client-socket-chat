import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ChatService } from './shared/chat.service';

import { ClientRoutingModule } from './app-routing.module';

import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from './services/guard/auth-guard';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './services/tokenIntercepter/token-interceptor';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, ChatComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClientRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    ChatService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
