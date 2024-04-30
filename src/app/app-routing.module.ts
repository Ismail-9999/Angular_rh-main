import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { DashTableComponent } from './dash-table/dash-table.component';
import { ConsultantComponent } from './model/consultant/consultant.component';
import { ProspectComponent } from './model/prospect/prospect.component';
import { ProspectDtlsComponent } from './all-details/prospect-dtls/prospect-dtls.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthServiceService } from './Auth/auth-service.service';
import { ConsultantDtlsComponent } from './all-details/consultant-dtls/consultant-dtls.component';
import { MissionComponent } from './model/mission/mission.component';
import { ClientComponent } from './model/client/client.component';
import { GedComponent } from './model/ged/ged.component';
import { AppelOffreComponent } from './model/appel-offre/appel-offre.component';
import { AppDataComponent } from './data/app-data/app-data.component';
import { AuthGuard } from './Auth/auth.guard';
import { AuthkGuard } from './utility/authk.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dash',
    component: DashComponent
    , canActivate :[AuthGuard]
   }
   ,
  { path: 'tab', component: DashTableComponent , canActivate :[AuthGuard]},
  {
    path: 'dashtab',
    component: DashTableComponent,
  },
  {
    path: 'cons',
    component: ConsultantComponent,
  },
  { path: 'pros', component: ProspectComponent , canActivate :[AuthGuard]},
  { path: 'prospect/:id', component: ProspectDtlsComponent , canActivate :[AuthGuard] },
  { path: 'consultant/:id', component: ConsultantDtlsComponent , canActivate :[AuthGuard]},
  { path: 'mission', component: MissionComponent , canActivate :[AuthGuard] },
  { path: 'client', component: ClientComponent , canActivate :[AuthGuard] },
  { path: 'ged', component: GedComponent , canActivate :[AuthGuard] },
  { path: 'appo', component: AppelOffreComponent , canActivate :[AuthGuard]},
  { path: 'appe', component: AppDataComponent , canActivate :[AuthGuard]},
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
