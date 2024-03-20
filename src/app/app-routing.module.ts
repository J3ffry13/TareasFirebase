import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ActualTaskComponent } from './componentes/actual-task/actual-task.component';
import { HistorialTaskComponent } from './componentes/historial-task/historial-task.component';
import { MainComponent } from './componentes/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'Actual', component: ActualTaskComponent },
      { path: 'Historial', component: HistorialTaskComponent },
    ]
  },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
