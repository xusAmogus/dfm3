import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule }  from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 
import  { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BacklogComponent } from './components/backlog/backlog.component';
import { CreateBacklogDialogComponent } from './components/dialogs/create-backlog-dialog/create-backlog-dialog.component';
import { EditBacklogDialogComponent } from './components/dialogs/edit-backlog-dialog/edit-backlog-dialog.component';
import { DeleteBacklogDialogComponent } from './components/dialogs/delete-backlog-dialog/delete-backlog-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import  { MatIconModule } from '@angular/material/icon';
import { ItemCountComponent } from './components/dashboard/item-count/item-count.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ShowProfileDialogComponent } from './components/dialogs/show-profile-dialog/show-profile-dialog.component'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { ShowComponent } from './components/writeup/show/show.component';
import { IndexComponent } from './components/writeup/index/index.component';
import { CreateOrEditComponent } from './components/writeup/create-or-edit/create-or-edit.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { BacklogCreateComponent } from './components/backlog/backlog-create/backlog-create.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    BacklogComponent,
    CreateBacklogDialogComponent,
    EditBacklogDialogComponent,
    DeleteBacklogDialogComponent,
    ItemCountComponent,
    ProfileComponent,
    ShowProfileDialogComponent,    
    ShowComponent,
    IndexComponent,
    CreateOrEditComponent,
    MenuComponent,
    BacklogCreateComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NgxDropzoneModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
