import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { BacklogComponent } from './components/backlog/backlog.component';
import { ShowComponent } from './components/writeup/show/show.component';
import { IndexComponent } from './components/writeup/index/index.component';
import { CreateOrEditComponent } from './components/writeup/create-or-edit/create-or-edit.component';

const routes: Routes = [
  { path:'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardGuard],
      children: [        
        { path: 'backlog', component: BacklogComponent },
        { path: 'writeup',
          children: [
            { path: 'create', component: CreateOrEditComponent },
            { path: 'index', component: IndexComponent },
            { path: 'show/:id', component: ShowComponent }
          ]
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
