import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './componentes/login/login.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment.development';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ActualTaskComponent } from './componentes/actual-task/actual-task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HistorialTaskComponent } from './componentes/historial-task/historial-task.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MainComponent } from './componentes/main/main.component';
import { TablesComponent } from './componentes/tables/tables.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PapperPirouetteComponent } from './componentes/papper-pirouette/papper-pirouette.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarPasswordComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    SpinnerComponent,
    DashboardComponent,
    NavBarComponent,
    ActualTaskComponent,
    HistorialTaskComponent,
    MainComponent,
    TablesComponent,
    FooterComponent,
    PapperPirouetteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HighchartsChartModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
