import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/TaskModel';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/TaskService.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LocalStorageService } from '../../services/LocalStorage.service';

@Component({
  selector: 'app-actual-task',
  templateUrl: './actual-task.component.html',
  styleUrl: './actual-task.component.css'
})
export class ActualTaskComponent implements OnInit {

  listadoEstado: any[] = [{ id: 1, descrip: 'Pendiente' }, { id: 2, descrip: 'Iniciado' }]
  listPendiente: TaskModel[] = []
  listInicados: TaskModel[] = []
  listFinalizados: TaskModel[] = []
  registroTask: FormGroup;
  viewForm: boolean = false
  dataUser: any;
  loading = true;

  constructor(
    private taskService: TaskService, private afAuth: AngularFireAuth,
    private router: Router,
    private localStorage: LocalStorageService,
    private fb: FormBuilder) {
    this.registroTask = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      estado: [0, Validators.required, [this.validateStatusAsync.bind(this)]],
    })
  }

  ngOnInit() {
    if (!this.getUser()) {
      this.router.navigate(['/login']);
    }
    this.listDataTask();
  }

  listDataTask() {
    this.taskService.listarTasks$(this.getUser()).subscribe((result) => {
      this.loading = true;
      this.listPendiente = result.filter(x => x.estado == 1);
      this.listInicados = result.filter(x => x.estado == 2);
      this.loading = false;
    });
    this.taskService.listarTasksFinishWithLimit$(this.getUser()).subscribe((result) => {
      this.loading = true;
      this.listFinalizados = result;
      this.loading = false;
    });
  }

  async addRegister() {
    var registro = this.registroTask.getRawValue()
    registro.nombre = this.registroTask.get('nombre').value
    registro.estado = +this.registroTask.get('estado').value
    registro.user = this.getUser()
    if (registro.estado == 2) {
      registro.fechaInicio = new Date()
    }
    try {
      await this.taskService.crea_edita_Task$(
        1,
        registro,
        ''
      );
      this.mostarSwetSuccess('Success', 'Tarea Creada Correctamente')
    } catch (error) {
      this.mostarSwetError('Error', error.error.message)
    }
    this.registroTask.get('nombre').setValue('')
    this.registroTask.get('estado').setValue(0)
    this.viewForm = false;
  }

  async modifiedEstado(estado: number, id: string) {
    const registro: any = {}
    registro.estado = estado
    estado == 2 ? registro.fechaInicio = new Date() : registro.fechaFin = new Date()
    try {
      await this.taskService.crea_edita_Task$(
        2,
        registro,
        id
      );
      this.mostarSwetWarning('Success', estado == 2 ? 'Tarea Iniciada' : 'Tarea Finalizada')
    } catch (error) {
      this.mostarSwetError('Error', error.error.message)
    }
  }

  async deleteRegister(id: string) {
    try {
      await this.taskService.elimina_Task$(id);
      this.mostarSwetError('Delete', 'Tarea Eliminada Correctamente')
    } catch (error) {
      this.mostarSwetError('Error', error.error.message)
    }
    this.registroTask.get('nombre').setValue('')
    this.registroTask.get('estado').setValue(0)
    this.viewForm = false;
  }

  getUser() {
    return this.localStorage.obtenerItemDelLocalStorage('idUser');
  }

  mostrarForm(estado: boolean) {
    this.viewForm = estado
  }

  validateStatusAsync(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const status = control.value;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (status === 0) {
          resolve({ invalidStatus: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  mostarSwetSuccess(titleS: string, message: string) {
    Swal.fire({
      title: titleS,
      text: message,
      icon: "success",
      timer: 1500
    });
  }

  mostarSwetWarning(titleS: string, message: string) {
    Swal.fire({
      title: titleS,
      text: message,
      icon: "warning",
      timer: 1500
    });
  }

  mostarSwetError(titleS: string, message: string) {
    Swal.fire({
      title: titleS,
      text: message,
      icon: "error",
      timer: 1500
    });
  }
}

