import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from
'./components/dashboard/dashboard.component';
import { LoginComponent } from
'./components/login/login.component';
import { RegisterComponent } from
'./components/register/register.component';
import { AddClientComponent } from
'./components/add-client/add-client.component';
import { EditClientComponent } from
'./components/edit-client/edit-client.component';
import { ClientDetailsComponent } from
'./components/client-details/client-details.component';
import { SettingsComponent } from
'./components/settings/settings.component';
import { NotFoundComponent } from
'./components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { HomeComponent } from './components/home/home.component';
// User Profile Addins
import { UserProfileComponent } from
  './components/user-profile/user-profile.component';
import { WorkshopsComponent } from
  './components/workshops/workshops.component';
import { AddworkshopComponent } from
  './components/addworkshop/addworkshop.component';
import { EditworkshopComponent } from
  './components/editworkshop/editworkshop.component';
import { PresentersComponent } from
  './components/presenters/presenters.component';
import { AddPresenterComponent } from
  './components/add-presenter/add-presenter.component';
import { EditPresenterComponent } from
  './components/edit-presenter/edit-presenter.component';
import { DetailsPresenterComponent } from
  './components/details-presenter/details-presenter.component';
import { DetailsWorkshopComponent } from
  './components/details-workshop/details-workshop.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent, canActivate:[RegisterGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client/add', component: AddClientComponent, canActivate: [AuthGuard]},
  { path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  // User Profile Addins
  { path: 'profile', component: UserProfileComponent},
  { path: 'workshops', component: WorkshopsComponent},
  { path: 'workshops/add', component: AddworkshopComponent},
  { path: 'workshops/edit/:id', component: EditworkshopComponent},
  { path: 'workshops/:id', component: DetailsWorkshopComponent},
  { path: 'presenters', component: PresentersComponent},
  { path: 'presenters/add', component: AddPresenterComponent},
  { path: 'presenters/edit/:id', component: EditPresenterComponent},
  { path: 'presenters/:id', component: DetailsPresenterComponent },
  {path: '**', component: NotFoundComponent},
]
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }
