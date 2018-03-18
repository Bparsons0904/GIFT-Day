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
  { path: 'addworkshop', component: AddworkshopComponent},
  { path: 'editworkshop/:id', component: EditworkshopComponent},
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
