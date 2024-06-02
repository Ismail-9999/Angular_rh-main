import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { NgChartsModule } from 'ng2-charts';
import { DashTableComponent } from './dash-table/dash-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { MyChartComponent } from './my-chart/my-chart.component';
import { MyChart2Component } from './my-chart2/my-chart2.component';
import { MyChart3Component } from './my-chart3/my-chart3.component';
import { MyChart4Component } from './my-chart4/my-chart4.component';
import { ProspectComponent } from './model/prospect/prospect.component';
import { ConsultantComponent } from './model/consultant/consultant.component';
import { ClientComponent } from './model/client/client.component';
import { MissionComponent } from './model/mission/mission.component';
import { ProspectDataComponent } from './data/prospect-data/prospect-data.component';
import { ProspectDtlsComponent } from './all-details/prospect-dtls/prospect-dtls.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProspectDialogComponent } from './dialog/prospect-dialog/prospect-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ProspectDialogAddComponent } from './add-dialog/prospect-dialog-add/prospect-dialog-add.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthServiceService } from './Auth/auth-service.service';
 import { ConsultantDataComponent } from './data/consultant-data/consultant-data.component';
import { ConsultantDtlsComponent } from './all-details/consultant-dtls/consultant-dtls.component';
import { MissionDataComponent } from './data/mission-data/mission-data.component';
import { ConsultantMissionComponent } from './dialog/consultant-mission/consultant-mission.component';
import { ConsultantDialogAddComponent } from './add-dialog/consultant-dialog-add/consultant-dialog-add.component';
import { MissionDialogAddComponent } from './add-dialog/mission-dialog-add/mission-dialog-add.component';
import { ClientDataComponent } from './data/client-data/client-data.component';
import { DashDataComponent } from './data/dash-data/dash-data.component';
import { ClienDialogAddComponent } from './add-dialog/clien-dialog-add/clien-dialog-add.component';
import { NewpageComponent } from './newpage/newpage.component';
import { GedComponent } from './model/ged/ged.component';
import { RelaunchComponent } from './dialog/relaunch/relaunch.component';
import { FilterProsComponent } from './dialog/filter-pros/filter-pros.component';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AppelOffreComponent } from './model/appel-offre/appel-offre.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppDataComponent } from './data/app-data/app-data.component'; 
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthGuard } from './Auth/auth.guard';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CanalDataComponent } from './data/canal-data/canal-data.component';
import { EditConsultantComponent } from './dialog/edit-consultant/edit-consultant.component';
import { DocumentPreviewModalComponent } from './all-details/document-preview-modal/document-preview-modal.component';
import { SafeUrlPipe } from './all-details/safe-url.pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';


 
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    CardComponent,
    DashTableComponent,
    MiniCardComponent,
    MyChartComponent,
    MyChart2Component,
    MyChart3Component,
    MyChart4Component,
    ProspectComponent,
    ConsultantComponent,
    ClientComponent,
    MissionComponent,
    ProspectDataComponent,
    ProspectDtlsComponent,
    ProspectDialogComponent,
    ProspectDialogAddComponent,
    LoginPageComponent,
    ConsultantDataComponent,
    ConsultantDtlsComponent,
    MissionDataComponent,
    ConsultantMissionComponent,
    ConsultantDialogAddComponent,
    MissionDialogAddComponent,
    ClientDataComponent,
    DashDataComponent,
    ClienDialogAddComponent,
    NewpageComponent,
    GedComponent,
    RelaunchComponent,
    FilterProsComponent,
    AppelOffreComponent,
    AppDataComponent,
    CanalDataComponent,
    EditConsultantComponent,
    DocumentPreviewModalComponent,
    SafeUrlPipe,
    ConfirmationModalComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSelectModule ,
    MatCheckboxModule,
    NgApexchartsModule,
    NgxDocViewerModule,
    KeycloakAngularModule,
    PdfViewerModule,
    NgbModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // } 
    
    {provide: LocationStrategy, useClass: HashLocationStrategy} , 
    AuthGuard ,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
