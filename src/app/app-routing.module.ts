import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/guard/auth-guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginService } from './services/login/login.service';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', pathMatch: 'full', redirectTo: '/chat-area' }]
  },
  { path: 'chat-area', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginService]
})
export class ClientRoutingModule { }
