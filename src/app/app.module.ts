import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from'../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SettingsService } from './services/settings.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { WorkshopsService } from './services/workshops.service';
import { PresenterService } from './services/presenter.service';

// User Profile Addins
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotifyService } from './services/notify.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { AddworkshopComponent } from './components/addworkshop/addworkshop.component';
import { EditworkshopComponent } from './components/editworkshop/editworkshop.component';
import { PresentersComponent } from './components/presenters/presenters.component';
import { AddPresenterComponent } from './components/add-presenter/add-presenter.component';
import { EditPresenterComponent } from './components/edit-presenter/edit-presenter.component';
import { DetailsPresenterComponent } from './components/details-presenter/details-presenter.component';
import { DetailsWorkshopComponent } from './components/details-workshop/details-workshop.component';

// File Upload
import { AngularFireStorageModule } from 'angularfire2/storage';
import { DropzoneDirective } from './directives/dropzone.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    SidebarComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    // User Profile Addins
    UserProfileComponent,
    UserFormComponent,
    HomeComponent,
    WorkshopsComponent,
    AddworkshopComponent,
    EditworkshopComponent,
    PresentersComponent,
    AddPresenterComponent,
    EditPresenterComponent,
    DetailsPresenterComponent,
    DetailsWorkshopComponent,
    DropzoneDirective

  ],
  imports: [
    BrowserModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
  ],
  providers: [ClientService, AuthService, SettingsService, NotifyService, UserService, WorkshopsService, PresenterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
